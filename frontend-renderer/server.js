const express = require("express");
const fs = require("fs");
const { exec, spawn } = require("child_process");
const path = require("path");
const cors = require("cors");
const { stdout } = require("process");
const { RemotionJsonGenerator } = require("./src/automate/asset-parser");

const app = express();
const PORT = 3100;

const renderStatusMap = {};

app.use(cors({
  origin: "*" // or use "*" for all origins (not recommended for production)
}));
app.use(express.json({ limit: '50mb' })); // Increase limit for large asset lists

// Serve static files from out directory
app.use('/out', express.static(path.join(__dirname, 'out')));

// POST /render expects the full base.json content in the body
app.post("/render", (req, res) => {
  const { id } = req.body;
  console.log("Received /render request with id:", id);

  if (!id) {
    return res.status(400).json({ error: "Missing 'id' in request body" });
  }

  renderStatusMap[id] = { status: "PENDING", progress: 0, url: null };

  // Respond immediately so client can start polling
  res.json({
    video: {
      id,
      status: "PENDING",
      progress: 0,
      url: null,
    }
  });

  // Write the design to a unique file
  const baseJsonPath = path.join(__dirname, "src", "data", `base-${id}.json`);
  fs.writeFileSync(baseJsonPath, JSON.stringify(req.body, null, 2));

  const design = JSON.parse(fs.readFileSync(baseJsonPath, "utf-8"));
  const propsPath = path.join(__dirname, "src", "data", `props-${id}.json`);
  fs.writeFileSync(propsPath, JSON.stringify({ design }));

  startRenderProcess(id, propsPath, baseJsonPath);
});

// NEW API: POST /render-from-assets - Generate video from assets
app.post("/render-from-assets", (req, res) => {
  const {
    assets = {},
    config = {},
    id
  } = req.body;

  console.log("Received /render-from-assets request with id:", id);

  // Validate required fields
  if (!id) {
    return res.status(400).json({ error: "Missing 'id' in request body" });
  }

  const {
    imageUrls = [],
    audioUrls = [],
    srtContent = null,
    videoUrls = []
  } = assets;

  const {
    width = 1080,
    height = 1920,
    fps = 30,
    imageDurations = null,
    imageWidths = null,
    imageHeights = null,
    imageFitModes = null,
    transitionTypes = null,
    enableTransitions = true,
    transitionDuration = 1500,
    audioConfig = 'sequential' // NEW: audio configuration
    // There are three options: background, sequential, or simultaneous
  } = config;

  // Validate that we have at least some assets
  if (imageUrls.length === 0 && videoUrls.length === 0) {
    return res.status(400).json({ error: "At least one image or video URL is required" });
  }

  try {
    // Initialize the generator with custom dimensions
    const generator = new RemotionJsonGenerator(width, height, fps);
    
    // Set custom transition duration if provided
    if (transitionDuration) {
      generator.transitionDuration = transitionDuration;
    }

    // Generate the Remotion JSON
    const remotionJson = generator.generateRemotionJson({
      imageUrls,
      audioUrls,
      srtContent,
      imageDurations,
      imageWidths,
      imageHeights,
      imageFitModes,
      transitionTypes,
      enableTransitions,
      audioConfig // Pass audio configuration
    });

    // Add the id to the generated JSON
    remotionJson.id = id;

    console.log(`Generated Remotion JSON for assets:`, {
      images: imageUrls.length,
      audio: audioUrls.length,
      subtitles: srtContent ? "Yes" : "No",
      duration: remotionJson.duration,
      dimensions: `${width}x${height}`
    });

    // Initialize render status
    renderStatusMap[id] = { status: "PENDING", progress: 0, url: null };

    // Respond immediately
    res.json({
      video: {
        id,
        status: "PENDING",
        progress: 0,
        url: null,
      },
      generatedConfig: {
        duration: remotionJson.duration,
        tracks: remotionJson.tracks.length,
        items: remotionJson.trackItemIds.length
      }
    });

    // Save the generated JSON and start render
    const baseJsonPath = path.join(__dirname, "src", "data", `base-${id}.json`);
    fs.writeFileSync(baseJsonPath, JSON.stringify(remotionJson, null, 2));

    const propsPath = path.join(__dirname, "src", "data", `props-${id}.json`);
    fs.writeFileSync(propsPath, JSON.stringify({ design: remotionJson }));

    startRenderProcess(id, propsPath, baseJsonPath);

  } catch (error) {
    console.error("Error generating Remotion JSON:", error);
    return res.status(500).json({ 
      error: "Failed to generate video configuration", 
      details: error.message 
    });
  }
});

// Helper function to start the render process
function startRenderProcess(id, propsPath, baseJsonPath) {
  const outputPath = `out/${id}.mp4`;
  const command = `npx`;
  const args = [
    "remotion",
    "render",
    "src/index.ts",
    "RenderVideo",
    outputPath,
    `--props=${propsPath}`,
  ];

  // Use spawn for real-time output
  const child = spawn(command, args, { shell: true });

  let totalFrames = null;
  let lastProgress = 0;

  child.stdout.on("data", (data) => {
    const str = data.toString();
    // Detect and set state
    if (str.includes("Bundling")) {
      renderStatusMap[id].state = "Bundling";
    } else if (str.match(/Rendered \d+\/\d+/) || str.match(/Rendering frame/)) {
      renderStatusMap[id].state = "Rendering";
    } else if (str.match(/Stitched \d+\/\d+/)) {
      renderStatusMap[id].state = "Stitching";
    }

    // Progress calculation
    let match = str.match(/Rendered (\d+)\/(\d+)/);
    if (!match) {
      match = str.match(/Stitched (\d+)\/(\d+)/);
    }
    if (!match) {
      match = str.match(/Rendering frame (\d+) of (\d+)/);
    }
    if (!match) {
      match = str.match(/Rendering frame (\d+)\/(\d+)/);
    }
    if (match) {
      const current = parseInt(match[1], 10);
      totalFrames = parseInt(match[2], 10);
      const progress = Math.floor((current / totalFrames) * 100);
      if (progress !== lastProgress) {
        renderStatusMap[id].progress = progress;
        renderStatusMap[id].status = "PENDING";
        lastProgress = progress;
      }
    }
  });

  child.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  child.on("close", (code) => {
    // Clean up temporary files
    try {
      fs.unlinkSync(baseJsonPath);
      fs.unlinkSync(propsPath);
    } catch (err) {
      console.warn("Could not delete temporary files:", err.message);
    }

    if (code !== 0) {
      renderStatusMap[id] = { status: "FAILED", progress: lastProgress, url: null };
      return;
    }
    const videoUrl = `/out/${id}.mp4`;
    renderStatusMap[id] = { status: "COMPLETED", progress: 100, url: videoUrl };
    console.log(`Render completed for id: ${id}`);
  });
}

// GET endpoint for polling status
app.get("/api/render", (req, res) => {
  const { id } = req.query;
  if (!id || !renderStatusMap[id]) {
    return res.status(404).json({ error: "Not found" });
  }
  console.log(`Polling status for id: ${id}, progress: ${renderStatusMap[id].progress}%`);
  res.json({
    video: renderStatusMap[id],
  });
});

// GET endpoint to load SRT file content
app.post("/api/load-srt", (req, res) => {
  const { srtUrl } = req.body;
  
  if (!srtUrl) {
    return res.status(400).json({ error: "Missing srtUrl in request body" });
  }

  // If it's a URL, you might want to fetch it
  // For now, assuming it's a local file path or content
  try {
    let srtContent;
    if (srtUrl.startsWith('http')) {
      // Handle URL - you'd need to implement HTTP fetch here
      return res.status(400).json({ error: "URL loading not implemented yet" });
    } else {
      // Assume it's file content or local path
      srtContent = srtUrl; // Treat as content directly
    }
    
    res.json({ srtContent });
  } catch (error) {
    res.status(500).json({ error: "Failed to load SRT content", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
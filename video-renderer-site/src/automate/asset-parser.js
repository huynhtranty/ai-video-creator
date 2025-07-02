const fs = require('fs');
const crypto = require('crypto');

class RemotionJsonGenerator {
    constructor(videoWidth = 1080, videoHeight = 1920, fps = 30) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.fps = fps;
        this.defaultImageDuration = 5000; // 5 seconds in ms
        this.transitionDuration = 1500; // 1.5 seconds
        
        // Subtitle positioning
        this.subtitleBottomMargin = 100; // Distance from bottom
        this.subtitleHeight = 120; // Height area for subtitles
    }

    /**
     * Generate a random ID similar to the format in the example
     */
    generateId(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Parse SRT timestamp to milliseconds
     */
    parseSrtTime(timeStr) {
        // Format: 00:00:01,000
        const timeParts = timeStr.replace(',', '.').split(':');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);
        const seconds = parseFloat(timeParts[2]);
        
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds * 1000; // Convert to milliseconds
    }

    /**
     * Parse SRT file content and return subtitle entries
     */
    parseSrtFile(srtContent) {
        const entries = [];
        const blocks = srtContent.trim().split(/\n\s*\n/);
        
        for (const block of blocks) {
            const lines = block.trim().split('\n');
            if (lines.length >= 3) {
                // Parse timestamp line (format: 00:00:01,000 --> 00:00:03,000)
                const timestampLine = lines[1];
                if (timestampLine.includes('-->')) {
                    const [startTimeStr, endTimeStr] = timestampLine.split(' --> ');
                    const startTime = this.parseSrtTime(startTimeStr.trim());
                    const endTime = this.parseSrtTime(endTimeStr.trim());
                    
                    // Combine all text lines
                    const text = lines.slice(2).join(' ');
                    
                    entries.push({
                        startTime,
                        endTime,
                        text
                    });
                }
            }
        }
        
        return entries;
    }

    /**
     * Create a text track item from subtitle entry - positioned at bottom (correct format)
     */
    createTextItem(subtitle, itemId) {
        // Calculate position like in the working example
        // For 1920 height: 1823.31px = 1920 - 96.69px (approximately 97px from bottom)
        const bottomMargin = 97; // Distance from bottom based on working example
        const subtitleTop = this.videoHeight - bottomMargin;
        
        return {
            id: itemId,
            name: "text",
            type: "text",
            display: {
                from: subtitle.startTime,
                to: subtitle.endTime
            },
            metadata: {},
            details: {
                fontFamily: "Roboto-Bold",
                fontSize: 30,
                fontWeight: "normal",
                fontStyle: "normal",
                textDecoration: "none",
                textAlign: "center",
                lineHeight: "normal",
                letterSpacing: "normal",
                wordSpacing: "normal",
                color: "#ffffff",
                backgroundColor: "transparent",
                border: "none",
                textShadow: "none",
                text: subtitle.text,
                opacity: 100,
                width: this.videoWidth,
                wordWrap: "break-word",
                wordBreak: "normal",
                WebkitTextStrokeColor: "#ffffff",
                WebkitTextStrokeWidth: "0px",
                top: `${subtitleTop}px`, // Format as string with px
                left: "0px", // Centered, 0px instead of negative values
                textTransform: "none",
                transform: "none",
                skewX: 0,
                skewY: 0,
                height: 37,
                fontUrl: "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
                borderWidth: 0,
                borderColor: "#000000",
                boxShadow: {
                    color: "#ffffff",
                    x: 0,
                    y: 0,
                    blur: 0
                }
            }
        };
    }

    /**
     * Create an image track item - fit to screen with different fit modes
     */
    createImageItem(imageUrl, itemId, startTime, endTime, width = 1920, height = 1280, fitMode = 'cover') {
        let transform = '';
        let top = '0px';
        let left = '0px';
        let imageWidth = width;
        let imageHeight = height;

        if (fitMode === 'cover') {
            // Cover: fill entire screen, may crop image
            const scaleX = this.videoWidth / width;
            const scaleY = this.videoHeight / height;
            const scale = Math.max(scaleX, scaleY); // Use max to cover entire screen
            
            const scaledWidth = width * scale;
            const scaledHeight = height * scale;
            const leftOffset = (this.videoWidth - scaledWidth) / 2;
            const topOffset = (this.videoHeight - scaledHeight) / 2;
            
            transform = `scale(${scale.toFixed(4)})`;
            top = `${topOffset}px`;
            left = `${leftOffset}px`;
            
        } else if (fitMode === 'contain') {
            // Contain: fit entire image within screen, may have letterboxing
            const scaleX = this.videoWidth / width;
            const scaleY = this.videoHeight / height;
            const scale = Math.min(scaleX, scaleY); // Use min to fit entire image
            
            const scaledWidth = width * scale;
            const scaledHeight = height * scale;
            const leftOffset = (this.videoWidth - scaledWidth) / 2;
            const topOffset = (this.videoHeight - scaledHeight) / 2;
            
            transform = `scale(${scale.toFixed(4)})`;
            top = `${topOffset}px`;
            left = `${leftOffset}px`;
            
        } else if (fitMode === 'fill') {
            // Fill: stretch to exact screen dimensions
            const scaleX = this.videoWidth / width;
            const scaleY = this.videoHeight / height;
            
            transform = `scaleX(${scaleX.toFixed(4)}) scaleY(${scaleY.toFixed(4)})`;
            top = '0px';
            left = '0px';
        }
        
        return {
            id: itemId,
            type: "image",
            name: "image",
            display: {
                from: startTime,
                to: endTime
            },
            playbackRate: 1,
            metadata: {},
            details: {
                src: imageUrl,
                width: imageWidth,
                height: imageHeight,
                opacity: 100,
                transform: transform,
                border: "none",
                borderRadius: 0,
                boxShadow: {
                    color: "#000000",
                    x: 0,
                    y: 0,
                    blur: 0
                },
                top: top,
                left: left,
                borderWidth: 0,
                borderColor: "#000000",
                blur: 0,
                brightness: 100,
                flipX: false,
                flipY: false,
                rotate: "0deg",
                visibility: "visible"
            }
        };
    }

    /**
     * Create an audio track item
     */
    createAudioItem(audioUrl, itemId, startTime, endTime, duration) {
        return {
            id: itemId,
            name: audioUrl,
            type: "audio",
            display: {
                from: startTime,
                to: endTime
            },
            trim: {
                from: 0,
                to: duration
            },
            playbackRate: 1,
            metadata: {
                author: "Unknown"
            },
            duration: duration,
            isMain: false,
            details: {
                src: audioUrl,
                volume: 100
            }
        };
    }

    /**
     * Generate the complete Remotion JSON structure
     */
    generateRemotionJson(options = {}) {
        const {
            imageUrls = [],
            audioUrls = [],
            srtContent = null,
            imageDurations = null,
            imageWidths = null,
            imageHeights = null,
            imageFitModes = null,
            transitionTypes = null,
            enableTransitions = true,
            audioConfig = 'sequential' // 'sequential', 'simultaneous', or 'background'
        } = options;

        // Parse subtitles if provided
        let subtitles = [];
        if (srtContent) {
            subtitles = this.parseSrtFile(srtContent);
        }

        // Generate IDs
        const mainId = this.generateId();
        const audioTrackId = this.generateId();
        const imageTrackId = this.generateId();
        const textTrackId = this.generateId();

        // Initialize collections
        const trackItemsMap = {};
        const trackItemDetailsMap = {};
        const allItemIds = [];
        const transitionsMap = {};
        const transitionIds = [];

        // Set default values if not provided
        const finalImageDurations = imageDurations || 
            new Array(imageUrls.length).fill(this.defaultImageDuration);
        
        const finalImageWidths = imageWidths || 
            new Array(imageUrls.length).fill(1920);
        
        const finalImageHeights = imageHeights || 
            new Array(imageUrls.length).fill(1280);
            
        const finalImageFitModes = imageFitModes || 
            new Array(imageUrls.length).fill('cover');
            
        const finalTransitionTypes = transitionTypes || 
            new Array(imageUrls.length - 1).fill('fade');

        // Process images
        const imageItems = [];
        let currentTime = 0;
        const imageItemIds = []; // Store IDs for transitions

        for (let i = 0; i < imageUrls.length; i++) {
            const imageUrl = imageUrls[i];
            const duration = finalImageDurations[i];
            const width = finalImageWidths[i];
            const height = finalImageHeights[i];
            const fitMode = finalImageFitModes[i];
            
            const itemId = this.generateId();
            const startTime = currentTime;
            const endTime = currentTime + duration;

            const imageItem = this.createImageItem(imageUrl, itemId, startTime, endTime, width, height, fitMode);
            trackItemsMap[itemId] = imageItem;
            trackItemDetailsMap[itemId] = {
                type: "image",
                details: imageItem.details
            };

            imageItems.push(itemId);
            imageItemIds.push(itemId);
            allItemIds.push(itemId);

            currentTime = endTime;
        }

        // Create transitions between images
        if (enableTransitions && imageItems.length > 1) {
            for (let i = 0; i < imageItemIds.length - 1; i++) {
                const fromId = imageItemIds[i];
                const toId = imageItemIds[i + 1];
                const transitionType = finalTransitionTypes[i] || 'fade';
                
                const transitionId = `${fromId}-${toId}`;
                transitionsMap[transitionId] = {
                    id: transitionId,
                    duration: this.transitionDuration,
                    fromId: fromId,
                    toId: toId,
                    kind: transitionType, // fade, slide, zoom, etc.
                    trackId: imageTrackId,
                    type: "transition"
                };
                transitionIds.push(transitionId);
            }
        }

        const totalVideoDuration = currentTime;

        // Process audio with different strategies
        const audioItems = [];
        
        if (audioUrls.length > 0) {
            if (audioConfig === 'sequential') {
                // Play audio files one after another
                let audioCurrentTime = 0;
                
                for (let i = 0; i < audioUrls.length; i++) {
                    const audioUrl = audioUrls[i];
                    const itemId = this.generateId();
                    
                    // Estimate audio duration (you might want to get real duration)
                    const estimatedDuration = Math.min(totalVideoDuration - audioCurrentTime, 30000); // Max 30s per audio
                    const audioEndTime = Math.min(audioCurrentTime + estimatedDuration, totalVideoDuration);
                    
                    const audioItem = this.createAudioItem(audioUrl, itemId, audioCurrentTime, audioEndTime, estimatedDuration);
                    trackItemsMap[itemId] = audioItem;
                    trackItemDetailsMap[itemId] = {
                        type: "audio",
                        details: audioItem.details
                    };
                    
                    audioItems.push(itemId);
                    allItemIds.push(itemId);
                    
                    audioCurrentTime = audioEndTime;
                    
                    // Stop if we've reached the end of video
                    if (audioCurrentTime >= totalVideoDuration) break;
                }
                
            } else if (audioConfig === 'simultaneous') {
                // Play all audio files at the same time (mixing)
                for (let i = 0; i < audioUrls.length; i++) {
                    const audioUrl = audioUrls[i];
                    const itemId = this.generateId();
                    
                    const audioItem = this.createAudioItem(audioUrl, itemId, 0, totalVideoDuration, totalVideoDuration);
                    // Reduce volume for multiple simultaneous tracks
                    audioItem.details.volume = Math.max(20, 100 / audioUrls.length);
                    
                    trackItemsMap[itemId] = audioItem;
                    trackItemDetailsMap[itemId] = {
                        type: "audio",
                        details: audioItem.details
                    };
                    
                    audioItems.push(itemId);
                    allItemIds.push(itemId);
                }
                
            } else { // 'background' (default)
                // Use first audio as background, others as effects
                for (let i = 0; i < audioUrls.length; i++) {
                    const audioUrl = audioUrls[i];
                    const itemId = this.generateId();
                    
                    const audioItem = this.createAudioItem(audioUrl, itemId, 0, totalVideoDuration, totalVideoDuration);
                    
                    // First audio at full volume, others at lower volume
                    if (i === 0) {
                        audioItem.details.volume = 100; // Background music
                    } else {
                        audioItem.details.volume = 30; // Sound effects
                    }
                    
                    trackItemsMap[itemId] = audioItem;
                    trackItemDetailsMap[itemId] = {
                        type: "audio",
                        details: audioItem.details
                    };
                    
                    audioItems.push(itemId);
                    allItemIds.push(itemId);
                }
            }
        }

        // Process subtitles
        const textItems = [];
        for (const subtitle of subtitles) {
            const itemId = this.generateId();
            const textItem = this.createTextItem(subtitle, itemId);
            trackItemsMap[itemId] = textItem;
            trackItemDetailsMap[itemId] = {
                type: "text",
                details: textItem.details
            };

            textItems.push(itemId);
            allItemIds.push(itemId);
        }

        // Create tracks
        const tracks = [];

        // Audio track
        if (audioItems.length > 0) {
            tracks.push({
                id: audioTrackId,
                accepts: ["text", "audio", "helper", "video", "image", "caption", "template"],
                type: "audio",
                items: audioItems,
                magnetic: false,
                static: false
            });
        }

        // Image track
        if (imageItems.length > 0) {
            tracks.push({
                id: imageTrackId,
                items: imageItems,
                type: "image",
                accepts: ["text", "image", "video", "audio", "caption", "template"]
            });
        }

        // Text track
        if (textItems.length > 0) {
            tracks.push({
                id: textTrackId,
                accepts: ["text", "audio", "helper", "video", "image", "caption", "template"],
                type: "text",
                items: textItems,
                magnetic: false,
                static: false
            });
        }

        // Build final JSON structure
        const remotionJson = {
            id: mainId,
            size: {
                width: this.videoWidth,
                height: this.videoHeight
            },
            fps: this.fps,
            tracks: tracks,
            trackItemIds: allItemIds,
            trackItemsMap: trackItemsMap,
            transitionIds: transitionIds,
            transitionsMap: transitionsMap,
            scale: {
                index: 7,
                unit: 300,
                zoom: 0.0033333333333333335,
                segments: 5
            },
            duration: totalVideoDuration,
            activeIds: [],
            trackItemDetailsMap: trackItemDetailsMap,
            structure: []
        };

        return remotionJson;
    }

    /**
     * Save JSON to file
     */
    saveToFile(jsonData, filename = 'remotion_output.json') {
        fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log(`Remotion JSON saved to ${filename}`);
    }

    /**
     * Load SRT file
     */
    loadSrtFile(filepath) {
        try {
            return fs.readFileSync(filepath, 'utf8');
        } catch (error) {
            console.error(`Error reading SRT file: ${error.message}`);
            return null;
        }
    }

    /**
     * Debug function to check subtitle positioning
     */
    debugSubtitlePositioning() {
        console.log('=== Subtitle Debug Info ===');
        console.log(`Video dimensions: ${this.videoWidth}x${this.videoHeight}`);
        console.log(`Subtitle bottom margin: ${this.subtitleBottomMargin}`);
        console.log(`Subtitle height area: ${this.subtitleHeight}`);
        console.log(`Calculated subtitle top position: ${this.videoHeight - this.subtitleBottomMargin}`);
        console.log(`Subtitle width: ${this.videoWidth - 80}`);
        console.log('============================');
    }
}

// Example usage function with debugging
function generateVideoJson() {
    // Example assets
    const imageUrls = [
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f",
        "https://ik.imagekit.io/wombo/images/img5.jpg"
    ];

    const audioUrls = [
        "https://cdn.designcombo.dev/audio/Dawn%20of%20change.mp3"
    ];

    // Example SRT content with proper timing
    const srtContent = `1
00:00:01,000 --> 00:00:04,000
This is the first caption at the bottom.

2
00:00:05,500 --> 00:00:08,500
Here comes the second caption with better styling.`;

    // Create generator
    const generator = new RemotionJsonGenerator(1080, 1920, 30);
    
    // Debug subtitle positioning
    generator.debugSubtitlePositioning();

    // Generate JSON with new options
    const remotionJson = generator.generateRemotionJson({
        imageUrls: imageUrls,
        audioUrls: audioUrls,
        srtContent: srtContent,
        imageDurations: [5000, 5000],
        imageWidths: [4000, 1920],
        imageHeights: [2670, 1280],
        imageFitModes: ['cover', 'cover'],
        transitionTypes: ['fade'],
        enableTransitions: true
    });

    // Check if subtitles were created
    const textItems = Object.values(remotionJson.trackItemsMap).filter(item => item.type === 'text');
    console.log(`Generated ${textItems.length} subtitle items:`);
    textItems.forEach((item, index) => {
        console.log(`Subtitle ${index + 1}:`, {
            text: item.details.text,
            from: item.display.from,
            to: item.display.to,
            top: item.details.top,
            left: item.details.left
        });
    });

    // Save to file
    generator.saveToFile(remotionJson, 'remotion_output.json');

    return remotionJson;
}

// Helper function to process assets from files
function processAssetsFromFiles(options = {}) {
    const {
        imageUrlsFile = null,
        audioUrlsFile = null,
        srtFile = null,
        outputFile = 'remotion_output.json'
    } = options;

    const generator = new RemotionJsonGenerator();

    let imageUrls = [];
    let audioUrls = [];
    let srtContent = null;

    // Load image URLs from file
    if (imageUrlsFile && fs.existsSync(imageUrlsFile)) {
        const content = fs.readFileSync(imageUrlsFile, 'utf8');
        imageUrls = content.split('\n').filter(url => url.trim() !== '');
    }

    // Load audio URLs from file
    if (audioUrlsFile && fs.existsSync(audioUrlsFile)) {
        const content = fs.readFileSync(audioUrlsFile, 'utf8');
        audioUrls = content.split('\n').filter(url => url.trim() !== '');
    }

    // Load SRT content
    if (srtFile && fs.existsSync(srtFile)) {
        srtContent = generator.loadSrtFile(srtFile);
    }

    // Generate JSON
    const remotionJson = generator.generateRemotionJson({
        imageUrls,
        audioUrls,
        srtContent
    });

    // Save to file
    generator.saveToFile(remotionJson, outputFile);

    return remotionJson;
}

// Export for use as module
module.exports = {
    RemotionJsonGenerator,
    generateVideoJson,
    processAssetsFromFiles
};

// Run example if called directly
if (require.main === module) {
    generateVideoJson();
}
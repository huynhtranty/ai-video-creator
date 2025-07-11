"use client";

import React, { useRef } from "react";
import {
  ADD_AUDIO,
  ADD_IMAGE,
  ADD_TEXT,
  ADD_VIDEO,
  dispatch,
} from "@designcombo/events";
import { Button } from "../../components/ui/button";
import Timeline from "../../components/timeline";
import { generateId } from "@designcombo/timeline";
import { DEFAULT_FONT } from "../../constants/font";
import { Player } from "../../components/player";
import useStore from "../../store/store";
import useTimelineEvents from "../../hooks/use-timeline-events";

// Resource type for the side panel.
export type ResourceType = "image" | "text" | "audio" | "video";

export interface Resource {
  id: string;
  type: ResourceType;
  content: string; // For media items, this is the URL; for text, this is the text content.
}

// AppProps accepts timelineItems (for Timeline) and resources (for the side panel).
interface AppProps {
  timelineItems?: any[];
  resources?: Resource[];
}

const App: React.FC<AppProps> = ({ timelineItems = [], resources = [] }) => {
  const { playerRef } = useStore();
  useTimelineEvents();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When the user clicks a resource, dispatch its corresponding event.
  const handleResourceClick = (resource: Resource) => {
    if (resource.type === "image") {
      dispatch(ADD_IMAGE, {
        payload: {
          id: resource.id,
          details: { src: resource.content },
        },
      });
    } else if (resource.type === "text") {
      dispatch(ADD_TEXT, {
        payload: {
          id: resource.id,
          details: { text: resource.content },
        },
      });
    } else if (resource.type === "audio") {
      dispatch(ADD_AUDIO, {
        payload: {
          id: resource.id,
          details: { src: resource.content },
        },
      });
    } else if (resource.type === "video") {
      dispatch(ADD_VIDEO, {
        payload: {
          id: resource.id,
          details: { src: resource.content },
        },
      });
    }
  };

  // Handler for the file input (for Upload button)
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (files: File[]) => {
    const resourceId = "VMJQit9N0hJaCAss";
    dispatch(ADD_VIDEO, {
      payload: {
        id: resourceId,
        display: {
          from: 2000,
          to: 7000,
        },
        details: {
          src: URL.createObjectURL(files[0]),
          name: files[0].name,
        },
        metadata: {
          resourceId,
        },
      },
    });
  };

  const handleFileChange = (newFiles: File[]) => {
    handleFileUpload(newFiles);
  };

  // These handlers enable the add buttons to work as before.
  const handleAddImage = () => {
    dispatch(ADD_IMAGE, {
      payload: {
        id: generateId(),
        details: {
          src: "https://designcombo.imgix.net/images/sample-image.jpg",
        },
      },
    });
  };

  const handleAddVideo = () => {
    const resourceId = "VMJQit9N0hJaCAss";
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId(),
        details: {
          src: "https://designcombo.imgix.net/videos/sample-video.mp4",
          volume: 50,
        },
        metadata: {
          resourceId,
        },
      },
    });
  };

  const handleAddAudio = () => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: {
          src: "https://designcombo.imgix.net/audios/stop-in-the-name-of-love.mp3",
          volume: 50,
        },
      },
    });
  };

  const handleAddText = () => {
    dispatch(ADD_TEXT, {
      payload: {
        id: generateId(),
        details: {
          text: "Remotion",
          fontSize: 142,
          fontFamily: DEFAULT_FONT.postScriptName,
          fontUrl: DEFAULT_FONT.url,
          width: 400,
          textAlign: "left",
          color: "#ffffff",
          left: 80,
        },
      },
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top section: video player + controls and resource side panel */}
      <div className="flex flex-1">
        {/* Left-side resource panel */}
        <aside className="w-64 bg-gray-200 p-4 overflow-y-auto border-r border-gray-300">
          <h2 className="text-lg font-bold mb-4">Resources</h2>
          {resources.length === 0 ? (
            <p>No Resources</p>
          ) : (
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="cursor-pointer p-2 bg-white rounded shadow hover:bg-gray-100"
                  onClick={() => handleResourceClick(resource)}
                >
                  {resource.type === "image" && (
                    <img
                      src={resource.content}
                      alt="Resource"
                      className="w-full h-32 object-cover"
                    />
                  )}
                  {resource.type === "video" && (
                    <video
                      className="w-full h-32 object-cover"
                      controls
                    >
                      <source src={resource.content} type="video/mp4" />
                      Your browser does not support video.
                    </video>
                  )}
                  {resource.type === "audio" && (
                    <audio controls className="w-full">
                      <source src={resource.content} />
                      Your browser does not support audio.
                    </audio>
                  )}
                  {resource.type === "text" && (
                    <p className="text-gray-800">{resource.content}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Right-side: Video player area and control buttons */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="flex-1 flex items-center justify-center bg-black">
            <Player />
          </div>
          {/* Control buttons */}
          <div className="p-4 flex justify-center gap-2 border-t border-gray-300">
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              accept="video/*"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
              className="hidden"
            />
            <Button size={"sm"} onClick={handleClick} variant={"secondary"}>
              Upload
            </Button>
            <Button size={"sm"} onClick={handleAddImage} variant={"secondary"}>
              Add Image
            </Button>
            <Button size={"sm"} onClick={handleAddVideo} variant={"secondary"}>
              Add Video
            </Button>
            <Button size={"sm"} onClick={handleAddAudio} variant={"secondary"}>
              Add Audio
            </Button>
            <Button size={"sm"} onClick={handleAddText} variant={"secondary"}>
              Add Text
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom section: Timeline */}
      {playerRef && (
        <div className="h-20 border-t border-gray-300">
          <Timeline timelineItems={timelineItems} />
        </div>
      )}
    </div>
  );
};

export default App;

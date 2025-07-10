import React from 'react';
import { useEffect, useRef } from "react";
import {Composition} from 'remotion';
import composition from '../features/editor/player/composition';
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import useStore from "../features/editor/store/use-store";
 
export const RemotionRoot: React.FC = () => {
    const playerRef = useRef<PlayerRef>(null);
  const { setPlayerRef, duration, fps, size } = useStore();

  useEffect(() => {
    setPlayerRef(playerRef);
  }, []);
  return (
    <>
      <Composition
        id="Empty"
        // Import the component and add the properties you had in the `<Player>` before
        component={composition}
        durationInFrames={Math.round((duration / 1000) * fps) || 1}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
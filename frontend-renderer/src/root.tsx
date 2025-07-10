import { Composition, getInputProps } from "remotion";
import { IDesign } from "@designcombo/types";
import { Composition as CoreComposition } from "./composition";
import { FPS, calcMetadata, WIDTH, HEIGHT } from "./utils/calc-metadata";

type RemotionRootProps = {
  design: IDesign;
  size?: { width: number; height: number };
};

export const RemotionRoot: React.FC<RemotionRootProps> = ({ design, size }) => {
  return (
    <>
      <Composition
        id="RenderVideo"
        component={CoreComposition}
        durationInFrames={60}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          design,
          size: size ?? {
            width: WIDTH,
            height: HEIGHT,
          },
        }}
        calculateMetadata={calcMetadata}
      />
    </>
  );
};

import useLayoutStore from "../store/use-layout-store";
import { Texts } from "./texts";
import { Audios } from "./audios";
import { Elements } from "./elements";
import { Images } from "./images";
import { Videos } from "./videos";

export interface ItemProps {
  videoName: string;
  videoId: string;
  imageUrls: string[];
  audioUrls: string[];
  srtCaption: string;
}

const ActiveMenuItem = ({ videoName, videoId, imageUrls, audioUrls, srtCaption }: ItemProps) => {
  const { activeMenuItem } = useLayoutStore();
  

  if (activeMenuItem === "texts") {
    return <Texts srt = {srtCaption} />;
  }
  if (activeMenuItem === "shapes") {
    return <Elements />;
  }
  if (activeMenuItem === "videos") {
    return <Videos />;
  }

  if (activeMenuItem === "audios") {
    return <Audios  audioUrls={audioUrls}/>;
  }

  if (activeMenuItem === "images") {
    return <Images imageUrls={imageUrls} />;
  }

  return null;
};

export const MenuItem = (props: ItemProps) => {
  return (
    <div className="w-[300px] flex-1">
      <ActiveMenuItem {...props}/>
    </div>
  );
};

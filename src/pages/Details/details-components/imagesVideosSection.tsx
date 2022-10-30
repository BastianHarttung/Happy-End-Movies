import React from 'react';
import classes from "./imagesVideosSection.module.scss";
import ImagesBox from "./imagesBox";
import {IImagesWatchFetching, IVideoResult} from "../../../models/interfaces/interfaces";
import VideoBox from "./videoBox";

interface IImagesVideosSectionProps {
  images: IImagesWatchFetching;
  videos: IVideoResult[];
  classNameContent?: string;
}

const ImagesVideosSection = ({images, videos, classNameContent}: IImagesVideosSectionProps) => {

  return (
    <div className={`${classes.videosImagesContainer} ${classNameContent}`}>

      {!!images.posters.length && (
        <ImagesBox
          title={"Poster"}
          images={images.posters}
        />
      )}

      {!!images.backdrops.length && (
        <ImagesBox
          title={"Hintergründe"}
          images={images.backdrops}
        />
      )}

      {!!images.logos.length && (
        <ImagesBox title={"Logos"} images={images.logos}/>
      )}

      {!!videos.length && (
        <VideoBox videos={videos}/>
      )}

    </div>
  );

};

export default ImagesVideosSection;

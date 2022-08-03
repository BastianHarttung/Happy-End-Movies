import React from 'react';
import classes from "./imagesVideosSection.module.scss";
import {IImagesWatchFetching, IVideoResult} from "../../../models/interfaces";
import ImagesBox from "./imagesBox";

interface IImagesVideosSectionProps {
  images: IImagesWatchFetching;
  videos: IVideoResult[];
  classNameContent?: string;
}

const ImagesVideosSection = ({images, videos, classNameContent}: IImagesVideosSectionProps) => {

  return (
    <div className={`${classes.videosImagesContainer} ${classNameContent}`}>
      <div>
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
      </div>
      <div className={classes.videoContainer}>
        {videos.map((video, index) => {
          return (
            <div key={index} className={classes.videoBox}>
              <iframe
                width="260"
                title={video.name}
                loading="lazy"
                src={"https://www.youtube.com/embed/" + video.key}
              ></iframe>
              <div className={classes.videoName}>{video.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

};

export default ImagesVideosSection;

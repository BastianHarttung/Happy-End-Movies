import classes from "./videoBox.module.scss";
import React from "react";
import {IVideoResult} from "../../../models/interfaces/interfaces";

interface IVideoBoxProps {
  videos: IVideoResult[]
}

const VideoBox = ({videos}: IVideoBoxProps) => {

  return (<>
    <div><i>Trailer</i></div>
    <div className={classes.videoContainer}>
      {videos.map((video, index) => {
        return (
          <div key={index}
               className={classes.videoBox}>
            <iframe
              width="260"
              loading="lazy"
              src={"https://www.youtube.com/embed/" + video.key}
            ></iframe>
            <div className={classes.videoName}
                 title={video.name}>
              {video.name}
            </div>
          </div>
        );
      })}
    </div>
  </>)
}

export default VideoBox
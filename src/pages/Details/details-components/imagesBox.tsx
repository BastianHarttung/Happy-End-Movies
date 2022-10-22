import React from "react";
import classes from "./imagesBox.module.scss";
import {imageUrlBig} from "../../../constants";
import {IImage} from "../../../models/interfaces/interfaces";

interface IImagesBoxProps {
  title: string,
  images: IImage[],
}

function ImagesBox({title, images}: IImagesBoxProps) {

  return (
    <div>
      <div><i>{title}</i></div>
      <div className={classes.imagesContainer}>
        {images.map((image: IImage, index) => {
          return (
            <a
              key={index}
              href={imageUrlBig + image.file_path}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={imageUrlBig + image.file_path}
                alt="Poster"
                loading="lazy"
                className={classes.images}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default ImagesBox;
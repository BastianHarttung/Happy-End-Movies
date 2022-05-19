import React from "react";
import classes from "../pages/DetailsMovie.module.scss";
import {imageUrlBig} from "../constants";
import {IImage} from "../interfaces/interfaces";

interface IImagesBoxProps {
  title: string,
  images: [],
}

function ImagesBox({title, images}: IImagesBoxProps) {
  return (
    <div>
      <div>{title}</div>
      <div className={classes.imageContainer}>
        {images.map((image: IImage, index) => {
          return (
            <a
              href={imageUrlBig + image.file_path}
              target="_blank"
              rel="noreferrer"
              key={index}
              className={classes.imageBox}
            >
              <img
                src={imageUrlBig + image.file_path}
                alt="Poster"
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
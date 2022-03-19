import React from "react";
import classes from "../pages/DetailsMovie.module.scss";
import { imageUrl } from "../constants";

function ImagesBox({ title,images }) {
   return (
      <div>
         <div>{title}</div>
         <div className={classes.imageContainer}>
            {images.map((image, index) => {
               return (
                  <a
                     href={imageUrl + image.file_path}
                     target="_blank"
                     rel="noreferrer"
                     key={index}
                     className={classes.imageBox}
                  >
                     <img
                        src={imageUrl + image.file_path}
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
import classes from "./LoadingMovieStreifen.module.scss";
import MovieStreifen from "../../assets/icons/MovieStreifen.svg";

export default function LoadingMovieStreifen() {
  return (
    <div className={classes["logo-container"]}>
      <img src={MovieStreifen} alt="Adidas Logo" className={classes["logo-svg"]}/>
    </div>
  );
}
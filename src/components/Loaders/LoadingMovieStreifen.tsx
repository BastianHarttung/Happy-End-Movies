import classes from "./LoadingMovieStreifen.module.scss";
import MovieStreifen from "../../assets/icons/MovieStreifen.svg";

export default function LoadingMovieStreifen() {
  return (
    <div className={classes["logo-container"]}>
      <img src={MovieStreifen} alt="Loading Movies" className={classes["logo-svg"]}/>
    </div>
  );
}
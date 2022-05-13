import classes from "./SearchResultBox.module.scss";
import {imageUrl} from "../constants";
import {FaSmileBeam, FaSadTear} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
//Pictures
import emptyImage from "../assets/img/movie-poster.png";
import emptyImageMan from "../assets/img/actor_man_white.png";
import emptyImageWoman from "../assets/img/actor_girl_white.png";
import iconPopcorn from "../assets/icons/popcorn_solid.svg";
import iconTv from "../assets/icons/tv-retro_solid.svg";
import iconUser from "../assets/icons/user-tie_solid.svg";
//Interfaces
import {TCategory} from "../interfaces/types";
import {IMovie, ISearch} from "../interfaces/interfaces";


interface ISearchResultBoxProps {
  saveSelectedMovie: (currentMovie: IMovie, category: TCategory) => Promise<void>,
  category: TCategory | undefined,
  movie: ISearch,
}

const SearchResultBox = ({saveSelectedMovie, category, movie}: ISearchResultBoxProps) => {

  const navigate = useNavigate();
  const [movieClicked, setMovieClicked] = useState(false);


  const Smiley = (): JSX.Element => {
    if (movie.has_happy_end) return <FaSmileBeam className={classes.smileyLaugh}/>;
    if (!movie.has_happy_end) return <FaSadTear className={classes.smileySad}/>;
    else return <span/>;
  };

  const CategoryIcon = (): JSX.Element => {
    if (category === "movie" || movie.category === "movie" || movie.media_type === "movie") {
      return <img src={iconPopcorn}
                  alt="Film"
                  title="Film"
                  className={classes.categoryIcon}/>;
    } else if (category === "tv" || movie.category === "tv" || movie.media_type === "tv") {
      return <img src={iconTv}
                  alt="Serie"
                  title="Serie"
                  className={classes.categoryIcon}/>;
    } else if (category === "person" || movie.media_type === "person") {
      return <img src={iconUser}
                  alt="Schauspieler"
                  title="Schauspieler"
                  className={classes.categoryIcon}/>;
    } else return <span/>;
  };

  async function handleClick() {
    setMovieClicked(true);
    const getCategory = (): TCategory => {
      if (category === "movie" || category === "tv" || category === "person") {
        return category;
      } else return movie.category || "movie";
    };
    await saveSelectedMovie(movie, getCategory())
      .then(() => {
        navigate(`/detailansicht/${getCategory()}/${movie.id}`);
        setMovieClicked(false);
      });
  }

  return (
    <div className={classes.movieContainer}
         onClick={handleClick}>

      {movieClicked &&
      <div className={classes.loaderContainer}>
          <div className={classes.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>}

      <img className={classes.movieImage}
           src={setImageForPoster()}
           alt="Poster"/>

      <div className={classes.movieInfosContainer}>
        {movie.title ?
          <div className={classes.movieTitle}>{movie.title}</div>
          : movie.original_name ?
            <div className={classes.movieTitle}>{movie.original_name}</div>
            : <div className={classes.movieTitle}>{movie.name}</div>}
        <Smiley/>
        <CategoryIcon/>
      </div>

    </div>
  );

  function setImageForPoster() {
    if (movie.poster_path) return imageUrl + movie.poster_path;
    if (movie.profile_path) return imageUrl + movie.profile_path;
    if (movie.media_type !== "person" && category !== "person") return emptyImage;
    if (movie.gender === 2 || movie.gender === 0) return emptyImageMan;
    if (movie.gender === 1) return emptyImageWoman;
  }

};

export default SearchResultBox;
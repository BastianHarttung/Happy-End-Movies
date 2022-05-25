import classes from "./SearchResultBox.module.scss";
import {imageUrlBig} from "../constants";
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
import {TCategory, TCategorySearch, TGender, THasHappyEnd} from "../interfaces/types";
import apiStore from "../stores/api-store";


interface ISearchResultBoxProps {
  id: number,
  category: TCategorySearch,
  movieName: string,
  hasHappyEnd?: THasHappyEnd,
  posterPath: string,
  personGender?: TGender,
}

const SearchResultBox = ({id, category, movieName, hasHappyEnd, posterPath, personGender}: ISearchResultBoxProps) => {

  const {saveSelectedMovieOrPerson} = apiStore;

  const navigate = useNavigate();
  // For Loading Sequence on Box
  const [movieClicked, setMovieClicked] = useState(false);


  const Smiley = (): JSX.Element => {
    if (hasHappyEnd === "true") return <FaSmileBeam className={classes.smileyLaugh}/>;
    if (hasHappyEnd === "false") return <FaSadTear className={classes.smileySad}/>;
    else return <span/>;
  };

  const CategoryIcon = (): JSX.Element => {
    if (category === "movie") {
      return <img src={iconPopcorn}
                  alt="Film"
                  title="Film"
                  className={classes.categoryIcon}/>;
    } else if (category === "tv") {
      return <img src={iconTv}
                  alt="Serie"
                  title="Serie"
                  className={classes.categoryIcon}/>;
    } else if (category === "person") {
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
      } else return "movie"; //Todo what if category is multi
    };
    await saveSelectedMovieOrPerson({id, name: movieName}, getCategory())
      .then(() => {
        navigate(`/detailansicht/${getCategory()}/${id}`);
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
        {movieName}
        <Smiley/>
        <CategoryIcon/>
      </div>

    </div>
  );

  function setImageForPoster(): string {
    if (!!posterPath) return imageUrlBig + posterPath;
    else if (!!!posterPath && category === "person") {
      if (personGender === 2) return emptyImageMan;
      if (personGender === 1) return emptyImageWoman;
      else return emptyImageMan   //Todo possibly Picture Questionmark for Person with gender 0
    } else return emptyImage
  }

};

export default SearchResultBox;
import classes from "./SearchResultBox.module.scss";
import { useNavigate } from "react-router-dom";
import { FaSmileBeam, FaSadTear } from "react-icons/fa";
import { observer } from "mobx-react";
import { imageUrlBig } from "../constants";
//Pictures
import emptyImage from "../assets/img/movie-poster.png";
import emptyImageMan from "../assets/img/actor_man_white.png";
import emptyImageWoman from "../assets/img/actor_girl_white.png";
import emptyImagePerson from "../assets/img/questionmark.png";
import iconPopcorn from "../assets/icons/popcorn_solid.svg";
import iconTv from "../assets/icons/tv-retro_solid.svg";
import iconUser from "../assets/icons/user-tie_solid.svg";
//Interfaces
import {
  TCategory,
  TCategorySearch,
  TGender,
  THasHappyEnd,
} from "../models/types";
import { ROUTES } from "../models/routes";


interface ISearchResultBoxProps {
  id: number;
  category: TCategorySearch;
  mediaType?: TCategory | undefined;
  movieName?: string;
  posterPath: string;
  hasHappyEnd: THasHappyEnd | null;
  personGender?: TGender;
  onClick?: ({ id }: any, category: TCategory) => void;
}

const SearchResultBox = ({
  id,
  category,
  mediaType,
  movieName,
  posterPath,
  hasHappyEnd,
  personGender,
  onClick,
}: ISearchResultBoxProps) => {
  const navigate = useNavigate();

  const Smiley = (): JSX.Element => {
    if (hasHappyEnd === "true")
      return <FaSmileBeam className={classes.smileyLaugh} />;
    if (hasHappyEnd === "false")
      return <FaSadTear className={classes.smileySad} />;
    else return <span />;
  };

  const CategoryIcon = (): JSX.Element => {
    const isMulti = category === "multi";

    if (category === "movie" || (isMulti && mediaType === "movie")) {
      return (
        <img
          src={iconPopcorn}
          alt="Film"
          title="Film"
          className={classes.categoryIcon}
        />
      );
    } else if (category === "tv" || (isMulti && mediaType === "tv")) {
      return (
        <img
          src={iconTv}
          alt="Serie"
          title="Serie"
          className={classes.categoryIcon}
        />
      );
    } else if (category === "person" || (isMulti && mediaType === "person")) {
      return (
        <img
          src={iconUser}
          alt="Schauspieler"
          title="Schauspieler"
          className={classes.categoryIcon}
        />
      );
    } else return <span />;
  };

  function handleClick() {
    const getCategory = (): TCategory => {
      if (category === "movie" || category === "tv" || category === "person") {
        return category;
      } else if (category === "multi" && mediaType) {
        return mediaType;
      } else return "movie";
    };

    if (onClick) onClick(id, getCategory());
    else
      navigate(ROUTES.DETAILS_WITH_CATEGORY_ID(getCategory(), id.toString()));
  }

  function setImageForPoster(): string {
    if (!!posterPath) return imageUrlBig + posterPath;
    else if (!posterPath && category === "person") {
      if (personGender === 2) return emptyImageMan;
      if (personGender === 1) return emptyImageWoman;
      else return emptyImagePerson;
    } else return emptyImage;
  }

  return (
    <div className={classes.movieContainer} onClick={handleClick}>
      <img
        className={classes.movieImage}
        src={setImageForPoster()}
        loading="lazy"
        alt="Poster"
      />

      <div className={classes.movieInfosContainer}>
        {movieName}
        <Smiley />
        <CategoryIcon />
      </div>
    </div>
  );
};

export default observer(SearchResultBox);

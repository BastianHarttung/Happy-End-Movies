import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {Link} from "react-router-dom";
import {useState} from "react";


const SearchResultBox = (props) => {
    const imageUrl = "https://image.tmdb.org/t/p/w500"

    return (
        <Link to= "/detailansicht"
              onClick={() =>{props.parentCallback(props.movie)} }
              className={classes.movieContainer}>

            <img className={classes.movieImage}
                 src={props.movie.poster_path != null ? imageUrl + props.movie.poster_path : emptyImage} alt="Poster"/>
            <div className={classes.movieTitle}>{props.movie.title}</div>

        </Link>
    )

}

export default SearchResultBox;
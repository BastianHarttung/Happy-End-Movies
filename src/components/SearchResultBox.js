import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {imageUrl} from "../constants";
import {FaSmileBeam, FaSadTear} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SearchResultBox = (props) => {

    const navigate = useNavigate();
    const [movieClicked, setMovieClicked] = useState(false)

    const Smiley = () => {
        if (props.movie.has_happy_end === true) return <FaSmileBeam className={classes.smileyLaugh}/>
        if (props.movie.has_happy_end === false) return <FaSadTear className={classes.smileySad}/>
        else return ''
    }

    return (
        <div className={movieClicked? classes.movieContainerClicked :classes.movieContainer}
             onClick={async () => {
                 setMovieClicked(true);
                 await props.parentCallback(props.movie, props.category)
                     .then(() => {
                         navigate(props.to);
                         window.location.hash = `${props.movie.title}`;
                         setMovieClicked(false)
                     })
             }}>

            <img className={classes.movieImage}
                 src={props.movie.poster_path != null ? imageUrl + props.movie.poster_path : emptyImage}
                 alt="Poster"/>

            <div className={classes.movieInfosContainer}>
                <div className={classes.movieTitle}>{props.movie.title}</div>
                <Smiley/>
            </div>

        </div>
    )

}

export default SearchResultBox;
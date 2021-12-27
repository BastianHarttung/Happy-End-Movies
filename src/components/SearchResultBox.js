import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {imageUrl, imageUrlSmall} from "../constants";
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
        <div className={movieClicked ? classes.movieContainerClicked : classes.movieContainer}
             onClick={async () => {
                 if (!props.movie.name) {
                     setMovieClicked(true);
                     const category = () => {
                         if (props.category === ('movie' || 'tv')) {
                             return props.category
                         } else if (props.category === 'multi' && props.movie.media_type === ('movie' || 'tv')) {
                             return props.movie.media_type
                         } else return ''
                     }
                     await props.saveSelectedMovie(props.movie, category)
                         .then(() => {
                             navigate(props.to);
                             window.location.hash = `${props.movie.title}`;
                             setMovieClicked(false)
                         })
                 }
             }}>

            <img className={classes.movieImage}
                 src={props.movie.poster_path ?
                     imageUrl + props.movie.poster_path
                     : props.movie.profile_path ?
                         imageUrl + props.movie.profile_path
                         : emptyImage}
                 alt="Poster"/>

            <div className={classes.movieInfosContainer}>
                {props.movie.title ?
                    <div className={classes.movieTitle}>{props.movie.title}</div>
                    : props.movie.original_name ?
                        <div className={classes.movieTitle}>{props.movie.original_name}</div>
                        : <div className={classes.movieTitle}>{props.movie.name}</div>}
                <Smiley/>
            </div>

        </div>
    )

}

export default SearchResultBox;
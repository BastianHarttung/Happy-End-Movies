import classes from "./SearchResultBox.module.scss";
import emptyImage from "../assets/img/movie-poster.png"
import {imageUrl} from "../constants";
import {FaSmileBeam, FaSadTear} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import iconPopcorn from "../assets/icons/popcorn_solid.svg"
import iconTv from "../assets/icons/tv-retro_solid.svg"
import iconUser from "../assets/icons/user-tie_solid.svg"

const SearchResultBox = (props) => {

    const navigate = useNavigate();
    const [movieClicked, setMovieClicked] = useState(false)

    const Smiley = () => {
        if (props.movie.has_happy_end === true) return <FaSmileBeam className={classes.smileyLaugh}/>
        if (props.movie.has_happy_end === false) return <FaSadTear className={classes.smileySad}/>
        else return ''
    }

    const CategoryIcon = () => {
        if (props.category === 'movie' || props.movie.category === 'movie' || props.movie.media_type === 'movie') {
            return <img src={iconPopcorn}
                        alt="Film"
                        title="Film"
                        className={classes.categoryIcon}/>
        } else if (props.category === 'tv' || props.movie.category === 'tv' || props.movie.media_type === 'tv') {
            return <img src={iconTv}
                        alt="Serie"
                        title="Serie"
                        className={classes.categoryIcon}/>
        } else if (props.category === 'person' || props.movie.media_type === 'person') {
            return <img src={iconUser}
                        alt="Schauspieler"
                        title="Schauspieler"
                        className={classes.categoryIcon}/>
        } else return ''
    }

    return (
        <div className={classes.movieContainer}
             onClick={async () => {
                 setMovieClicked(true);
                 const category = () => {
                     if (props.category === 'movie' || props.category === 'tv' || props.category === 'person') {
                         return props.category
                     } else if (props.category === 'multi') {
                         return props.movie.media_type
                     } else return props.movie.category
                 }
                 await props.saveSelectedMovie(props.movie, category())
                     .then(() => {
                         navigate(`/detailansicht/${category()}/${props.movie.id}`);
                         setMovieClicked(false)
                     })
             }}>

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
                <CategoryIcon/>
            </div>

        </div>
    )

}

export default SearchResultBox;
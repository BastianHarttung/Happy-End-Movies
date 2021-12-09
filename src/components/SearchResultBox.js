import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {imageUrl} from "../constants";
import {FaSmileBeam, FaSadTear} from "react-icons/all";
import {useNavigate} from "react-router-dom";

const SearchResultBox = (props) => {

    const navigate = useNavigate();

    const Smiley = () => {
        if (props.movie.has_happy_end === true) return <FaSmileBeam className={classes.smileyLaugh}/>
        if (props.movie.has_happy_end === false) return <FaSadTear className={classes.smileySad}/>
        else return ''
    }

    return (
        <div className={classes.movieContainer}
             onClick={async () => {
                 await props.parentCallback(props.movie)
                     .then(() => {
                         navigate(props.to);
                         window.location.hash = `${props.movie.title}`;
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
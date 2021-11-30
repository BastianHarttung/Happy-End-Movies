import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {Link} from "react-router-dom";
import {imageUrl} from "../constants";
import {FaSmileBeam, FaSadTear} from "react-icons/all";


const SearchResultBox = (props) => {

    // Add a Condition to <Link> tag, else show <div>
    const ConditionalLink = ({children, to, condition}) => (!!condition && to)
        ? <Link to={{
                    pathname: `${to}`,
                    hash: `#${props.movie.title}` }}
                onClick={() => {
                    props.parentCallback(props.movie)
                }}
                className={classes.movieContainer}>{children}</Link>
        : <div className={classes.movieContainer}>{children}</div>

    const Smiley = () =>{
        if (props.movie.has_happy_end === true){
            return <FaSmileBeam className={classes.smileyLaugh}/>
        }
        if (props.movie.has_happy_end === false) {
            return <FaSadTear className={classes.smileySad}/>
        }
        else {
            return ''
        }
    }

    return (
        <ConditionalLink to={props.to}
                         condition={props.movie.title !== 'Searching...'}>

            <img className={classes.movieImage}
                 src={props.movie.poster_path != null ? imageUrl + props.movie.poster_path : emptyImage} alt="Poster"/>

            <div className={classes.movieInfosContainer}>
                <div className={classes.movieTitle}>{props.movie.title}</div>
                <Smiley/>
            </div>

        </ConditionalLink>
    )

}

export default SearchResultBox;
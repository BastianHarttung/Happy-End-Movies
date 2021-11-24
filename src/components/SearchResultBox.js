import classes from "./SearchResultBox.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {Link} from "react-router-dom";


const SearchResultBox = (props) => {

    // Add a Condition to <Link> tag, else show <div>
    const ConditionalLink = ({children, to, condition}) => (!!condition && to)
        ? <Link to={{
                    pathname: `${to}`,
                    hash: `#${props.movie.title}`}}
                onClick={() => { props.parentCallback(props.movie) }}
                className={classes.movieContainer}>{children}</Link>
        : <div className={classes.movieContainer}>{children}</div>

   return (
        <ConditionalLink to ='/detailansicht' condition={props.movie.title !== 'Searching...'}>

            <img className={classes.movieImage}
                              src={props.movie.poster_path != null ? props.imageUrl + props.movie.poster_path : emptyImage} alt="Poster"/>
            <div className={classes.movieTitle}>{props.movie.title}</div>

        </ConditionalLink>
   )

}

export default SearchResultBox;
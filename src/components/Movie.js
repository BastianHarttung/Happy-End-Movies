import classes from "./Movie.module.css";

const Movie = (props) =>{
    return(
        <div className={classes.movieContainer}>
            <img src={props.imageUrl+props.movie.poster_path}
                 className={classes.image}
                 alt={props.movie.title}
                 title={props.movie.title}/>
            <h4 className={classes.movieTitle}>{props.movie.title}</h4>
        </div>
    )
}

export default Movie
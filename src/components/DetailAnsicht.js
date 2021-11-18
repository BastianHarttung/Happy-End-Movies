import classes from "./DetailAnsicht.module.css";
import emptyImage from "../assets/img/movie-poster.png"

const DetailAnsicht = (props) => {
    const imageUrl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

    const genres = props.movie.genres ? props.movie.genres : []

    console.log(props.movie.genres)

    return (
        <section className={classes.detailsSection}>
            <div className={classes.movieBox}>
                <img className={classes.detailsImage} src={props.movie.poster_path ? imageUrl : emptyImage}
                     alt="Poster"/>
                <div className={classes.detailsContainer}>
                    <h3>{props.movie.title}</h3>
                    {genres.map( genre => {return <div>{genre}</div>} )}
                </div>
            </div>
        </section>
    )

}

export default DetailAnsicht;
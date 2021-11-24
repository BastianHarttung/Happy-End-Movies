import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import {emptyMovieArray} from "../constants";

const Showroom = (props) => {

    const [movies, setMovies] = useState(props.moviesDB ? props.moviesDB : emptyMovieArray)

    return (
        <section className={classes.showroomSection}>
            <div className={classes.sidebar}>
                <div className={classes.filterContainer}>
                    <div className={classes.filter} >Alle Filme</div>
                    <div className={classes.filter} >Filme mit Happy End</div>
                    <div className={classes.filter} >Filme ohne Happy End</div>
                </div>
            </div>

            <div className={classes.filteredMoviesContainer}>
                { movies.map((movie)=>
                    <SearchResultBox
                        key={movie.id}
                        movie={movie} />) }
            </div>
        </section>
    )
}

export default Showroom
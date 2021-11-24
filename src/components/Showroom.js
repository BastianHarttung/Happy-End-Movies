import classes from "./Showroom.module.css";
import Movie from "./Movie";

const Showroom = (props) => {
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
                {props.moviesDB.map((movie)=>
                    <Movie
                        movie={movie}
                        imageUrl={props.imageUrl}/>)}
            </div>
        </section>
    )
}

export default Showroom
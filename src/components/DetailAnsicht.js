import classes from "./DetailAnsicht.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {useState} from "react";
import {FaSmileBeam, FaSadTear} from "react-icons/all";

const DetailAnsicht = (props) => {

    const imageUrl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

    const genres = props.movie.genres ? props.movie.genres : []

    const [movieForDb, setMovieForDb] = useState(props.movie)

    const [happyMovie, setHappyMovie] = useState()

    function saveInfosInVariable(movieHasHappyEnd) {
        setMovieForDb({...props.movie, has_happy_end: movieHasHappyEnd})
    }

    return (
        <section className={classes.detailsSection}>
            <div className={classes.movieBox}>
                <img className={classes.detailsImage} src={props.movie.poster_path ? imageUrl : emptyImage}
                     alt="Poster"/>
                <div className={classes.detailsContainer}>

                    <div>
                        <h3>{props.movie.title}</h3>

                        <div className={classes.filmInfos}>
                            <div>
                                {genres.map((genre, index) => {
                                    return <div key={index}>{genre}</div>
                                })}
                            </div>
                            <div className={classes.voting}>{props.movie.vote_average}</div>
                        </div>

                        <div>Beschreibung: {props.movie.overview}</div>

                    </div>

                    <div>
                        <div>Happy End ?</div>
                        <div className={classes.smileys}>
                            <FaSmileBeam onClick={() => {
                                setHappyMovie(true)
                                saveInfosInVariable(true)
                            }}
                                         className={happyMovie ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                            <FaSadTear onClick={() => {
                                setHappyMovie(false);
                                saveInfosInVariable(false)
                            }}
                                       className={!happyMovie ? classes.smileySad : classes.smiley}></FaSadTear>
                        </div>
                    </div>

                    {/*<button onClick={() => {
                        console.log(movieForDb)
                    }}>log
                    </button>*/}

                </div>
            </div>
        </section>
    )

}

export default DetailAnsicht;
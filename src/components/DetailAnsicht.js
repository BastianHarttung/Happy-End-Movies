import classes from "./DetailAnsicht.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {useState} from "react";
import {FaSmileBeam, FaSadTear,FaMeh} from "react-icons/all";

const DetailAnsicht = (props) => {

    const imageUrl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

    const genres = props.movie.genres ? props.movie.genres : []

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState('neutral')

    function saveInfosInVariable(movieHasHappyEnd) {
        setMovieForDb({...props.movie, has_happy_end: movieHasHappyEnd})
    }

    function setColorForFsk(fsk) {
        if(fsk === 0) return 'lightgray'
        if(fsk === 6) return 'yellow'
        if(fsk === 12) return 'green'
        if(fsk === 16) return 'blue'
        if(fsk === 18) return 'red'
    }

    return (
        <section className={classes.detailsSection}>
            <div className={classes.movieBox}>
                <img className={classes.detailsImage} src={props.movie.poster_path ? imageUrl : emptyImage}
                     alt="Poster"/>
                <div className={classes.detailsContainer}>

                    <div>

                        <div className={classes.infosHead}>
                            <h3>{props.movie.title}</h3>
                            <div className={classes.fsk} style={{backgroundColor: setColorForFsk(props.movie.fsk)}}>{props.movie.fsk}</div>
                        </div>

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
                        <div className={classes.happyEnd}>Happy End ?</div>
                        <div className={classes.smileys}>
                            <div>
                                <FaSmileBeam onClick={() => {
                                    setHappyMovie(true)
                                    saveInfosInVariable(true)
                                }}
                                             className={ (happyMovie===true) ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                                <FaMeh onClick={() => {
                                    setHappyMovie('neutral');
                                    saveInfosInVariable('neutral')
                                }}
                                           className={ (happyMovie ==='neutral') ? classes.smileyNeutral : classes.smiley}></FaMeh>

                                <FaSadTear onClick={() => {
                                    setHappyMovie(false);
                                    saveInfosInVariable(false)
                                }}
                                           className={!happyMovie ? classes.smileySad : classes.smiley}></FaSadTear>
                            </div>

                            <button onClick={() => { props.parentCallback(movieForDb) }} className={classes.saveButton}>Speichern und zurück</button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )

}

export default DetailAnsicht;
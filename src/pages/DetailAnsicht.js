import classes from "./DetailAnsicht.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {FaSmileBeam, FaSadTear, FaMeh} from "react-icons/all";
import {imageUrl, imageUrlSmall} from "../constants";

const DetailAnsicht = (props) => {
    const navigate = useNavigate();
    const showActors = 5;

    const genres = props.movie.genres ? props.movie.genres : []

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState(props.movie.has_happy_end === true ? true
        : props.movie.has_happy_end === false ? false
            : 'neutral')

    useEffect(() => {
        props.movie.has_happy_end === true ? setHappyMovie(true)
            : props.movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    }, [props.movie.has_happy_end]);

    function setColorForFsk(fsk) {
        if (fsk === 0) return 'lightgray'
        if (fsk === 6) return 'yellow'
        if (fsk === 12) return 'green'
        if (fsk === 16) return 'blue'
        if (fsk === 18) return 'red'
    }

    return (
        <section className={classes.detailsSection}>
            <div className={classes.movieBox}>
                <img className={classes.detailsImage}
                     src={props.movie.poster_path ? imageUrl + props.movie.poster_path : emptyImage}
                     alt="Poster"/>
                <div className={classes.detailsContainer}>

                    <div>

                        <div className={classes.infosHead}>
                            <h3>{props.movie.title}</h3>
                            {props.movie.fsk >= 0 ?
                                <div className={classes.fsk}
                                     style={{backgroundColor: setColorForFsk(props.movie.fsk)}}>
                                    {props.movie.fsk}
                                </div>
                                : ''}
                        </div>

                        <div className={classes.filmInfos}>
                            <div>
                                {genres.map((genre, index) => {
                                    return <div key={index}>{genre}</div>
                                })}
                            </div>
                            <div className={classes.voting}>{props.movie.vote_average}</div>
                        </div>

                    </div>

                </div>
            </div>

            <div className={classes.descriptionHappyEndContainer}>

                <div className={classes.actorContainer}>
                    {props.movie.cast.slice(0, showActors).map((actor, index) => {
                        return <div key={index} className={classes.actorProfile}>
                            <img className={classes.actorImage} src={imageUrlSmall + actor.profile_path}/>
                            <h5 className={classes.actorName}>{actor.name}</h5>
                        </div>
                    })}
                </div>

                {props.movie.title
                    ? <div>Beschreibung: {props.movie.overview}</div>
                    : <div className={classes.loader}>Loading...</div>}
                <div className={classes.happyEnd}>Happy End ?</div>

                <div className={classes.smileys}>
                    <div>
                        <FaSmileBeam onClick={() => {
                            props.movie.has_happy_end = true;
                            setHappyMovie(true)
                            setMovieForDb({...props.movie, has_happy_end: true})
                        }}
                                     className={(happyMovie === true) ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                        <FaMeh onClick={() => {
                            props.movie.has_happy_end = 'neutral';
                            setHappyMovie('neutral');
                            setMovieForDb({...props.movie, has_happy_end: 'neutral'})
                        }}
                               className={(happyMovie === 'neutral') ? classes.smileyNeutral : classes.smiley}></FaMeh>

                        <FaSadTear onClick={() => {
                            props.movie.has_happy_end = false;
                            setHappyMovie(false);
                            setMovieForDb({...props.movie, has_happy_end: false})
                        }}
                                   className={!happyMovie ? classes.smileySad : classes.smiley}></FaSadTear>
                    </div>

                    <button onClick={() => {
                        props.parentCallback(movieForDb);
                        setHappyMovie('')
                        navigate('/showroom')
                    }} className={classes.saveButton}>In Datenbank speichern und zum Showroom
                    </button>

                </div>

            </div>

        </section>
    )

}

export default DetailAnsicht;
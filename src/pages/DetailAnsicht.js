import classes from "./DetailAnsicht.module.css";

import emptyImage from "../assets/img/movie-poster.png"
import imageActorMan from '../assets/img/actor.png'
import imageActorWoman from '../assets/img/actor_girl.png'

import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

import {FaSmileBeam, FaSadTear, FaMeh} from "react-icons/all";
import {imageUrl, imageUrlSmall} from "../constants";


const DetailAnsicht = (props) => {
    const navigate = useNavigate();

    const genres = props.movie.genres ? props.movie.genres : []

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState(props.movie.has_happy_end === true ? true
        : props.movie.has_happy_end === false ? false
            : 'neutral')
    const [showActors, setShowActors] = useState(5)

    useEffect(() => {
        console.log('props.movie',props.movie)
        props.movie.has_happy_end === true ? setHappyMovie(true)
            : props.movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    }, [props.movie.has_happy_end,props.movie]);

    function setColorForFsk(fsk) {
        if (fsk === 0) return 'lightgray'
        if (fsk === 6) return 'yellow'
        if (fsk === 12) return 'green'
        if (fsk === 16) return 'blue'
        if (fsk === 18) return 'red'
    }

    return (
        <section className={classes.detailsSection}>

            <div className={classes.movieHeadContainer}>
                <h2 className={classes.title}>{props.movie.title}</h2>
                <img src={props.movie.backdrop_path.length > 0 ?
                    imageUrl + props.movie.backdrop_path
                    : imageUrl + props.movie.poster_path}
                     className={classes.headImage}
                     alt=""/>
            </div>

            <div className={classes.movieBox}>
                <img className={classes.detailsImage}
                     src={props.movie.poster_path ? imageUrl + props.movie.poster_path : emptyImage}
                     alt="Poster"/>
                <div className={classes.detailsContainer}>

                    <div>

                        <div className={classes.infosHead}>
                            {props.movie.fsk >= 0 ?
                                <div className={classes.fsk}
                                     style={{backgroundColor: setColorForFsk(props.movie.fsk)}}>
                                    {props.movie.fsk}
                                </div>
                                : ''}
                        </div>

                        <p className={classes.releaseYear}>{props.movie.release_date ?
                            props.movie.release_date.slice(0, 4)
                            : ''}
                        </p>

                        <div className={classes.genres}>
                            {genres.map((genre, index) => <span key={index}>{genre}/ </span>)}
                        </div>

                        {props.movie.directors.map((director, index) => {
                                return (
                                    <>
                                        <h5 className={classes.director}>Regie</h5>
                                        <div className={classes.directorContainer}>
                                            <div key={index}
                                                 className={classes.directorName}>{director.name}</div>
                                            <img src={director.profile_path ?
                                                imageUrlSmall + director.profile_path
                                                : director.gender === 2
                                                    ? imageActorMan
                                                    : imageActorWoman}
                                                 className={classes.directorImage}
                                                 alt={director.name}
                                                 title={director.name}/>
                                        </div>
                                    </>
                                )
                            }
                        )}

                        <div className={classes.voting}>{props.movie.vote_average}</div>

                    </div>

                </div>
            </div>

            <div className={classes.descriptionHappyEndContainer}>

                <div className={classes.actorContainer}>

                    {props.movie.cast ?
                        props.movie.cast.slice(0, showActors).map((actor, index) => {
                            return (
                                <div key={index} className={classes.actorProfile}>
                                    <img className={classes.actorImage}
                                         src={actor.profile_path
                                             ? imageUrlSmall + actor.profile_path
                                             : actor.gender === 2
                                                 ? imageActorMan
                                                 : imageActorWoman}
                                         alt={actor.name}
                                         title={actor.name}/>
                                    <h5 className={classes.actorName}>{actor.name}</h5>
                                    <p className={classes.character}>"{actor.character}"</p>
                                </div>
                            )
                        })
                        : ''}

                    <div className={classes.showMoreContainer}>
                        {showActors > 5 ?
                            <button onClick={() => setShowActors(5)}
                                    className={classes.zeigeMehrBtn}>reduziere Liste
                            </button>
                            : ''}
                        <button onClick={() => setShowActors(showActors + 3)}
                                className={classes.zeigeMehrBtn}>Zeige mehr...
                        </button>
                    </div>


                </div>

                <div>Beschreibung: {props.movie.overview}</div>

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
                        props.saveMovieToDb(movieForDb);
                        setHappyMovie('')
                        navigate('/showroom')
                    }}
                            className={classes.saveButton}>In Datenbank speichern und zum Showroom
                    </button>

                </div>

            </div>

        </section>
    )

}

export default DetailAnsicht;
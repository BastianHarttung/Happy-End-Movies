import classes from "./DetailAnsicht.module.css";

import emptyImage from "../assets/img/movie-poster.png"
import imageActorMan from '../assets/img/actor.png'
import imageActorWoman from '../assets/img/actor_girl.png'

import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

import {FaSmileBeam, FaSadTear, FaMeh, FaSearch} from "react-icons/all";
import {imageUrl, imageUrlSmall} from "../constants";


const DetailAnsicht = (props) => {

    const navigate = useNavigate();

    const genres = props.movie.genres ? props.movie.genres : ['a', 'b']

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState(props.movie.has_happy_end === true ? true
        : props.movie.has_happy_end === false ? false
            : 'neutral')

    const [showActors, setShowActors] = useState(5)
    const [searchActor, setSearchActor] = useState('')
    const [filteredActors, setFilteredActors] = useState(props.movie.cast)


    useEffect(() => {
        props.movie.has_happy_end === true ? setHappyMovie(true)
            : props.movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    }, [props.movie.has_happy_end, props.movie]);


    return (
        <section className={classes.detailsSection}>

            <div className={classes.movieHeadContainer}>
                <h2 className={classes.title}>{props.movie.title}</h2>
                <img src={props.movie.backdrop_path ?
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
                            {(props.movie.fsk >= 0 && props.movie.fsk <= 21) ?
                                <img src={`https://altersfreigaben.de/images/rating/de/${props.movie.fsk}_90.png`}
                                     className={classes.fsk}
                                     alt={props.movie.fsk}
                                     title={`FSK ${props.movie.fsk}`}/>
                                : ''}
                        </div>

                        <p className={classes.releaseYear}>{props.movie.release_date ?
                            props.movie.release_date.slice(0, 4)
                            : ''}
                        </p>

                        <div className={classes.genres}>
                            {genres.map((genre, index) => <span key={index}>{genre}/ </span>)}
                        </div>

                        <h5 className={classes.director}>Regie</h5>
                        <div className={classes.directorsContainer}>
                            {props.movie.directors.map((director, index) => {
                                    return (
                                        <div key={index}>
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
                                        </div>
                                    )
                                }
                            )}
                        </div>

                        <div className={classes.voting}>{props.movie.vote_average}</div>

                    </div>

                </div>
            </div>

            <div className={classes.descriptionHappyEndContainer}>

                <div className={classes.actorSearchContainer}>

                    <div className={classes.searchContainer}>
                        <FaSearch className={classes.searchBtn}
                                  onClick={() => searchForActor(searchActor)}/>
                        <input type="text"
                               placeholder='Suche Schauspieler oder Rolle'
                               className={classes.searchInput}
                               value={searchActor}
                               onChange={e => setSearchActor(e.target.value)}
                               onKeyPress={keyPressEvent}/>
                    </div>

                    <div className={classes.actorContainer}>
                        {props.movie.cast ?
                            filteredActors.slice(0, showActors).map((actor, index) => {
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
                            {showActors <= filteredActors.length ?
                                <button onClick={() => setShowActors(showActors + 3)}
                                        className={classes.zeigeMehrBtn}>Zeige mehr...
                                </button>
                                : ''}
                        </div>
                    </div>

                </div>

                <div className={classes.description}><b>Beschreibung:</b> {props.movie.overview}</div>

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

    /**
     * Searching and Filtering For Actor
     * @param {string} actorSearch
     */
    function searchForActor(actorSearch) {
        if (actorSearch === '') {
            console.log('alle actors anzeigen')
            setFilteredActors(props.movie.cast)
        } else {
            console.log('suche nach ' + actorSearch)
            setFilteredActors(props.movie.cast.filter(actor => {
                    return actor.name.toLowerCase().includes(actorSearch.toLowerCase()) ||
                        actor.character.toLowerCase().includes(actorSearch.toLowerCase())
                })
            )
        }
    }

    /**
     * Listen if the Enter-Button is pressed
     */
    function keyPressEvent(event) {
        if (event.key === 'Enter') {
            searchForActor(searchActor)
        }
    }


}

export default DetailAnsicht;
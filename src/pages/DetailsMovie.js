import classes from "./DetailsMovie.module.scss";

import emptyImage from "../assets/img/movie-poster.png"

import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import {
    FaSmileBeam,
    FaSadTear,
    FaMeh,
    FaSearch,
    FaChevronRight,
    FaChevronLeft,
    FaRegEyeSlash, FaRegEye
} from "react-icons/all";
import {imageUrl} from "../constants";
import PersonBox from "../components/PersonBox";
import {Button} from "../styleComponents/ButtonStyleComp";


const DetailsMovie = ({
                          movie,
                          user,
                          saveMovieToDb,
                          saveSelectedPerson,
                      }) => {

    const navigate = useNavigate();
    const urlParams = useParams()

    const genres = movie.genres ? movie.genres : [{name: 'a'}, {name: 'b'}]

    const [movieForDb, setMovieForDb] = useState(movie)
    const [happyMovie, setHappyMovie] = useState(movie.has_happy_end === true ? true
        : movie.has_happy_end === false ? false
            : 'neutral')

    const [scrollActors, setScrollActors] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(100)

    const [searchActor, setSearchActor] = useState('')
    const [filteredActors, setFilteredActors] = useState(movie.cast)

    const [userSelection, setUserSelection] = useState({[user]: {happyEnd_Voting: "neutral", haveSeen: false}})


    useEffect(() => {
        movie.has_happy_end === true ? setHappyMovie(true)
            : movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    }, [movie.has_happy_end, movie]);

    useEffect(() => {
        setScrollWidth(getScrollWidth())
    }, [])

    return (
        <section className={classes.detailsSection}>

            <div className={classes.movieHeadContainer}>
                <h2 className={classes.title}>{movie.title}</h2>

                <img src={movie.backdrop_path ?
                    imageUrl + movie.backdrop_path
                    : imageUrl + movie.poster_path}
                     className={classes.headImage}
                     alt="Backdrop"/>
            </div>

            <div className={classes.movieInfosContainer}>
                {(movie.fsk || movie.fsk === 0 && movie.fsk !== 400) &&
                <div className={classes.fskInfo}>
                    <img
                        src={`https://altersfreigaben.de/images/rating/de/${movie.fsk}_90.png`}
                        className={classes.fsk}
                        alt={movie.fsk}
                        title={`FSK ${movie.fsk}`}/>
                </div>}

                <p className={classes.releaseYear}>{movie.release_date.slice(0, 4)}
                </p>

                <p>{movie.runtime} min
                    ({laufzeitInStunden(movie.runtime).stunden} Std. {laufzeitInStunden(movie.runtime).minuten} min.)
                </p>
            </div>

            <div className={classes.movieBox}>

                <div className={classes.posterContainer}>
                    {happyMovie === true ?
                        <FaSmileBeam className={classes.happyEndSmileyOverall}
                                     style={{color: 'var(--green)'}}/>
                        : happyMovie === false ?
                            <FaSadTear className={classes.happyEndSmileyOverall}
                                       style={{color: 'var(--red)'}}/>
                            : happyMovie === 'neutral' ?
                                <FaMeh className={classes.happyEndSmileyOverall}
                                       style={{color: 'var(--orange)'}}/>
                                : ''}
                    <img className={classes.posterImage}
                         src={movie.poster_path ? imageUrl + movie.poster_path : emptyImage}
                         alt="Poster"/>
                </div>

                <div className={classes.detailsContainer}>
                    <div>

                        <div className={classes.genres}>
                            {genres.map((genre, index) => <div key={index}
                                                               className={classes.genre}>{genre.name} </div>)}
                        </div>


                        <h5 className={classes.director}>{movie.directors.length > 0 ? 'Regie' : ''}</h5>
                        <div className={classes.directorsContainer}>
                            {movie.directors.map((director, index) =>
                                <PersonBox
                                    saveSelectedPerson={(person) => saveSelectedPerson(person)}
                                    person={director}
                                    key={index}/>)}
                        </div>
                    </div>

                    <div className={classes.voting}>{movie.vote_average}</div>

                </div>
            </div>

            <section className={classes.actorSection}>

                <div className={classes.actorSearchContainer}>
                    {scrollActors > 0 ?
                        <FaChevronLeft onClick={() => scrollLeft()}
                                       className={classes.arrowBtnLeft}>
                        </FaChevronLeft> : ''}

                    {scrollActors < scrollWidth ?
                        <FaChevronRight onClick={() => scrollRight()}
                                        className={classes.arrowBtnRight}>
                        </FaChevronRight> : ''}

                    <div className={classes.searchContainer}>
                        <FaSearch className={classes.searchBtn}
                                  onClick={() => searchForActor(searchActor)}/>
                        <input type="text"
                               placeholder='Suche Schauspieler oder Rolle'
                               className={classes.searchInput}
                               value={searchActor}
                               onChange={e => setSearchActor(e.target.value)}
                               onKeyPress={keyPressEvent}/>
                        <div className={classes.lengthActors}>(Gesamt: {movie.cast.length} Schauspieler)</div>
                    </div>

                    <div id='actorContainer' className={classes.actorContainer}>
                        {movie.cast ?
                            filteredActors.map((actor, index) =>
                                <PersonBox
                                    saveSelectedPerson={(person) => saveSelectedPerson(person)}
                                    key={index}
                                    person={actor}/>
                            )
                            : ''}

                    </div>
                </div>

            </section>

            <section className={classes.extraInfosSection}>

                <div className={classes.videosImagesContainer}>
                    <div>
                        {!!movie.images.posters.length &&
                        <div>
                            <div>Poster</div>
                            <div className={classes.imageContainer}>
                                {movie.images.posters.map((poster, index) => {
                                    return (
                                        <a href={imageUrl + poster.file_path}
                                           target="_blank" rel="noreferrer"
                                           key={index}>
                                            <img src={imageUrl + poster.file_path}
                                                 alt="Poster"
                                                 className={classes.images}/>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        }

                        {!!movie.images.backdrops.length &&
                        <div>
                            <div>Backdrops</div>
                            <div className={classes.imageContainer}>
                                {movie.images.backdrops.map((backdrop, index) => {
                                    return (
                                        <a href={imageUrl + backdrop.file_path}
                                           target="_blank" rel="noreferrer"
                                           key={index}>
                                            <img src={imageUrl + backdrop.file_path}
                                                 alt="Backdrop"
                                                 className={classes.images}/>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        }

                        {!!movie.images.logos.length &&
                        <div>
                            <div>Logos</div>
                            <div className={classes.imageContainer}>
                                {movie.images.logos.map((logo, index) => {
                                    return (
                                        <a href={imageUrl + logo.file_path}
                                           target="_blank" rel="noreferrer"
                                           key={index}>
                                            <img src={imageUrl + logo.file_path}
                                                 alt="Logo"
                                                 className={classes.images}/>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        }

                    </div>
                    <div className={classes.videoContainer}>
                        {movie.videos.results.map((video, index) => {
                            return (
                                <div key={index}>
                                    <iframe width="260"
                                            title={video.name}
                                            src={'https://www.youtube.com/embed/' + video.key}>
                                    </iframe>
                                    <div className={classes.videoName}>{video.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {movie.tagline &&
                <h3 className={classes.subtitle}>{movie.tagline}</h3>}
                {movie.overview &&
                <div className={classes.description}><b>Beschreibung:</b> {movie.overview}</div>}

            </section>

            <section className={classes.userSelectionSection}>

                <div className={classes.userSelectionContainer}>

                    <div>
                        <div className={classes.gesehen}>Schon gesehen?</div>
                        <div className={classes.eyes}>
                            <FaRegEye onClick={() => setUserSelection({...userSelection, haveSeen: true})}
                                      className={(userSelection.haveSeen === true) ? classes.eyeGreen : classes.eye}/>
                            <FaRegEyeSlash onClick={() => setUserSelection({...userSelection, haveSeen: false})}
                                           className={(userSelection.haveSeen === false) ? classes.eyeRed : classes.eye}/>
                        </div>
                    </div>

                    {userSelection.haveSeen === true &&
                    <div>
                        <div className={classes.happyEnd}>Dein Happy End ?</div>

                        <div className={classes.smileys}>
                            <FaSmileBeam onClick={() => setUserSelection({...userSelection, happyEnd_Voting: true})}
                                         className={(userSelection.happyEnd_Voting && userSelection.happyEnd_Voting === true) ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                            <FaMeh onClick={() => setUserSelection({...userSelection, happyEnd_Voting: "neutral"})}
                                   className={(userSelection.happyEnd_Voting && userSelection.happyEnd_Voting === 'neutral') ? classes.smileyNeutral : classes.smiley}></FaMeh>
                            <FaSadTear onClick={() => setUserSelection({...userSelection, happyEnd_Voting: false})}
                                       className={userSelection.happyEnd_Voting === false ? classes.smileySad : classes.smiley}></FaSadTear>
                        </div>
                    </div>}

                    <Button name="In Datenbank speichern und zum Showroom"
                            fontSize={1}
                            onClick={() => {
                                setMovieForDb({...movie, userSelection});
                                saveMovieToDb(movieForDb);
                                setHappyMovie('');
                                navigate('/showroom');
                            }}/>
                </div>

            </section>

        </section>
    )

    /**
     * Searching and Filtering For Actor
     * @param {string} actorSearch
     */
    function searchForActor(actorSearch) {
        const actorSearchLow = actorSearch.toLowerCase();
        if (actorSearch === '') {
            console.log('alle actors anzeigen')
            setFilteredActors(movie.cast)
        } else {
            console.log('suche nach ' + actorSearch)
            setFilteredActors(movie.cast.filter(actor => {
                    if (actor.character) {
                        return actor.name.toLowerCase().includes(actorSearchLow) ||
                            actor.character.toLowerCase().includes(actorSearchLow)
                    } else {
                        let actorCharacter = false;
                        for (let role of actor.roles) {
                            if (role.character.toLowerCase().includes(actorSearchLow)) {
                                actorCharacter = true;
                            }
                        }
                        return actor.name.toLowerCase().includes(actorSearchLow) ||
                            actorCharacter
                    }
                })
            )
        }
    }

    /**
     * Set Scroll Width
     */
    function getScrollWidth() {
        const actorContainer = document.getElementById('actorContainer');
        return actorContainer.scrollWidth - actorContainer.offsetWidth
    }

    /**
     * Scroll Actors Right
     */
    function scrollRight() {
        const actorContainer = document.getElementById('actorContainer');
        const scrollWidth = scrollActors + actorContainer.offsetWidth - 100
        if (scrollActors < actorContainer.scrollWidth) {
            actorContainer.scroll(scrollWidth, 0)
            setScrollActors(scrollWidth)
        }
    }

    /**
     * Scroll Actors Left
     */
    function scrollLeft() {
        const actorContainer = document.getElementById('actorContainer');
        const scrollWidth = scrollActors - actorContainer.offsetWidth + 100
        if (scrollActors > 0) {
            actorContainer.scroll(scrollWidth, 0)
            setScrollActors(scrollWidth)
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

    /**
     * Berechnet die Laufzeit in Stunden und Minuten
     * @param {number} laufzeit
     * @return {{stunden: number, minuten: number}} Objekt mit den Stunden und Minuten
     */
    function laufzeitInStunden(laufzeit) {
        const laufzeitStunden = Math.floor(laufzeit / 60);
        const restminuten = laufzeit - (laufzeitStunden * 60);
        return {stunden: laufzeitStunden, minuten: restminuten}
    }

}

export default DetailsMovie;



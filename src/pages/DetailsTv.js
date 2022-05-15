import classes from "./DetailsMovie.module.scss";

import emptyImage from "../assets/img/movie-poster.png"

import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import {FaSmileBeam, FaSadTear, FaMeh, FaSearch, FaChevronRight, FaChevronLeft} from "react-icons/all";
import {imageUrlBig} from "../constants";
import PersonBox from "../components/PersonBox";
import {Button} from "../styleComponents/ButtonStyleComp";
import globalStore from "../stores/global-store";


const DetailsTv = (props) => {

    const {user} = globalStore;

    const navigate = useNavigate();
    const urlParams = useParams()

    const genres = props.movie.genres ? props.movie.genres : [{name: 'a'}, {name: 'b'}]

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState(props.movie.has_happy_end === true ? true
        : props.movie.has_happy_end === false ? false
            : 'neutral')

    const [scrollActors, setScrollActors] = useState(0)
    const [scrollWidth, setScrollWidth] = useState(100)

    const [searchActor, setSearchActor] = useState('')
    const [filteredActors, setFilteredActors] = useState(props.movie.cast)

    //console.log('details movie', props.movie)
    //console.log('details happy end', props.movie.has_happy_end)

    useEffect(() => {
        props.movie.has_happy_end === true ? setHappyMovie(true)
            : props.movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    }, [props.movie.has_happy_end, props.movie]);

    useEffect(() => {
        setScrollWidth(getScrollWidth())
    }, [])

    return (
        <section className={classes.detailsMovieSection}>

            <div className={classes.movieHeadContainer}>
                <h2 className={classes.title}>{props.movie.title ? props.movie.title : props.movie.original_name}</h2>
                {props.movie.tagline ? <h4 className={classes.subtitle}>{props.movie.tagline}</h4> : ''}
                <img src={props.movie.backdrop_path ?
                    imageUrlBig + props.movie.backdrop_path
                    : imageUrlBig + props.movie.poster_path}
                     className={classes.backdropImage}
                     alt=""/>
            </div>

            <div className={classes.movieInfosContainer}>
                <div className={classes.fskInfo}>
                    {props.movie.fsk ?
                        <img src={`https://altersfreigaben.de/images/rating/de/${props.movie.fsk}_90.png`}
                             className={classes.fsk}
                             alt={props.movie.fsk}
                             title={`FSK ${props.movie.fsk}`}/>
                        : ''}
                </div>

                <p className={classes.releaseYear}>
                    {props.movie.first_air_date?.slice(0, 4)} - {props.movie.last_air_date?.slice(0, 4)}
                </p>

                <p>Folge: ca. {props.movie.episode_run_time[0]} min
                    {/*({laufzeitInStunden(props.movie.episode_run_time[0]).stunden} Std. {laufzeitInStunden(props.movie.episode_run_time[0]).minuten} min.)*/}
                </p>
            </div>

            <div className={classes.movieSection}>

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
                         src={props.movie.poster_path ? imageUrlBig + props.movie.poster_path : emptyImage}
                         alt="Poster"/>
                </div>

                <div className={classes.detailsContainer}>
                    <div>

                        <div className={classes.genres}>
                            {genres.map((genre, index) => <div key={index}
                                                               className={classes.genre}>{genre.name} </div>)}
                        </div>

                        <div>
                            Staffeln: {props.movie.number_of_seasons}
                        </div>

                        <div>
                            Folgen: {props.movie.number_of_episodes}
                        </div>

                        <h5 className={classes.director}>{props.movie.directors.length > 0 ? 'Regie' : ''}</h5>
                        <div className={classes.directorsContainer}>
                            {props.movie.directors.map((director, index) =>
                                <PersonBox
                                    saveSelectedPerson={(person) => props.saveSelectedPerson(person)}
                                    person={director}
                                    key={index}/>)}
                        </div>

                        <div className={classes.voting}>{props.movie.vote_average}</div>

                    </div>
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
                        <div className={classes.lengthActors}>(Gesamt: {props.movie.cast.length} Schauspieler)</div>
                    </div>

                    <div id='actorContainer' className={classes.actorContainer}>
                        {props.movie.cast ?
                            filteredActors.map((actor, index) =>
                                <PersonBox
                                    saveSelectedPerson={(person) => props.saveSelectedPerson(person)}
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
                        {props.movie.images.posters.map((poster, index) => {
                            return (
                                <a href={imageUrlBig + poster.file_path}
                                   key={index}
                                   target="_blank"
                                   rel="noreferrer">
                                    <img
                                        src={imageUrlBig + poster.file_path}
                                        alt="Poster"
                                        className={classes.images}/>
                                </a>
                            )
                        })}
                        {props.movie.images.backdrops.map((backdrop, index) => {
                            return (
                                <a href={imageUrlBig + backdrop.file_path} target="_blank" rel="noreferrer">
                                    <img key={index}
                                         src={imageUrlBig + backdrop.file_path}
                                         alt="Backdrop"
                                         className={classes.images}/>
                                </a>
                            )
                        })}
                        {props.movie.images.logos.map((logo, index) => {
                            return (
                                <a href={imageUrlBig + logo.file_path} target="_blank" rel="noreferrer">
                                    <img key={index}
                                         src={imageUrlBig + logo.file_path}
                                         alt="Logo"
                                         className={classes.images}/>
                                </a>
                            )
                        })}
                    </div>
                    <div>
                        {props.movie.videos.results.map((video, index) => {
                            return (
                                <iframe key={index}
                                        height="200"
                                        title={video.name}
                                        src={'https://www.youtube.com/embed/' + video.key}>
                                </iframe>
                            )
                        })}
                    </div>
                </div>

                <div className={classes.description}><b>Beschreibung:</b> {props.movie.overview}</div>

            </section>

            <section className={classes.userSelectionContainer}>

                <div>
                    <div className={classes.happyEnd}>Dein Happy End ?</div>

                    <div className={classes.smileys}>
                        <div>
                            <FaSmileBeam onClick={() => {
                                props.movie.happyEnd_Voting[user.userId] = true;
                                setMovieForDb({...props.movie})
                            }}
                                         className={(props.movie.happyEnd_Voting && props.movie.happyEnd_Voting[user.userId] === true) ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                            <FaMeh onClick={() => {
                                props.movie.happyEnd_Voting[user.userId] = 'neutral';
                                setMovieForDb({...props.movie})
                            }}
                                   className={(props.movie.happyEnd_Voting && props.movie.happyEnd_Voting[user.userId] === 'neutral') ? classes.smileyNeutral : classes.smiley}></FaMeh>

                            <FaSadTear onClick={() => {
                                props.movie.happyEnd_Voting[user.userId] = false;
                                setMovieForDb({...props.movie})
                            }}
                                       className={props.movie.happyEnd_Voting && props.movie.happyEnd_Voting[user.userId] === false ? classes.smileySad : classes.smiley}></FaSadTear>
                        </div>
                    </div>
                </div>

                <Button name="In Datenbank speichern und zum Showroom"
                        onClick={() => {
                            props.saveMovieToDb(movieForDb);
                            setHappyMovie('')
                            navigate('/showroom')
                        }}/>

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
            setFilteredActors(props.movie.cast)
        } else {
            console.log('suche nach ' + actorSearch)
            setFilteredActors(props.movie.cast.filter(actor => {
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

export default DetailsTv;
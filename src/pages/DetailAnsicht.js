import classes from "./DetailAnsicht.module.css";
import emptyImage from "../assets/img/movie-poster.png"
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import {FaSmileBeam, FaSadTear,FaMeh} from "react-icons/all";

const DetailAnsicht = (props) => {
    const navigate = useNavigate();
    const imageUrl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

    const genres = props.movie.genres ? props.movie.genres : []

    const [movieForDb, setMovieForDb] = useState(props.movie)
    const [happyMovie, setHappyMovie] = useState(props.movie.has_happy_end === true ? true
                                                    : props.movie.has_happy_end === false ? false
                                                    : 'neutral')



    useEffect(() => {
        props.movie.has_happy_end === true ? setHappyMovie(true)
            : props.movie.has_happy_end === false ? setHappyMovie(false)
                : setHappyMovie('neutral')
    });

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
                                    props.movie.has_happy_end = true;
                                    setHappyMovie(true)
                                    setMovieForDb({...props.movie, has_happy_end: true})
                                }}
                                             className={ (happyMovie===true) ? classes.smileyLaugh : classes.smiley}></FaSmileBeam>
                                <FaMeh onClick={() => {
                                    props.movie.has_happy_end = 'neutral';
                                    setHappyMovie('neutral');
                                    setMovieForDb({...props.movie, has_happy_end: 'neutral'})
                                }}
                                           className={ (happyMovie ==='neutral') ? classes.smileyNeutral : classes.smiley}></FaMeh>

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
                                navigate('/showroom') }} className={classes.saveButton}>Speichern und zum Showroom</button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )

}

export default DetailAnsicht;
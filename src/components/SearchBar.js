import classes from "./SearchBar.module.css";
import {FaSearch} from "react-icons/all";
import {useState, useEffect} from "react";

const SearchBar = (props) => {

    const locationHashString = window.location.hash.substring(1).split('%20').join(' ')
    const [movieName, setMovieName] = useState(locationHashString)

    /**
     * After hit 3 chars on input search start searching movie
     */
    useEffect(() => {
        if (movieName.length >= 4) {
            props.searchMovie(movieName)
        }
    }, [movieName])

    return (
        <div className={classes.searchBarContainer}>

            <div className={classes.choiceContainer}>
                <div>
                    <input type="radio"
                           id="choiceMovie"
                           name="choice"
                           value="movie"/>
                    <label htmlFor="choiceMovie">Filme</label>
                </div>

                <div>
                    <input type="radio"
                           id="choiceTv"
                           name="choice"
                           value="tv"/>
                    <label htmlFor="choiceTv">Serien</label>
                </div>
            </div>

            <input className={classes.searchInput}
                   type="search"
                   placeholder="Suche"
                   autoFocus
                   value={movieName}
                   onKeyPress={keyPressEvent}
                   onChange={e => setMovieName(e.target.value)}/>

            <FaSearch onClick={() => {
                props.searchMovie(movieName)
                setMovieName('')
                window.location.hash = '';
            }} className={classes.searchButton}/>

        </div>
    )

    /**
     * Listen if the Enter-Button is pressed
     */
    function keyPressEvent(event) {
        if (event.key === 'Enter') {
            props.searchMovie(movieName)
        }
    }

}

export default SearchBar
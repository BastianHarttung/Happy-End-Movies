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
            <div className={classes.searchContainer}>
                <input className={classes.searchInput}
                       style={{fontSize: props.fontPx +'px'}}
                       type="search"
                       size={props.size}
                       placeholder="Suche"
                       autoFocus
                       value={movieName}
                       onKeyPress={keyPressEvent}
                       onChange={e => {
                           props.saveSearchFor(e.target.value)
                           setMovieName(e.target.value)
                       }}/>

                <FaSearch onClick={() => {
                    props.searchMovie(movieName);
                    setMovieName('')
                    window.location.hash = ''
                }}
                          style={{width: props.buttonSize, height: props.buttonSize}}
                          className={classes.searchButton}/>
            </div>

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
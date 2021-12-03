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
        if (movieName.length >= 3) {
            props.searchMovie(movieName)
        }
    }, [movieName])

    return (
        <div className={classes.searchBarContainer}>
            <input className={classes.searchInput} type="text" value={movieName}
                   onChange={e => setMovieName(e.target.value)}/>
            <FaSearch onClick={() => {
                props.searchMovie(movieName)
                setMovieName('')
                window.location.hash = '';
            }} className={classes.searchButton}/>
        </div>
    )

}

export default SearchBar
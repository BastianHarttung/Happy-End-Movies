import classes from "./Bewertung.module.css";
import {FaSearch} from "react-icons/all";
import {useState} from "react";
import SearchResultBox from "../components/SearchResultBox";
import emptyMovieArray from "../constants";

const Bewertung = (props) => {

    const url = 'https://api.themoviedb.org/3/search/movie?api_key=d2aa68fbfa10f4f356fe29718bfa3508&language=de&query='

    const [movieName, setMovieName] = useState('')
    const [searchedMovies, setSearchedMovies] = useState(emptyMovieArray)

    return (
        <div className={classes.bewertungSection}>
            <div className={classes.searchBarContainer}>
                <input className={classes.searchInput} type="text" value={movieName}
                       onChange={e => setMovieName(e.target.value)}/>
                <FaSearch onClick={searchMovie} className={classes.searchButton}/>
            </div>

            <div className={classes.resultSection}>
                {searchedMovies.map(movie => <SearchResultBox key={movie.id}
                                                              to='/detailansicht'
                                                              imageUrl={props.imageUrl}
                                                              parentCallback={(currentMovie)=>props.callback(currentMovie)}
                                                              movie={movie}/> )}
            </div>

        </div>
    )

    async function searchMovie() {
        const movieTitle = movieName;
        if(movieTitle !== ''){
            setSearchedMovies(await getJsonFromMovieDB(movieTitle));
            setMovieName('')
        }
    }

    async function getJsonFromMovieDB(movieName) {
        const response = await fetch(url + movieName);
        let data = await response.json();
        console.log(data.results)
        return data.results
    }
}

export default Bewertung
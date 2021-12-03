import classes from "./Bewertung.module.css";
import {FaSearch} from "react-icons/all";
import {useEffect, useState} from "react";
import SearchResultBox from "../components/SearchResultBox";
import {searchMovieUrl} from "../constants";
import SearchBar from "../components/SearchBar";

const Bewertung = (props) => {

    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchFor, setSearchFor] = useState('')
    const [totalResults, setTotalResults] = useState(0)
    const [totalPages, setTotalPages] = useState()
    const [activePage, setActivePage] = useState(0)


    return (
        <div className={classes.bewertungSection}>

            <SearchBar
                searchMovie={(movieName => searchMovie(movieName))}/>

            {searchFor ? <div>Suchergebnisse für: {searchFor}</div>
                : ''}

            <div className={classes.resultSection}>
                {searchedMovies.map(movie => <SearchResultBox key={movie.id}
                                                              to='/detailansicht'
                                                              parentCallback={(currentMovie) => props.callback(currentMovie)}
                                                              movie={movie}/>)}
            </div>

            {totalPages ?
                <div className={classes.pageContainer}>Seite: {totalPages.map(page =>
                    <span key={page}
                          onClick={() => changePage(page)}
                          className={activePage === page ? classes.activePageBtn : classes.pageBtn}>
                          {page}</span>)}
                </div>
                : ''}

            {totalResults ? <div className={classes.totalResults}>Anzahl Ergebnisse: {totalResults}</div>
                : ''}

        </div>
    )


    /**
     * Search Movie by clicking the Search Button
     * -set page to number 1
     * -delete die input field
     * @return {Promise<void>}
     */
    async function searchMovie(movieName) {
        if (movieName.length > 0) {
            setSearchedMovies(await getJsonFromMovieDB(movieName, 1));
            setActivePage(1);
            setSearchFor(movieName);
            window.location.hash = movieName;
        }
    }

    /**
     * Change Page and load from API by clicking Page Number
     * And set Active Page Number for colored view
     * @param {number} page
     * @return {Promise<void>}
     */
    async function changePage(page) {
        setSearchedMovies(await getJsonFromMovieDB(searchFor, page))
        setActivePage(page)
    }

    /**
     * Get Data from Movie DB
     * - set total results
     * - make array with pages and set to total pages
     * @param {string} movieName
     * @param {number} pageNumber
     * @return {Promise<*>}
     */
    async function getJsonFromMovieDB(movieName, pageNumber) {
        const response = await fetch(searchMovieUrl + movieName + '&page=' + pageNumber);
        let data = await response.json();
        setTotalResults(await data.total_results)
        setTotalPages(makePageArray(await data.total_pages))
        //console.log('data', data)
        return data.results
    }

    /**
     * Make an Array with Pages
     * @param numberPages
     * @return {*[]} Array with Numbers from 1 to numberPages
     */
    function makePageArray(numberPages) {
        let pageArray = []
        for (let i = 1; i <= numberPages; i++) {
            pageArray.push(i)
        }
        return pageArray
    }

}

export default Bewertung
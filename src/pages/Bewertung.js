import classes from "./Bewertung.module.css";
import {useEffect, useState} from "react";
import SearchResultBox from "../components/SearchResultBox";
import {popularMoviesUrl, searchUrl} from "../constants";
import SearchBar from "../components/SearchBar";

const Bewertung = (props) => {

    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchFor, setSearchFor] = useState('')
    const [totalResults, setTotalResults] = useState(0)
    const [totalPages, setTotalPages] = useState()
    const [activePage, setActivePage] = useState(0)

    const [popularMovies, setPopularMovies] = useState([])

    const [searchingCategory, setSearchingCategory] = useState('movie')

    useEffect(() => {
        getPopularMoviesFromTmdb().then((response) => {
            setPopularMovies(response)
        })
    }, [popularMovies])

    return (
        <div className={classes.bewertungSection}>

            <div className={classes.bewertungContainer}>
                <SearchBar
                    searchMovie={ (movieName) => searchMovie(movieName)}
                    saveSearchFor ={(movieName) => saveSearchFor(movieName)}
                    />

                <div className={classes.categoryBtnContainer}>
                    <button id='multi' onClick={()=>searchMovie(searchFor, 'multi')}>Alles</button>
                    <button id='movie' onClick={()=>searchMovie(searchFor, 'movie')}>Filme</button>
                    <button id='tv' onClick={()=>searchMovie(searchFor, 'tv')}>Serien</button>
                    <button id='person' onClick={()=>searchMovie(searchFor, 'person')}>Schauspieler</button>
                </div>

                {searchFor ?
                    <div className={classes.headOverResults}>Suchergebnisse für: {searchFor}</div>
                    : <div className={classes.headOverResults}>Beliebte Filme</div>}

                {searchFor ?
                    <div className={classes.resultSection}>
                        {searchedMovies.map(movie =>
                            <SearchResultBox key={movie.id}
                                             to='/detailansicht'
                                             parentCallback={(currentMovie,category) => props.callback(currentMovie,category)}
                                             category = {searchingCategory}
                                             movie={movie}/>)}</div>
                    :
                    <div className={classes.resultSection}>

                        {popularMovies.slice(0, 5).map(movie =>
                            <SearchResultBox key={movie.id}
                                             to='/detailansicht'
                                             parentCallback={(currentMovie,category) => props.callback(currentMovie,category)}
                                             category = {searchingCategory}
                                             movie={movie}/>)}</div>}

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


        </div>
    )

    /**
     * Get Popular Movies from TMDB API
     * @return {Promise<*>}
     */
    async function getPopularMoviesFromTmdb() {
        const response = await fetch(popularMoviesUrl);
        let data = await response.json();
        return data.results
    }

    /**
     * Search Movie by clicking the Search Button
     * -set page to number 1
     * -delete die input field
     * @param {string} movieName
     * @param {string} searchCategory 'movie' || 'tv'
     * @return {Promise<void>}
     */
    async function searchMovie(movieName,searchCategory = 'multi') {
        if (movieName.length > 0) {
            setSearchingCategory(searchCategory)
            const tmdbMovie = await getJsonFromTmdb(movieName, 1,searchCategory)
            setSearchedMovies(tmdbMovie);
            setActivePage(1);
            setSearchFor(movieName);
            window.location.hash = movieName;
        }
    }

    /**
     * Is Executed by typing letters in search input field and save searchFor
     * @param movieName
     */
    function saveSearchFor(movieName) {
        setSearchFor(movieName)
    }

    /**
     * Change Page and load from API by clicking Page Number
     * And set Active Page Number for colored view
     * @param {number} page
     * @return {Promise<void>}
     */
    async function changePage(page) {
        setSearchedMovies(await getJsonFromTmdb(searchFor, page, searchingCategory))
        setActivePage(page)
    }

    /**
     * Get Data from Movie DB
     * - set total results
     * - make array with pages and set to total pages
     * @param {string} movieName
     * @param {number} pageNumber
     * @param {string} searchCategory Category you are searching for eg 'multi' || 'movie' || 'tv'
     * @return {Promise<*>}
     */
    async function getJsonFromTmdb(movieName, pageNumber,searchCategory) {
        const response = await fetch(searchUrl(searchCategory) + movieName + '&page=' + pageNumber);
        let data = await response.json();
        setTotalResults(await data.total_results)
        setTotalPages(makePageArray(await data.total_pages))
        console.log('data.results',data.results)
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
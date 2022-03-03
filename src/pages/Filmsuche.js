import classes from "./Filmsuche.module.scss";
import {useEffect, useState} from "react";
import SearchResultBox from "../components/SearchResultBox";
import {searchUrl, trendingMoviesUrl} from "../constants";
import SearchBar from "../components/SearchBar";
import {Button} from "../styleComponents/ButtonStyleComp";
import {ReactComponent as ArrowLeftIcon} from "../assets/icons/chevron-left.svg";
import {ReactComponent as ArrowRightIcon} from "../assets/icons/chevron-right.svg";

const Filmsuche = (props) => {

    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchFor, setSearchFor] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [searchStarted, setSearchStarted] = useState(false)
    const [searchingCategory, setSearchingCategory] = useState('multi')

    const [totalResults, setTotalResults] = useState(0)
    const [totalPages, setTotalPages] = useState([])
    const [activePage, setActivePage] = useState(0)

    const [popularMovies, setPopularMovies] = useState([])


    useEffect(() => {
        getPopularMoviesFromTmdb().then((response) => {
            setPopularMovies(response)
        })
    }, [])

    return (
        <div className={classes.filmsucheSection}>

            <div className={classes.filmsucheContainer}>
                <SearchBar
                    length='22'
                    size={19}
                    searchMovie={(movieName) => searchMovie(movieName)}
                    saveSearchFor={(movieName) => setSearchFor(movieName)}
                />

                <div className={classes.categoryBtnContainer}>
                    <Button name="Alles"
                            fontSize={1.2}
                            activated={searchingCategory === 'multi'}
                            onClick={() => searchMovie(searchFor, 'multi')}/>
                    <Button name="Filme"
                            fontSize={1.2}
                            activated={searchingCategory === 'movie'}
                            onClick={() => searchMovie(searchFor, 'movie')}/>
                    <Button name="Serien"
                            fontSize={1.2}
                            activated={searchingCategory === 'tv'}
                            onClick={() => searchMovie(searchFor, 'tv')}/>
                    <Button name="Schauspieler"
                            fontSize={1.2}
                            activated={searchingCategory === 'person'}
                            onClick={() => searchMovie(searchFor, 'person')}/>
                </div>

                {searchStarted ?
                    <div className={classes.headOverResults}>Suchergebnisse für: {searchResult}</div>
                    : <div className={classes.headOverResults}>Täglicher Trend</div>}

                {searchStarted ?
                    <div className={classes.resultSection}>
                        {searchedMovies.map(movie =>
                            <SearchResultBox key={movie.id}
                                             saveSelectedMovie={(currentMovie, category) => props.saveSelectedMovie(currentMovie, category)}
                                             category={searchingCategory}
                                             movie={movie}/>)}</div>
                    :
                    <div className={classes.resultSection}>

                        {popularMovies.slice(0, 5).map(movie =>
                            <SearchResultBox key={movie.id}
                                             saveSelectedMovie={(currentMovie, category) => props.saveSelectedMovie(currentMovie, category)}
                                             category={searchingCategory}
                                             movie={movie}/>)}</div>}

                {searchStarted ?
                    <div className={classes.pageContainer}>
                        <ArrowLeftIcon className={classes.pageArrow}
                                       onClick={() => changePage(Math.max(1, activePage - 1))}/>
                        Seite: {totalPages.slice(Math.max(0, activePage - 4), Math.min(activePage + 3, totalPages.length))
                        .map(page => <span key={page}
                                           onClick={() => changePage(page)}
                                           className={activePage === page ? classes.activePageBtn : classes.pageBtn}>
                          {page}
                        </span>
                        )}
                        <ArrowRightIcon className={classes.pageArrow}
                                        onClick={() => changePage(Math.min(activePage + 1, totalPages.length))}/>
                    </div>
                    : ''}

                {searchStarted ? <div className={classes.totalResults}>Anzahl Ergebnisse: {totalResults}</div>
                    : ''}

            </div>

        </div>
    )

    /**
     * Get Popular Movies from TMDB API
     * @return {Promise<*>}
     */
    async function getPopularMoviesFromTmdb() {
        const response = await fetch(trendingMoviesUrl);
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
    async function searchMovie(movieName, searchCategory = 'multi') {
        if (movieName.length > 0) {
            setSearchResult(movieName);
            setSearchingCategory(searchCategory);
            const tmdbMovie = await getJsonFromTmdb(movieName, 1, searchCategory);
            setSearchedMovies(tmdbMovie);
            setActivePage(1);
            setSearchFor(movieName);
            setSearchStarted(true);
            window.location.hash = movieName;
        } else {
            setSearchingCategory('multi')
            setSearchStarted(false)
        }
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
    async function getJsonFromTmdb(movieName, pageNumber, searchCategory) {
        const response = await fetch(searchUrl(searchCategory) + movieName + '&page=' + pageNumber);
        let data = await response.json();
        setTotalResults(await data.total_results)
        setTotalPages(makePageArray(await data.total_pages))
        console.log('data.results', data.results)
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

export default Filmsuche
import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import {collection, getDocs} from "firebase/firestore";
import firestoreDb from "../firebase-config";


const Showroom = ({saveSelectedMovie}) => {

    const [moviesDb, setMoviesDb] = useState([])
    const [dbLength, setDbLength] = useState(0)

    const [filteredMovies, setFilteredMovies] = useState([])
    const [searchFilteredMovies, setSearchFilteredMovies] = useState([]) //TODO
    const [filterActive, setFilterActive] = useState(false)
    const [filterLength, setFilterLength] = useState(dbLength)

    const [activePage, setActivePage] = useState(0)
    const pageLength = 24;
    const index = activePage * pageLength;

    const pages = Math.ceil(filterLength / pageLength)

    const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength, pageLength * (activePage + 1)))

    const widthShowroom = window.innerWidth - 260

    const [searchFor, setSearchFor] = useState()


    useEffect(() => {
        loadMoviesFromDbAndSetStates()
    }, [])

    /**
     *
     */
    useEffect(() => {
        filteredMovies.sort((a, b) => (a.title < b.title) ? -1
            : (a.title > b.title) ? 1
                : 0)
    }, [filteredMovies])

    /**
     * Scrolling Sidebar
     */
    const [scrollPosition, setScrollPosition] = useState(80);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(Math.max(0, 80 - position))
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <section className={classes.showroomSection}>
            <div className={classes.sidebar} style={{top: scrollPosition + 'px'}}>
                <div className={classes.searchContainer}>
                    <SearchBar
                        length='13'
                        size={15}
                        searchMovie={(movieName, searchCategory) => searchMovieDb(movieName, searchCategory)}
                        saveSearchFor={(movieName) => setSearchFor(movieName)}/>
                </div>

                <div className={classes.filterContainer}>

                    <button onClick={() => {
                        loadMoviesFromDbAndSetStates();
                        setFilterActive(false)
                    }}
                            className={!filterActive ? classes.btnActive : ''}>{filterActive ? 'Filter deaktivieren' : 'Filter sind deaktiviert'}
                    </button>

                    <div className={classes.filterSegmentContainer}>

                        <div className={classes.filterSegment}>
                            {/*<label htmlFor="category">Kategorie:</label>*/}
                            <select name="category" id="category">
                                <option value="allCategories">Filme + Serien</option>
                                <option value="movie">Filme</option>
                                <option value="tv">Serien</option>
                            </select>
                        </div>

                        <div className={classes.filterSegment}>
                            {/*<label htmlFor="happyEnd">Happy End?</label>*/}
                            <select name="happyEnd" id="happyEnd">
                                <option value="allEnds">Alle Enden</option>
                                <option value={true}>Happy End</option>
                                <option value={false}>kein Happy End</option>
                            </select>
                        </div>

                        {/*<div className={classes.filter}>
                            <label htmlFor="movies">Filme</label>
                            <input type="radio" id="movies" name="category" value='movies'/>
                        </div>
                        <div className={classes.filter}>
                            <label htmlFor="tv">Serien</label>
                            <input type="radio" id="tv" name="category" value='tv'/>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <div className={classes.filter}>
                            <label htmlFor="happyEndTrue">mit Happy End</label>
                            <input type="radio" id="happyEndTrue" name="happyEnd" value={true}/>
                        </div>
                        <div className={classes.filter}>
                            <label htmlFor="happyEndFalse">ohne Happy End</label>
                            <input type="radio" id="happyEndFalse" name="happyEnd" value={false}/>
                        </div>*/}
                    </div>

                    <button onClick={() => setFilterActive(true)}
                            className={filterActive ? classes.btnActive : ''}>{filterActive ? 'Gefiltert' : 'Filtern'}
                    </button>

                    <div className={classes.sidebarInfos}>
                        <div><b>{filterLength}</b> Filme</div>
                    </div>

                </div>
            </div>

            <div className={classes.showroomContainer} style={{width: widthShowroom + 'px'}}>

                {filteredMovies.length > 0 ?
                    <div className={classes.filteredMoviesContainer}>

                        <div className={classes.filteredMoviesResult}>
                            {filteredMoviesPart.map((movie) =>
                                <SearchResultBox
                                    key={movie.id}
                                    movie={movie}
                                    to='/detailansicht'
                                    saveSelectedMovie={(currentMovie, category) => saveSelectedMovie(currentMovie, category)}
                                    category={undefined} //TODO
                                />)}
                        </div>

                        <div className={classes.infosContainer}>
                            {Array.from(Array(pages).keys()).map((page) =>
                                    <span key={page + 1}
                                          onClick={() => setActivePage(page)}
                                          className={activePage === page ? classes.activePageBtn : classes.pageBtn}>
                        {page + 1}</span>
                            )}
                        </div>

                    </div>
                    : filteredMovies.length === 0 ?
                        <div className={classes.filteredMoviesContainer}>
                            <div className={classes.loader}>Loading...</div>
                        </div>
                        : 'Load'}
            </div>

        </section>
    )

    /**
     * Load Movies from Database sort and set all States to this
     * @return {Promise<void>}
     */
    async function loadMoviesFromDbAndSetStates() {
        const moviesCollectionRef = collection(firestoreDb, 'movies');
        const data = await getDocs(moviesCollectionRef);
        const movieDataArray = data.docs.map((doc) => ({...doc.data()}))
        const movieArraySort = sortMovies(movieDataArray);
        setDbLength(movieDataArray.length);
        setFilterLength(movieDataArray.length)
        setMoviesDb(movieArraySort)
        setFilteredMovies(movieArraySort)
    }

    /**
     * Sort Movies from Database by Title
     */
    function sortMovies(moviesArray) {
        moviesArray.sort((a, b) => (a.title < b.title || a.name < b.name || a.title < b.name || a.name < b.title) ? -1
            : (a.title > b.title || a.name > b.name || a.title > b.name || a.name > b.title) ? 1
                : 0)
        return moviesArray
    }

    /**
     * Filter Movies with search
     * @param {string} movieName
     * @param {string} searchCategory eg 'movie' || 'tv'
     */
    function filterMoviesByName(movieName, searchCategory) {
        const movieFilter = moviesDb.filter(movie => {
                if (movie.title) {
                    return movie.title.toLowerCase().includes(movieName.toLowerCase()) ||
                        movie.original_title.toLowerCase().includes(movieName.toLowerCase())
                } else return movie.original_name.toLowerCase().includes(movieName.toLowerCase())
            }
        )
        setFilteredMovies(movieFilter)
        //setSearchFilteredMovies(movieFilter)
        setFilterLength(movieFilter.length)
    }

    /**
     * Filter Database by Arguments
     * @param {    } movies
     * @param {string} category
     * @param {boolean} happyEnd
     * @param { boolean }watched
     */
    function filterDatabase(movies, category, happyEnd, watched) {
        const movieFilter = moviesDb.filter(movie => movie.category === category)
        setFilteredMovies(movieFilter);
        setFilterLength(movieFilter.length);
        setActivePage(0)
    }

    /**
     * Filter Movies with or without HappyEnd
     * @param        {        array    }        movies movies Array
     * @param        {        boolean    }        hasHappyEnd true or false
     * @return        {        array        with objects}
     */
    function filterMoviesByHappyEnd(movies, hasHappyEnd) {
        if (hasHappyEnd === 'all') {
            setFilterLength(moviesDb.length)
            setFilteredMovies(moviesDb)
            //setSearchFilteredMovies(moviesDb)
        } else {
            const movieFilter = movies.filter(movie => movie.has_happy_end === hasHappyEnd)
            setFilteredMovies(movieFilter)
            setFilterLength(movieFilter.length)
        }
    }


    /**
     * Filter Movies by Category
     * @param        {        string    }        category 'movie' || 'tv'
     */

    /*function filterMoviesByCategory(category)
        {
            const movieFilter = moviesDb.filter(movie => movie.category === category)
            setFilteredMovies(movieFilter);
            setFilterLength(movieFilter.length);
            setActivePage(0)
        }
    */

    /**
     * Search Movie
     * @return        {        Promise < void >    }
     */
    function searchMovieDb(movieName, searchCategory) {
        if (movieName.length === 0) {
            setFilteredMovies(moviesDb);
            //setSearchFilteredMovies(moviesDb);
            setFilterLength(moviesDb.length);
            window.location.hash = '';
        } else {
            window.location.hash = movieName;
            setSearchFor(movieName);
            filterMoviesByName(movieName, searchCategory)
        }
    }

}

export default Showroom
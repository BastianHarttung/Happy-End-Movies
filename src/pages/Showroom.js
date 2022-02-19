import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import {collection, getDocs} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import FskIndicator from "../components/FskIndicator";


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

    const [fskPosAge, setFskPosAge] = useState(18)


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
        setScrollPosition(Math.max(0, 60 - position))
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
                            <select name="category"
                                    id="category"
                                    onChange={() => setFilterActive(false)}>
                                <option value="allCategories">Filme + Serien</option>
                                <option value="movie">Filme</option>
                                <option value="tv">Serien</option>
                            </select>
                        </div>

                        <div className={classes.filterSegment}>
                            <select name="happyEnd"
                                    id="happyEnd"
                                    onChange={() => setFilterActive(false)}>
                                <option value="allEnds">Alle Enden</option>
                                <option value={true}>Happy End</option>
                                <option value={false}>kein Happy End</option>
                            </select>
                        </div>

                        <div className={classes.fskIndicatorContainer}>
                            <FskIndicator arrowPos={fskPosAge}
                                          setFskPos={(fskPosAge) => setFskPosAge(fskPosAge)}/>
                        </div>

                    </div>

                    <button onClick={() => {
                        setFilterActive(true)
                        filterDatabase(moviesDb,
                            document.getElementById('category').value,
                            document.getElementById('happyEnd').value,
                            fskPosAge)

                    }}
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
     * @param {array } movies
     * @param {string} category
     * @param {string} happyEnd
     * @param {number} fskPosAge fsk Age
     */
    function filterDatabase(movies, category, happyEnd, fskPosAge) {
        console.log('filterDatabase', movies, category, happyEnd, fskPosAge)
        const happy = (happy) => {
            if (happy === 'allEnds') return 'allEnds'
            if (happy === 'true') return true
            if (happy === 'false') return false
        }
        if (category !== 'allCategories' || happyEnd !== 'allEnds' || fskPosAge < 18) {
            const filteredByCategory = filterMoviesByCategory(movies, category)
            //console.log(filteredByCategory)
            const filteredByCategoryAndHappyEnd = filterMoviesByHappyEnd(filteredByCategory, happy(happyEnd))
            //console.log(filteredByCategoryAndHappyEnd)
            const filtered = filterMoviesByFsk(filteredByCategoryAndHappyEnd, fskPosAge)
            console.log(filtered)
            setFilteredMovies(filtered);
            setFilterLength(filtered.length);
            setActivePage(0)
        } else {
            console.log('ungefiltert');
            setFilteredMovies(movies);
            setFilterLength(movies.length);
            setFilterActive(false);
        }
    }

    /**
     * Filter Movies by Category
     * @param {array} movies movies
     * @param { string } category 'movie' || 'tv'
     * @return {array} filtered movies
     */
    function filterMoviesByCategory(movies, category) {
        if (category !== 'allCategories') {
            console.log('filterCategory', category)
            const movieFilter = movies.filter(movie => movie.category === category)
            return movieFilter
        } else return movies
    }

    /**
     * Filter Movies with or without HappyEnd
     * @param {array} movies movies
     * @param {any} hasHappyEnd 'allEnds' or true or false
     * @return {array} filtered movies
     */
    function filterMoviesByHappyEnd(movies, hasHappyEnd) {
        if (hasHappyEnd === true || hasHappyEnd === false) {
            console.log('filterHappyEnd', hasHappyEnd)
            const movieFilter = movies.filter(movie => movie.has_happy_end === hasHappyEnd)
            return movieFilter
        } else return movies
    }

    /**
     * Filter Movies by Fsk rating
     * @param {array} movies
     * @param {number} fskPos 0-4
     */
    function filterMoviesByFsk(movies, fskPosAge) {
        if (fskPosAge < 18) {
            console.log('filterFsk', fskPosAge)
            const movieFilter = movies.filter(movie => movie.fsk <= fskPosAge)
            return movieFilter
        } else return movies
    }

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
import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";


const Showroom = ({moviesDB, dbLength, saveSelectedMovie}) => {

    const [filteredMovies, setFilteredMovies] = useState(moviesDB ? moviesDB : [])
    const [searchFilteredMovies, setSearchFilteredMovies] = useState([]) //TODO
    const [filterLength, setFilterLength] = useState(dbLength)

    const [activePage, setActivePage] = useState(0)
    const pageLength = 24;
    const index = activePage * pageLength;

    const pages = Math.ceil(filterLength / pageLength)

    const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength, pageLength * (activePage + 1)))

    const [searchingCategory, setSearchingCategory] = useState('movie')

    const widthShowroom = window.innerWidth - 260

    const [searchFor, setSearchFor] = useState()

    /**
     * Sort Movies by Title and update movies after Timeout
     */
    useEffect(() => {
        moviesDB.sort((a, b) => (a.title < b.title) ? -1
            : (a.title > b.title) ? 1
                : 0)
        if (filterLength === dbLength) {
            setTimeout(() => setFilteredMovies(moviesDB), 1500)
            setFilterLength(moviesDB.length)
        }
    }, [moviesDB, filterLength, dbLength])

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
                        size='13'
                        fontPx= '15'
                        buttonSize='20'
                        searchMovie={(movieName, searchCategory) => searchMovieDb(movieName, searchCategory)}
                        saveSearchFor={(movieName) => setSearchFor(movieName)}/>
                </div>
                <div className={classes.filterContainer}>

                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, 'all')}
                         className={classes.filter}>Alles anzeigen
                    </div>
                    <div onClick={() => filterMoviesByCategory('movie')}
                         className={classes.filter}>Alle Filme
                    </div>
                    <div onClick={() => filterMoviesByCategory('tv')}
                         className={classes.filter}>Alle Serien
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, true)}
                         className={classes.filter}>Filme mit Happy End
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, false)}
                         className={classes.filter}>Filme ohne Happy End
                    </div>
                    <div className={classes.sidebarInfos}>
                        <div>Gesamt <b>{filterLength}</b> Filme</div>
                    </div>
                </div>
            </div>

            <div className={classes.showroomContainer} style={{width: widthShowroom + 'px'}}>
                {/*<div className={classes.searchContainer}>
                    <SearchBar
                        searchMovie={(movieName, searchCategory) => searchMovieDb(movieName, searchCategory)}
                        saveSearchFor={(movieName) => setSearchFor(movieName)}/>
                </div>*/}

                {/*<div className={classes.categoryBtns}>
                    <button onClick={() => filterMoviesByCategory('movie')}>Filme</button>
                    <button onClick={() => filterMoviesByCategory('tv')}>Serien</button>
                </div>*/}

                {filteredMovies.length > 0 ?
                    <div className={classes.filteredMoviesContainer}>

                        <div className={classes.filteredMoviesResult}>
                            {filteredMoviesPart.map((movie) =>
                                <SearchResultBox
                                    key={movie.id}
                                    movie={movie}
                                    to='/detailansicht'
                                    saveSelectedMovie={(currentMovie, category) => saveSelectedMovie(currentMovie, category)}
                                    category={searchingCategory}
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
     * Filter Movies with or without HappyEnd
     * @param {array} movies movies Array
     * @param {boolean} hasHappyEnd true or false
     * @return {array with objects}
     */
    function filterMoviesByHappyEnd(movies, hasHappyEnd) {
        if (hasHappyEnd === 'all') {
            setFilterLength(moviesDB.length)
            setFilteredMovies(moviesDB)
            setSearchFilteredMovies(moviesDB)
        } else {
            const movieFilter = movies.filter(movie => movie.has_happy_end === hasHappyEnd)
            setFilteredMovies(movieFilter)
            setFilterLength(movieFilter.length)
        }
    }

    /**
     * Filter Movies
     * @param {string} movieName
     * @param {string} searchCategory eg 'movie' || 'tv'
     */
    function filterMoviesByName(movieName, searchCategory) {
        const movieFilter = moviesDB.filter(movie => {
                if (movie.title) {
                    return movie.title.toLowerCase().includes(movieName.toLowerCase()) ||
                        movie.original_title.toLowerCase().includes(movieName.toLowerCase())
                } else return movie.original_name.toLowerCase().includes(movieName.toLowerCase())
            }
        )
        setFilteredMovies(movieFilter)
        setSearchFilteredMovies(movieFilter)
        setFilterLength(movieFilter.length)
    }

    /**
     * Filter Movies by Category
     * @param {string} category 'movie' || 'tv'
     */
    function filterMoviesByCategory(category) {
        const movieFilter = moviesDB.filter(movie => movie.category === category)
        setFilteredMovies(movieFilter);
        setFilterLength(movieFilter.length);
        setActivePage(0)
    }

    /**
     * Search Movie
     * @return {Promise<void>}
     */
    function searchMovieDb(movieName, searchCategory) {
        if (movieName.length === 0) {
            setFilteredMovies(moviesDB);
            setSearchFilteredMovies(moviesDB);
            setFilterLength(moviesDB.length);
            window.location.hash = '';
        } else {
            window.location.hash = movieName;
            setSearchingCategory(searchCategory);
            setSearchFor(movieName);
            filterMoviesByName(movieName, searchCategory)
        }
    }

}

export default Showroom
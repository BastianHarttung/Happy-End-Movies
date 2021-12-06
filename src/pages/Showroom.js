import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";


const Showroom = ({moviesDB, dbLength, callback}) => {

    const [filteredMovies, setFilteredMovies] = useState([])
    const [searchFilteredMovies, setSearchFilteredMovies] = useState([]) //TODO
    const [filterLength, setFilterLength] = useState(dbLength)

    const [activePage, setActivePage] = useState(0)
    const pageLength = 24;
    const index = activePage * pageLength;


    const pages = Math.ceil(filterLength / pageLength)

    const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength,pageLength * (activePage+1)))

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
                <div className={classes.filterContainer}>
                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, 'all')}
                         className={classes.filter}>Alle
                        Filme
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, true)}
                         className={classes.filter}>Filme
                        mit
                        Happy End
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(searchFilteredMovies, false)}
                         className={classes.filter}>Filme
                        ohne
                        Happy End
                    </div>
                </div>
            </div>

            <div className={classes.filteredMoviesContainer}>
                <SearchBar
                    searchMovie={(movieName) => searchMovieDb(movieName)}/>
            </div>

            {filteredMovies.length > 0 ?
                <div className={classes.filteredMoviesContainer}>

                    <div className={classes.filteredMoviesResult}>
                        {filteredMoviesPart.map((movie) =>
                            <SearchResultBox
                                key={movie.id}
                                movie={movie}
                                to='/detailansicht'
                                parentCallback={(currentMovie) => callback(currentMovie)}
                            />)}

                    </div>

                    <div className={classes.infosContainer}>
                        {Array.from(Array(pages).keys()).map((page) =>
                                <span key={page+1}
                                      onClick={() => changePage(page)}
                                      className={activePage === page ? classes.activePageBtn : classes.pageBtn}>
                        {page + 1}</span>
                        )}
                    </div>

                    <div className={classes.infosContainer}>
                        <div>Gesamt {filterLength} Filme</div>
                    </div>

                </div>
                : filteredMovies.length === 0 ?
                    <div className={classes.filteredMoviesContainer}>
                        <div className={classes.loader}>Loading...</div>
                    </div>
                    : 'Load'}

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
     */
    function filterMovies(movieName) {
        const movieFilter = moviesDB.filter(movie => movie.title.toLowerCase() === movieName.toLowerCase())
        setFilteredMovies(movieFilter)
        setSearchFilteredMovies(movieFilter)
        setFilterLength(movieFilter.length)
    }

    /**
     * Search Movie
     * @return {Promise<void>}
     */
    function searchMovieDb(movieName) {
        if (movieName.length === 0) {
            setFilteredMovies(moviesDB)
            setSearchFilteredMovies(moviesDB)
            setFilterLength(moviesDB.length)
            window.location.hash = '';
        } else {
            window.location.hash = movieName;
            filterMovies(movieName)
        }
    }

    /**
     * Change Page Number
     * @param page
     */
    function changePage(page) {
        setActivePage(page)
    }

}

export default Showroom
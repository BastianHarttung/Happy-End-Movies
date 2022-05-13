import classes from "./Showroom.module.scss";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import {collection, getDocs} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import FskIndicator from "../components/FskIndicator";
import {ReactComponent as FilterIcon} from "../assets/icons/filter.svg";
import {ReactComponent as CloseIcon} from "../assets/icons/times.svg";
// import {TCategorySearch} from "../interfaces/types";
// import {TCategory} from "../interfaces/types";
// import {THappyEndFilter} from "../interfaces/types";
// import {TCategoryFilter} from "../interfaces/types";

// interface IShowroomProps {
//   saveSelectedMovie: (movie: any, category: any) => Promise<void>;
// }

const Showroom = ({saveSelectedMovie}) => {

    const [moviesDb, setMoviesDb] = useState([]);
    const [dbLength, setDbLength] = useState(0);

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchFilteredMovies, setSearchFilteredMovies] = useState([]); //TODO
    const [filterActive, setFilterActive] = useState(false);
    const [filterLength, setFilterLength] = useState(dbLength);

    const [activePage, setActivePage] = useState(0);
    const pageLength = 24;
    const index = activePage * pageLength;

    const pages = Math.ceil(filterLength / pageLength);

    const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength, pageLength * (activePage + 1)));

    const [searchFor, setSearchFor] = useState("");

    const [fskPosAge, setFskPosAge] = useState(18);

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {
        loadMoviesFromDbAndSetStates();
    }, []);

    /**
     *
     */
    useEffect(() => {
        filteredMovies.sort((a, b) => (a.title < b.title) ? -1
            : (a.title > b.title) ? 1
                : 0);
    }, [filteredMovies]);

    /**
     * Scrolling Sidebar
     */
    const [scrollPosition, setScrollPosition] = useState(60);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(Math.max(0, 60 - position));
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const styleSidebar = {
        minWidth: sidebarOpen ? "210px" : "0px",
        width: sidebarOpen ? "20%" : "0",
        borderRight: sidebarOpen ? "1px solid var(--gray)" : "0px",
    };

    const filterIconStyle = {
        fill: sidebarOpen ? "var(--main-color)" : "black",
    };

    return (
        <section className={classes.showroomSection}>

            <div className={classes.sidebar}
                 style={styleSidebar}>

                <div className={classes.sidebarCloseBtnContainer}>
                    <CloseIcon className={classes.sidebarCloseBtn}
                               onClick={() => setSidebarOpen(false)}/>
                </div>

                <div>
                    <div className={classes.searchContainer}>
                        <SearchBar
                            length={13}
                            searchSize={15}
                            searchMovie={(movieName, searchCategory) => searchMovieDb(movieName, searchCategory)}
                            saveSearchFor={(movieName) => setSearchFor(movieName)}
                        />
                    </div>

                    <div className={classes.filterContainer}>

                        <button onClick={() => {
                            loadMoviesFromDbAndSetStates();
                            setFilterActive(false);
                        }}
                                className={!filterActive ? classes.btnActive : ""}>{filterActive ? "Filter deaktivieren" : "Filter sind deaktiviert"}
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
                                    <option value="true">Happy End</option>
                                    <option value="false">kein Happy End</option>
                                </select>
                            </div>

                            <div className={classes.fskIndicatorContainer}>
                                <FskIndicator arrowPos={fskPosAge}
                                              saveFskPos={(fskPosAge) => setFskPosAge(fskPosAge)}/>
                            </div>

                        </div>

                        <button onClick={() => {
                            setFilterActive(true);
                            filterDatabase(moviesDb,
                                document.getElementById("category").value,
                                document.getElementById("happyEnd").value,
                                fskPosAge);

                        }}
                                className={filterActive ? classes.btnActive : ""}>{filterActive ? "Gefiltert" : "Filtern"}
                        </button>

                        <div className={classes.sidebarInfos}>
                            <div><b>{filterLength}</b> Filme</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={classes.showroomContainer}>

                <div className={classes.mainSectionHeader}>
                    <FilterIcon className={classes.filterMenuIcon}
                                onClick={() => setSidebarOpen(true)}
                                style={filterIconStyle}/>
                </div>

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
                        {page + 1}</span>,
                            )}
                        </div>
                    </div>
                    : filteredMovies.length === 0 ?
                        <div className={classes.filteredMoviesContainer}>
                            <div className={classes.loader}>Loading...</div>
                        </div>
                        : "Load"}
            </div>

        </section>
    );

    /**
     * Load Movies from Database sort and set all States to this
     * @return {Promise<void>}
     */
    async function loadMoviesFromDbAndSetStates() {
        const moviesCollectionRef = collection(firestoreDb, "movies");
        const data = await getDocs(moviesCollectionRef);
        const movieDataArray = data.docs.map((doc) => ({...doc.data()}));
        const movieArraySort = sortMovies(movieDataArray);
        setDbLength(movieDataArray.length);
        setFilterLength(movieDataArray.length);
        setMoviesDb(movieArraySort);
        setFilteredMovies(movieArraySort);
    }

    /**
     * Sort Movies from Database by Title
     */
    function sortMovies(moviesArray) {
        moviesArray.sort((a, b) => (a.title < b.title || a.name < b.name || a.title < b.name || a.name < b.title) ? -1
            : (a.title > b.title || a.name > b.name || a.title > b.name || a.name > b.title) ? 1
                : 0);
        return moviesArray;
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
                        movie.original_title.toLowerCase().includes(movieName.toLowerCase());
                } else return movie.original_name.toLowerCase().includes(movieName.toLowerCase());
            },
        );
        setFilteredMovies(movieFilter);
        setSearchFilteredMovies(movieFilter)
        setFilterLength(movieFilter.length);
    }

    /**
     * Filter Database by Arguments
     * @param {array } movies
     * @param {string} category
     * @param {string} happyEnd
     * @param {number} fskPosAge fsk Age
     */
    function filterDatabase(movies, category, happyEnd, fskPosAge) {
        console.log("filterDatabase", movies, category, happyEnd, fskPosAge);
        if (category !== "allCategories" || happyEnd !== "allEnds" || fskPosAge < 18) {
            const filteredByCategory = filterMoviesByCategory(movies, category);
            //console.log(filteredByCategory)
            const filteredByCategoryAndHappyEnd = filterMoviesByHappyEnd(filteredByCategory, happyEnd);
            //console.log(filteredByCategoryAndHappyEnd)
            const filtered = filterMoviesByFsk(filteredByCategoryAndHappyEnd, fskPosAge);
            console.log(filtered);
            setFilteredMovies(filtered);
            setFilterLength(filtered.length);
            setActivePage(0);
        } else {
            console.log("ungefiltert");
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
        if (category !== "allCategories") {
            console.log("filterCategory", category);
            return movies.filter(movie => movie.category === category);
        } else return movies;
    }

    /**
     * Filter Movies with or without HappyEnd
     * @param {array} movies movies
     * @param {any} hasHappyEnd 'allEnds' or true or false
     * @return {array} filtered movies
     */
    function filterMoviesByHappyEnd(movies, hasHappyEnd) {
        if (hasHappyEnd === true || hasHappyEnd === false) {
            console.log("filterHappyEnd", hasHappyEnd);
            return movies.filter(movie => movie.has_happy_end === hasHappyEnd);
        } else return movies;
    }

    /**
     * Filter Movies by Fsk rating
     * @param {array} movies
     * @param {number} fskPosAge 0-4
     */
    function filterMoviesByFsk(movies, fskPosAge) {
        if (fskPosAge < 18) {
            console.log("filterFsk", fskPosAge);
            return movies.filter(movie => movie.fsk <= fskPosAge);
        } else return movies;
    }

    /**
     * Search Movie
     * @return        {        Promise < void >    }
     */
    function searchMovieDb(movieName, searchCategory) {
        if (movieName.length === 0) {
            setFilteredMovies(moviesDb);
            setSearchFilteredMovies(moviesDb);
            setFilterLength(moviesDb.length);
            window.location.hash = "";
        } else {
            window.location.hash = movieName;
            // setSearchFor(movieName);
            filterMoviesByName(movieName, searchCategory);
        }
    }

};

export default Showroom;
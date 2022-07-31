import classes from "./Showroom.module.scss";
import {useEffect, useState} from "react";
//Firestore
import {collection, getDocs} from "firebase/firestore";
import firestoreDb from "../firebase-config";
//Components
import SearchBar from "../components/SearchBar";
import FskIndicator from "../components/FskIndicator";
import SearchResultBox from "../components/SearchResultBox";
//Pictures
import {ReactComponent as FilterIcon} from "../assets/icons/filter.svg";
import {ReactComponent as CloseIcon} from "../assets/icons/times.svg";
//Types
import {
  TCategorySearch,
  TCategoryWatch,
  THappyEndFilter,
  TCategoryFilter,
} from "../models/types";
import {EHappyEndFilter, EHasHappyEnd} from "../models/enums";


const Showroom = () => {

  const [moviesDb, setMoviesDb] = useState<any[]>([]);
  const [dbLength, setDbLength] = useState<number>(0);

  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [searchFilteredMovies, setSearchFilteredMovies] = useState<any[]>([]); //TODO
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [filterLength, setFilterLength] = useState<number>(dbLength);
  const [filterHappyEnd, setFilterHappyEnd] = useState<THappyEndFilter>(EHappyEndFilter.ALL_ENDS);
  const [filterCategory, setFilterCategory] = useState<TCategoryFilter>("allCategories");


  const [activePage, setActivePage] = useState<number>(0);
  const pageLength: number = 24;
  const index: number = activePage * pageLength;

  const pages = Math.ceil(filterLength / pageLength);

  const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength, pageLength * (activePage + 1)));

  const [searchFor, setSearchFor] = useState<string>("");

  const [fskPosAge, setFskPosAge] = useState<number>(18);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);


  useEffect(() => {
    loadMoviesFromDbAndSetStates();
  }, []);

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
                        value={filterCategory}
                        onChange={(e) => {
                          setFilterCategory(e.target.value as TCategoryFilter)
                          setFilterActive(false)
                        }}>
                  <option value="allCategories">Filme + Serien</option>
                  <option value="movie">Filme</option>
                  <option value="tv">Serien</option>
                </select>
              </div>

              <div className={classes.filterSegment}>
                <select name="happyEnd"
                        id="happyEnd"
                        value={filterHappyEnd}
                        onChange={(e) => {
                          setFilterHappyEnd(e.target.value as THappyEndFilter)
                          setFilterActive(false)
                        }}>
                  <option value={EHappyEndFilter.ALL_ENDS}>Alle Enden</option>
                  <option value={EHappyEndFilter.TRUE}>Happy End</option>
                  <option value={EHappyEndFilter.FALSE}>kein Happy End</option>
                </select>
              </div>

              <div className={classes.fskIndicatorContainer}>
                <FskIndicator arrowPos={fskPosAge}
                              saveFskPos={(fskPosAge: number) => setFskPosAge(fskPosAge)}/>
              </div>

            </div>

            <button onClick={() => {
              setFilterActive(true);
              filterDatabase(moviesDb, filterCategory, filterHappyEnd, fskPosAge);
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
                  id={movie.id}
                  category={movie.category}
                  movieName={movie.name}
                  hasHappyEnd={movie.has_happy_end}
                  posterPath={movie.poster_path}
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
  async function loadMoviesFromDbAndSetStates(): Promise<void> {
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
  function sortMovies(moviesArray: any[]): any[] {
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
  function filterMoviesByName(movieName: string, searchCategory: TCategoryWatch): void {
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
  function filterDatabase(movies: any[], category: TCategoryFilter, happyEnd: THappyEndFilter, fskPosAge: number) {
    console.log("filterDatabase", movies, category, happyEnd, fskPosAge);
    if (category !== "allCategories" || happyEnd !== EHappyEndFilter.ALL_ENDS || fskPosAge < 18) {
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
  function filterMoviesByCategory(movies: any[], category: TCategoryFilter) {
    if (category !== "allCategories") {
      console.log("filterCategory", category);
      return movies.filter(movie => movie.category === category);
    } else return movies;
  }

  // Filter Movies with or without HappyEnd
  function filterMoviesByHappyEnd(movies: any[], hasHappyEnd: THappyEndFilter) {
    if (hasHappyEnd === EHasHappyEnd.TRUE || hasHappyEnd === EHasHappyEnd.FALSE) {
      console.log("filterHappyEnd", hasHappyEnd);
      return movies.filter(movie => movie.has_happy_end === hasHappyEnd);
    } else return movies;
  }

  // Filter Movies by Fsk rating
  function filterMoviesByFsk(movies: any[], fskPosAge: number) {
    if (fskPosAge < 18) {
      console.log("filterFsk", fskPosAge);
      return movies.filter(movie => movie.fsk <= fskPosAge);
    } else return movies;
  }

  //Search Movie
  function searchMovieDb(movieName: string, searchCategory: TCategorySearch | undefined) {
    if (movieName.length === 0) {
      setFilteredMovies(moviesDb);
      setSearchFilteredMovies(moviesDb);
      setFilterLength(moviesDb.length);
      window.location.hash = "";
    } else {
      window.location.hash = movieName;
      // setSearchFor(movieName);
      filterMoviesByName(movieName, searchCategory as TCategoryWatch);
    }
  }

};

export default Showroom;
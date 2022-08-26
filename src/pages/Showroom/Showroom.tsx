import classes from "./Showroom.module.scss";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
//Components
import Sidebar from "./sidebar/sidebar";
import SearchResultBox from "../../components/SearchResultBox";
//Pictures
import {ReactComponent as FilterIcon} from "../assets/icons/filter.svg";
//Types
import {IMovieAllInfos} from "../../models/interfaces/movie-interfaces";
import {ITvAllInfos} from "../../models/interfaces/tv-interfaces";
import showroomStore from "../../stores/page-stores/showroom-store";


const Showroom = () => {

  const {databaseStore,filteredMedias,filteredDbLength} = showroomStore

  // const [moviesDb, setMoviesDb] = useState<(IMovieAllInfos | ITvAllInfos)[]>([]);
  // const [dbLength, setDbLength] = useState<number>(0);

  const [filteredMovies, setFilteredMovies] = useState<(IMovieAllInfos | ITvAllInfos)[]>([]);
  // const [searchFilteredMovies, setSearchFilteredMovies] = useState<any[]>([]);
  // const [filterActive, setFilterActive] = useState<boolean>(false);
  // const [filterLength, setFilterLength] = useState<number>(databaseStore.dbLength);
  // const [filterHappyEnd, setFilterHappyEnd] = useState<THappyEndFilter>(EHappyEndFilter.ALL_ENDS);
  // const [filterCategory, setFilterCategory] = useState<TCategoryFilter>("allCategories");


  const [activePage, setActivePage] = useState<number>(0);
  const pageLength: number = 24;
  const index: number = activePage * pageLength;

  const pages = Math.ceil(filteredDbLength / pageLength);

  const filteredMoviesPart = filteredMovies.slice(index, Math.max(pageLength, pageLength * (activePage + 1)));

  const [searchFor, setSearchFor] = useState<string>("");

  const [fskPosAge, setFskPosAge] = useState<number>(18);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);


  useEffect(() => {
    databaseStore.loadMoviesFromDbAndSetStates();
  }, []);


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

  const filterIconStyle = {
    fill: sidebarOpen ? "var(--main-color)" : "black",
  };

  return (
    <section className={classes.showroomSection}>

      <Sidebar sidebarOpen={sidebarOpen}
               onCloseSidebar={() => setSidebarOpen(false)}/>

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
                  movie={movie}
                  movieName={"title" in movie && movie.title ? movie.title : "original_name" in movie ? movie.original_name : ""}
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

};

export default observer(Showroom);
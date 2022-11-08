import classes from "./Showroom.module.scss";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import showroomStore from "../../stores/page-stores/showroom-store";
//Components
import Sidebar from "./sidebar/sidebar";
import SearchResultBox from "../../components/SearchResultBox";
//Pictures
import {ReactComponent as FilterIcon} from "../../assets/icons/filter.svg";


const Showroom = () => {

  const {
    filteredMedias,
    filteredDbLength,
    databaseStore,
    paginationStore,
  } = showroomStore

  const {
    activePage,
    totalPages,
    pageLength,
    setActivePage
  } = paginationStore


  const index: number = activePage * pageLength;

  const pages = Math.ceil(filteredDbLength / pageLength);

  const filteredMoviesPart = filteredMedias.slice(index, Math.max(pageLength, pageLength * (activePage + 1)));

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

        {filteredMedias.length > 0 ?
          <div className={classes.filteredMoviesContainer}>
            <div className={classes.filteredMoviesResult}>
              {filteredMoviesPart.map((movie) =>
                <SearchResultBox
                  key={movie.id}
                  id={movie.id}
                  category={movie.category}
                  // movie={movie}
                  movieName={"title" in movie && movie.title ? movie.title : "original_name" in movie ? movie.original_name : ""}
                  hasHappyEnd={movie.has_happy_end}
                  posterPath={movie.poster_path}
                  onClick={()=>{}} //TODO
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
          : filteredMedias.length === 0 ?
            <div className={classes.filteredMoviesContainer}>
              <div className={classes.loader}>Loading...</div>
            </div>
            : "Load"}
      </div>

    </section>
  );

};

export default observer(Showroom);
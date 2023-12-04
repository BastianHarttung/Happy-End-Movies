import classes from "./Showroom.module.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import showroomStore from "../../stores/page-stores/showroom-store";
//Components
import Sidebar from "./sidebar/sidebar";
import SearchResultBox from "../../components/SearchResultBox";
//Pictures
import FilterIcon from "../../assets/icons/filter.svg";
import LoadingBars from "../../components/Loaders/LoadingBars";
import Pagination from "../../components/Pagination";


const Showroom = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { filteredMedias, filteredDbLength, paginationStore, isLoading } =
    showroomStore;

  const { activePage, pageLength, pagesArray, setActivePage } = paginationStore;

  const index: number = activePage * pageLength;

  // const pages = Math.ceil(filteredDbLength / pageLength);

  const filteredMoviesPart = filteredMedias.slice(
    index,
    Math.max(pageLength, pageLength * (activePage + 1))
  );

  /**
   * Scrolling Sidebar
   */
  const [scrollPosition, setScrollPosition] = useState(60);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(Math.max(0, 60 - position));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filterIconStyle = {
    fill: sidebarOpen ? "var(--main-color)" : "black",
  };

  return (
    <section className={classes.showroomSection}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      <div className={classes.showroomContainer}>
        <div className={classes.mainSectionHeader}>
          <img
            src={FilterIcon}
            alt="Filter"
            className={classes.filterMenuIcon}
            onClick={() => setSidebarOpen(true)}
            style={filterIconStyle}
          />
        </div>

        {isLoading && (
          <div className={classes.filteredMoviesContainer}>
            <LoadingBars />
          </div>
        )}

        {!isLoading && filteredMedias.length > 0 && (
          <div className={classes.filteredMoviesContainer}>
            <div className={classes.filteredMoviesResult}>
              {filteredMoviesPart.map((movie) => (
                <SearchResultBox
                  key={movie.id}
                  id={movie.id}
                  category={movie.category}
                  movieName={
                    "title" in movie && movie.title
                      ? movie.title
                      : "original_name" in movie
                      ? movie.original_name
                      : ""
                  }
                  hasHappyEnd={movie.has_happy_end}
                  posterPath={movie.poster_path}
                />
              ))}
            </div>

            <div className={classes.infosContainer}>
              <Pagination
                totalPages={pagesArray}
                activePage={activePage}
                changePage={(page: number) => setActivePage(page)}
                totalResults={filteredDbLength}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default observer(Showroom);

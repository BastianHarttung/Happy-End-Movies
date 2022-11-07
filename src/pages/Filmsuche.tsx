import classes from "./Filmsuche.module.scss";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import SearchResultBox from "../components/SearchResultBox";
import SearchBar from "../components/SearchBar";
import {Button} from "../styleComponents/ButtonStyleComp";
import Pagination from "../components/Pagination";
import {TCategory, TCategorySearch} from "../models/types";
import filmsucheStore from "../stores/page-stores/filmsuche-store";
import {ROUTES} from "../models/routes";
import {useNavigate} from "react-router-dom";
import detailsStore from "../stores/page-stores/details-store";


const Filmsuche = () => {

  const navigate = useNavigate();
  const [searchFor, setSearchFor] = useState("");

  const {
    searchStarted,
    searchingTmdb,
    tmdbStore,
    paginationStore
  } = filmsucheStore
  const {
    setSelectedMediaOrPersonForDetails,
  } = detailsStore
  const {
    searchedMedias,
    searchCategory,
    searchResult,
    searchTotalResults,
    popularMedias,
    getPopularMoviesFromTmdb,
  } = tmdbStore
  const {
    pagesArray,
    activePage,
    setActivePage,
  } = paginationStore

  useEffect(() => {
    getPopularMoviesFromTmdb()
  }, []);

  const handleSearch = async (searchString: string, category: TCategorySearch) => {
    await searchingTmdb(searchString, category)
  }

  const handleSearchResultBoxClick = (object: { id: number }, category: TCategory) => {
    setSelectedMediaOrPersonForDetails(object, category)
      .then(() => {
        navigate(ROUTES.DETAILS_WITH_CATEGORY_ID(category, object.id.toString()));
      });
  }

  return (
    <div className={classes.filmsucheSection}>

      <div className={classes.filmsucheContainer}>
        <SearchBar
          length={22}
          searchSize={19}
          searchMovie={(movieName) => searchingTmdb(movieName, searchCategory)}
          saveSearchFor={(movieName) => setSearchFor(movieName)}
        />

        <div className={classes.categoryBtnContainer}>
          <Button name="Alles"
                  fontSize={1.2}
                  activated={searchCategory === "multi"}
                  onClick={() => handleSearch(searchFor, "multi")}/>
          <Button name="Filme"
                  fontSize={1.2}
                  activated={searchCategory === "movie"}
                  onClick={() => handleSearch(searchFor, "movie")}/>
          <Button name="Serien"
                  fontSize={1.2}
                  activated={searchCategory === "tv"}
                  onClick={() => handleSearch(searchFor, "tv")}/>
          <Button name="Schauspieler"
                  fontSize={1.2}
                  activated={searchCategory === "person"}
                  onClick={() => handleSearch(searchFor, "person")}/>
        </div>

        {(searchStarted && !searchTotalResults) &&
        <div className={classes.headOverResults}>Keine Ergebnisse für:{searchResult}</div>}

        {(searchStarted && !!searchTotalResults) ?
          <div className={classes.headOverResults}>Suchergebnisse für: {searchResult}</div>
          : <div className={classes.headOverResults}>Täglicher Trend</div>}

        {(searchStarted && !!searchTotalResults) ?
          <>
            <div className={classes.resultSection}>
              {searchedMedias.map((movie, index) =>
                <SearchResultBox key={index}
                                 id={movie.id}
                                 category={searchCategory}
                                 mediaType={movie.media_type}
                                 movieName={"name" in movie ? movie.name : movie.title}
                                 posterPath={"poster_path" in movie ? movie.poster_path : movie.profile_path}
                                 personGender={"gender" in movie ? movie.gender : 0}
                                 movie={movie}
                                 onClick={handleSearchResultBoxClick}/>)}
            </div>
            <Pagination totalPages={pagesArray}
                        activePage={activePage}
                        changePage={(page: number) => setActivePage(page)}
                        totalResults={searchTotalResults}/>
          </>
          :
          <div className={classes.resultSection}>
            {popularMedias.slice(0, 5).map((movie, index) =>
              <SearchResultBox key={index}
                               id={movie.id}
                               category={searchCategory}
                               mediaType={movie.media_type}
                               movieName={"title" in movie ? movie.title : movie.name}
                               posterPath={"poster_path" in movie ? movie.poster_path : movie.profile_path}
                               onClick={handleSearchResultBoxClick}/>)}
          </div>}

      </div>

    </div>
  );

};

export default observer(Filmsuche);
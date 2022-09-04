import classes from "./Filmsuche.module.scss";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import SearchResultBox from "../components/SearchResultBox";
import SearchBar from "../components/SearchBar";
import {Button} from "../styleComponents/ButtonStyleComp";
import Pagination from "../components/Pagination";
import {TCategorySearch, TSearchResults} from "../models/types";
import filmsucheStore from "../stores/page-stores/filmsuche-store";


const Filmsuche = () => {

  const [searchFor, setSearchFor] = useState("");

  const {
    searchStarted,
    searchingTmdb,
    tmdbStore,
    paginationStore
  } = filmsucheStore
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

  const handleSearch = (searchString: string, category: TCategorySearch) => {
    searchingTmdb(searchString, category)
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

        {(searchStarted && !!!searchTotalResults) &&
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
                                 personGender={"gender" in movie ? movie.gender : 0}/>)}
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
                               posterPath={"poster_path" in movie ? movie.poster_path : movie.profile_path}/>)}
          </div>}

        {/*{searchStarted && <Pagination totalPages={pagesArray}*/}
        {/*                              activePage={activePage}*/}
        {/*                              changePage={(page: number) => setActivePage(page)}*/}
        {/*                              totalResults={totalResults}/>}*/}

      </div>

    </div>
  );

};

export default observer(Filmsuche);
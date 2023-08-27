import classes from "./Filmsuche.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import SearchResultBox from "../components/SearchResultBox";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Button } from "../styleComponents";
import filmsucheStore from "../stores/page-stores/filmsuche-store";
import { TCategory, TCategorySearch } from "../models/types";
import { ROUTES } from "../models/routes";


const Filmsuche = () => {
  const navigate = useNavigate();
  const [searchFor, setSearchFor] = useState("");

  const {
    searchStarted,
    searchingOnTmdb,
    tmdbStore: {
      searchedMedias,
      searchCategory,
      searchResult,
      searchTotalResults,
      popularMedias,
      getPopularMoviesFromTmdb,
    },
    paginationStore: { pagesArray, activePage, setActivePage },
  } = filmsucheStore;

  useEffect(() => {
    getPopularMoviesFromTmdb();
  }, []);

  const handleSearch = async (
    searchString: string,
    category: TCategorySearch
  ) => {
    await searchingOnTmdb(searchString, category);
  };

  const handleSearchResultBoxClick = (id: number, category: TCategory) => {
    navigate(ROUTES.DETAILS_WITH_CATEGORY_ID(category, id.toString()));
  };

  return (
    <main className={classes.filmsucheSection}>
      <div className={classes.filmsucheContainer}>
        <SearchBar
          length={22}
          size={19}
          searchMovie={(movieName) =>
            handleSearch(movieName, searchCategory)
          }
          saveSearchFor={(movieName) => setSearchFor(movieName)}
        />

        <div className={classes.categoryBtnContainer}>
          <Button
            name="Alles"
            activated={searchCategory === "multi"}
            onClick={() => handleSearch(searchFor, "multi")}
            style={{ fontSize: "1.2em" }}
          />
          <Button
            name="Filme"
            activated={searchCategory === "movie"}
            onClick={() => handleSearch(searchFor, "movie")}
            style={{ fontSize: "1.2em" }}
          />
          <Button
            name="Serien"
            activated={searchCategory === "tv"}
            onClick={() => handleSearch(searchFor, "tv")}
            style={{ fontSize: "1.2em" }}
          />
          <Button
            name="Schauspieler"
            activated={searchCategory === "person"}
            onClick={() => handleSearch(searchFor, "person")}
            style={{ fontSize: "1.2em" }}
          />
        </div>

        {searchStarted && !searchTotalResults && (
          <div className={classes.headOverResults}>
            Keine Ergebnisse für:{searchResult}
          </div>
        )}

        {searchStarted && !!searchTotalResults ? (
          <div className={classes.headOverResults}>
            Suchergebnisse für: {searchResult}
          </div>
        ) : (
          <div className={classes.headOverResults}>Täglicher Trend</div>
        )}

        {searchStarted && !!searchTotalResults ? (
          <>
            <div className={classes.resultSection}>
              {searchedMedias.map((movie, index) => (
                <SearchResultBox
                  key={index}
                  id={movie.id}
                  hasHappyEnd={null}
                  category={searchCategory}
                  mediaType={movie.media_type}
                  movieName={"name" in movie ? movie.name : movie.title}
                  posterPath={
                    "poster_path" in movie
                      ? movie.poster_path
                      : movie.profile_path
                  }
                  personGender={"gender" in movie ? movie.gender : 0}
                  onClick={handleSearchResultBoxClick}
                />
              ))}
            </div>
            <Pagination
              totalPages={pagesArray}
              activePage={activePage}
              changePage={(page: number) => setActivePage(page)}
              totalResults={searchTotalResults}
            />
          </>
        ) : (
          <div className={classes.resultSection}>
            {popularMedias.slice(0, 5).map((movie, index) => (
              <SearchResultBox
                key={index}
                id={movie.id}
                hasHappyEnd={null}
                category={searchCategory}
                mediaType={movie.media_type}
                movieName={"title" in movie ? movie.title : movie.name}
                posterPath={
                  "poster_path" in movie
                    ? movie.poster_path
                    : movie.profile_path
                }
                onClick={handleSearchResultBoxClick}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default observer(Filmsuche);
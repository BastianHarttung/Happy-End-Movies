import classes from "./Filmsuche.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import SearchResultBox from "../components/SearchResultBox";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import LoadingMovieStreifen from "../components/Loaders/LoadingMovieStreifen";
import { Button } from "../styleComponents";
import filmsucheStore from "../stores/page-stores/filmsuche-store";
import { TCategory, TCategorySearch } from "../models/types";
import { ROUTES } from "../models/routes";

const Filmsuche = () => {
  const locationHashString: string = window.location.hash
    .substring(1)
    .split("%20")
    .join(" ");

  const navigate = useNavigate();
  const [searchFor, setSearchFor] = useState<string>(locationHashString);

  const {
    searchStarted,
    searchCategory,
    setSearchCategory,
    searchingOnTmdb,
    tmdbStore: {
      searchedMedias,
      searchResult,
      searchTotalResults,
      popularMedias,
      isLoadingTmdb,
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
    setSearchCategory(category);
    await searchingOnTmdb(searchString, category);
  };

  const handleSearchResultBoxClick = (id: number, category: TCategory) => {
    navigate(ROUTES.DETAILS_WITH_CATEGORY_ID(category, id.toString()));
  };

  useEffect(() => {
    searchingOnTmdb(searchFor, searchCategory);
  }, [activePage]);

  return (
    <main className={classes.filmsucheSection}>
      <div className={classes.filmsucheContainer}>
        <SearchBar
          value={searchFor}
          length={22}
          size={19}
          searchMovie={(movieName) => handleSearch(movieName, searchCategory)}
          saveSearchFor={(movieName) => setSearchFor(movieName)}
        />

        <div className={classes.categoryBtnContainer}>
          <Button
            name="Alles"
            activated={searchCategory === "multi"}
            buttonStyle={searchCategory === "multi" ? "primary" : "secondary"}
            onClick={() => handleSearch(searchFor, "multi")}
            style={{ fontSize: "1.2em", width: "147px" }}
          />
          <Button
            name="Filme"
            activated={searchCategory === "movie"}
            buttonStyle={searchCategory === "movie" ? "primary" : "secondary"}
            onClick={() => handleSearch(searchFor, "movie")}
            style={{ fontSize: "1.2em", width: "147px" }}
          />
          <Button
            name="Serien"
            activated={searchCategory === "tv"}
            buttonStyle={searchCategory === "tv" ? "primary" : "secondary"}
            onClick={() => handleSearch(searchFor, "tv")}
            style={{ fontSize: "1.2em", width: "147px" }}
          />
          <Button
            name="Schauspieler"
            activated={searchCategory === "person"}
            buttonStyle={searchCategory === "person" ? "primary" : "secondary"}
            onClick={() => handleSearch(searchFor, "person")}
            style={{ fontSize: "1.2em", width: "147px" }}
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
            {isLoadingTmdb ? (
              <LoadingMovieStreifen />
            ) : (
              <div className={classes.resultSection}>
                {searchedMedias.map((movie, index) => (
                  <SearchResultBox
                    key={index}
                    id={movie.id}
                    hasHappyEnd={null}
                    category={movie.media_type || searchCategory}
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
            )}
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
                category={movie.media_type}
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

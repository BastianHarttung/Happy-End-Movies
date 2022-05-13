import classes from "./DetailsMovie.module.scss";
import emptyImage from "../assets/img/movie-poster.png";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {
  FaSmileBeam,
  FaSadTear,
  FaMeh,
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
  FaRegEyeSlash,
  FaRegEye,
} from "react-icons/fa";
import {imageUrl} from "../constants";
import PersonBox from "../components/PersonBox";
import ImagesBox from "../components/ImagesBox";
import {Button} from "../styleComponents/ButtonStyleComp";
import globalStore from "../stores/global-store";
import apiStore from "../stores/api-store";
import {observer} from "mobx-react";


interface IDetailsMovieProps {
  saveSelectedPerson: () => void,
}

const DetailsMovie = ({saveSelectedPerson}: IDetailsMovieProps) => {
  const {user} = globalStore;
  const {selectedMovie, saveMovieToDb} = apiStore;

  const navigate = useNavigate();
  const urlParams = useParams();

  const genres = selectedMovie.genres ? selectedMovie.genres : [{name: "a"}, {name: "b"}];

  const [movieForDb, setMovieForDb] = useState(selectedMovie);
  const [happyMovie, setHappyMovie] = useState(
    selectedMovie.has_happy_end === true
      ? true
      : selectedMovie.has_happy_end === false
        ? false
        : "neutral"
  );

  const [scrollActors, setScrollActors] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(100);

  const [searchActor, setSearchActor] = useState("");
  const [filteredActors, setFilteredActors] = useState(
    selectedMovie.directors.concat(selectedMovie.cast)
  );

  const [userSelection, setUserSelection] = useState({
    [user.userId]: {happyEnd_Voting: "neutral", haveSeen: false},
  });

  useEffect(() => {
    selectedMovie.has_happy_end === true
      ? setHappyMovie(true)
      : selectedMovie.has_happy_end === false
        ? setHappyMovie(false)
        : setHappyMovie("neutral");
  }, [selectedMovie.has_happy_end, selectedMovie]);

  useEffect(() => {
    setScrollWidth(getScrollWidth());
  }, []);

  return (
    <section className={classes.detailsMovieSection}>
      <section className={classes.movieSection}>
        <img
          src={
            selectedMovie.backdrop_path
              ? imageUrl + selectedMovie.backdrop_path
              : imageUrl + selectedMovie.poster_path
          }
          className={classes.backdropImage}
          alt="Backdrop"
        />

        <div className={classes.detailsContainer}>
          <div className={classes.posterContainer}>
            {happyMovie === true ? (
              <FaSmileBeam
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--green)"}}
              />
            ) : happyMovie === false ? (
              <FaSadTear
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--red)"}}
              />
            ) : happyMovie === "neutral" ? (
              <FaMeh
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--orange)"}}
              />
            ) : (
              ""
            )}
            <img
              className={classes.posterImage}
              src={
                selectedMovie.poster_path
                  ? imageUrl + selectedMovie.poster_path
                  : emptyImage
              }
              alt="Poster"
            />
          </div>

          <div className={classes.infoSection}>
            <div>
              <h2 className={classes.title}>{selectedMovie.title}</h2>
              <div className="d-flex-row">
                {selectedMovie.fsk && (selectedMovie.fsk === 0 || selectedMovie.fsk <= 100) && (
                  <div className={classes.fskInfo}>
                    <img
                      src={`https://altersfreigaben.de/images/rating/de/${selectedMovie.fsk}_90.png`}
                      className={classes.fsk}
                      alt={selectedMovie.fsk}
                      title={`FSK ${selectedMovie.fsk}`}
                    />
                  </div>
                )}

                <p className={classes.releaseYear}>
                  {selectedMovie.release_date.slice(0, 4)}
                </p>

                <p>
                  {selectedMovie.runtime} min (
                  {laufzeitInStunden(selectedMovie.runtime).stunden} Std.{" "}
                  {laufzeitInStunden(selectedMovie.runtime).minuten} min.)
                </p>
              </div>

              <div>
                <div className={classes.genres}>
                  {genres.map((genre, index) => (
                    <div key={index} className={classes.genre}>
                      {genre.name}{" "}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className={classes.voting}>{selectedMovie.vote_average}</div>
          </div>
        </div>
      </section>

      <section className={classes.actorSection}>
        <div className={classes.actorSearchContainer}>
          {scrollActors > 0 ? (
            <FaChevronLeft
              onClick={() => scrollLeft()}
              className={classes.arrowBtnLeft}
            ></FaChevronLeft>
          ) : (
            ""
          )}

          {scrollActors < scrollWidth ? (
            <FaChevronRight
              onClick={() => scrollRight()}
              className={classes.arrowBtnRight}
            ></FaChevronRight>
          ) : (
            ""
          )}

          <div className={classes.searchContainer}>
            <FaSearch
              className={classes.searchBtn}
              onClick={() => searchForActor(searchActor)}
            />
            <input
              type="text"
              placeholder="Suche Schauspieler oder Rolle"
              className={classes.searchInput}
              value={searchActor}
              onChange={(e) => setSearchActor(e.target.value)}
              onKeyPress={keyPressEvent}
            />
            <div className={classes.lengthActors}>
              (Gesamt: {selectedMovie.cast.length} Schauspieler)
            </div>
          </div>

          <div id="actorContainer" className={classes.actorContainer}>
            {selectedMovie.cast
              ? filteredActors.map((actor, index) => (
                <PersonBox
                  saveSelectedPerson={(person) =>
                    saveSelectedPerson(person)
                  }
                  key={index}
                  person={actor}
                />
              ))
              : ""}
          </div>
        </div>
      </section>

      <section className={classes.extraInfosSection}>
        <div className={classes.videosImagesContainer}>
          <div>
            {!!selectedMovie.images.posters.length && (
              <ImagesBox
                title={"Poster"}
                images={selectedMovie.images.posters}
              />
            )}

            {!!selectedMovie.images.backdrops.length && (
              <ImagesBox
                title={"Hintergründe"}
                images={selectedMovie.images.backdrops}
              />
            )}

            {!!selectedMovie.images.logos.length && (
              <ImagesBox title={"Logos"} images={selectedMovie.images.logos}/>
            )}
          </div>
          <div className={classes.videoContainer}>
            {selectedMovie.videos.results.map((video, index) => {
              return (
                <div key={index} className={classes.videoBox}>
                  <iframe
                    width="260"
                    title={video.name}
                    src={"https://www.youtube.com/embed/" + video.key}
                  ></iframe>
                  <div className={classes.videoName}>{video.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedMovie.tagline && (
          <h3 className={classes.subtitle}>{selectedMovie.tagline}</h3>
        )}
        {selectedMovie.overview && (
          <div className={classes.description}>
            <b>Beschreibung:</b> {selectedMovie.overview}
          </div>
        )}
      </section>

      <section className={classes.userSelectionSection}>
        <div className={classes.userSelectionContainer}>
          <div>
            <div className={classes.gesehen}>Schon gesehen?</div>
            <div className={classes.eyes}>
              <FaRegEye
                onClick={() =>
                  setUserSelection({
                    ...userSelection,
                    haveSeen: true,
                  })
                }
                className={
                  userSelection.haveSeen === true
                    ? classes.eyeGreen
                    : classes.eye
                }
              />
              <FaRegEyeSlash
                onClick={() =>
                  setUserSelection({
                    ...userSelection,
                    haveSeen: false,
                  })
                }
                className={
                  userSelection.haveSeen === false
                    ? classes.eyeRed
                    : classes.eye
                }
              />
            </div>
          </div>

          {userSelection.haveSeen === true && (
            <div>
              <div className={classes.happyEnd}>Dein Happy End ?</div>

              <div className={classes.smileys}>
                <FaSmileBeam
                  onClick={() =>
                    setUserSelection({
                      ...userSelection,
                      happyEnd_Voting: true,
                    })
                  }
                  className={
                    userSelection.happyEnd_Voting &&
                    userSelection.happyEnd_Voting === true
                      ? classes.smileyLaugh
                      : classes.smiley
                  }
                ></FaSmileBeam>
                <FaMeh
                  onClick={() =>
                    setUserSelection({
                      ...userSelection,
                      happyEnd_Voting: "neutral",
                    })
                  }
                  className={
                    userSelection.happyEnd_Voting &&
                    userSelection.happyEnd_Voting === "neutral"
                      ? classes.smileyNeutral
                      : classes.smiley
                  }
                ></FaMeh>
                <FaSadTear
                  onClick={() =>
                    setUserSelection({
                      ...userSelection,
                      happyEnd_Voting: false,
                    })
                  }
                  className={
                    userSelection.happyEnd_Voting === false
                      ? classes.smileySad
                      : classes.smiley
                  }
                ></FaSadTear>
              </div>
            </div>
          )}

          <Button
            name="In Datenbank speichern und zum Showroom"
            fontSize={1}
            onClick={() => {
              setMovieForDb({...selectedMovie, userSelection});
              saveMovieToDb(movieForDb);
              setHappyMovie("");
              navigate("/showroom");
            }}
          />
        </div>
      </section>
    </section>
  );

  /**
   * Searching and Filtering For Actor
   * @param {string} actorSearch
   */
  function searchForActor(actorSearch) {
    const actorSearchLow = actorSearch.toLowerCase();
    if (actorSearch === "") {
      console.log("alle actors anzeigen");
      setFilteredActors(selectedMovie.cast);
    } else {
      console.log("suche nach " + actorSearch);
      setFilteredActors(
        selectedMovie.cast.filter((actor) => {
          if (actor.character) {
            return (
              actor.name.toLowerCase().includes(actorSearchLow) ||
              actor.character.toLowerCase().includes(actorSearchLow)
            );
          } else {
            let actorCharacter = false;
            for (let role of actor.roles) {
              if (
                role.character.toLowerCase().includes(actorSearchLow)
              ) {
                actorCharacter = true;
              }
            }
            return (
              actor.name.toLowerCase().includes(actorSearchLow) ||
              actorCharacter
            );
          }
        })
      );
    }
  }

  /**
   * Set Scroll Width
   */
  function getScrollWidth() {
    const actorContainer = document.getElementById("actorContainer");
    return actorContainer.scrollWidth - actorContainer.offsetWidth;
  }

  /**
   * Scroll Actors Right
   */
  function scrollRight() {
    const actorContainer = document.getElementById("actorContainer");
    const scrollWidth = scrollActors + actorContainer.offsetWidth - 100;
    if (scrollActors < actorContainer.scrollWidth) {
      actorContainer.scroll(scrollWidth, 0);
      setScrollActors(scrollWidth);
    }
  }

  /**
   * Scroll Actors Left
   */
  function scrollLeft() {
    const actorContainer = document.getElementById("actorContainer");
    const scrollWidth = scrollActors - actorContainer.offsetWidth + 100;
    if (scrollActors > 0) {
      actorContainer.scroll(scrollWidth, 0);
      setScrollActors(scrollWidth);
    }
  }

  /**
   * Listen if the Enter-Button is pressed
   */
  function keyPressEvent(event) {
    if (event.key === "Enter") {
      searchForActor(searchActor);
    }
  }

  /**
   * Berechnet die Laufzeit in Stunden und Minuten
   * @param {number} laufzeit
   * @return {{stunden: number, minuten: number}} Objekt mit den Stunden und Minuten
   */
  function laufzeitInStunden(laufzeit: number) {
    const laufzeitStunden = Math.floor(laufzeit / 60);
    const restminuten = laufzeit - laufzeitStunden * 60;
    return {stunden: laufzeitStunden, minuten: restminuten};
  }
};

export default observer(DetailsMovie);

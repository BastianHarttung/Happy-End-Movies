import classes from "./DetailsMovie.module.scss";
import emptyImage from "../../assets/img/movie-poster.png";
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
import {imageUrlBig} from "../../constants";
import PersonBox from "./details-components/personBox";
import ImagesBox from "./details-components/imagesBox";
import {Button} from "../../styleComponents/ButtonStyleComp";
import globalStore from "../../stores/global-store";
import apiStore from "../../stores/api-store";
import {observer} from "mobx-react";
import {ICastMovie, ICrewMovie, IUserSelections} from "../../interfaces/interfaces";
import {THasHappyEnd, TUserSelections} from "../../interfaces/types";
import Beschreibung from "./details-components/beschreibung";


const DetailsMovie = () => {
  const {user} = globalStore;
  const {selectedMovie, saveMovieToDb, concatCastAndCrew} = apiStore;

  const navigate = useNavigate();
  const urlParams = useParams();

  const [movieForDb, setMovieForDb] = useState(selectedMovie);
  const [happyMovie, setHappyMovie] = useState<THasHappyEnd>(
    selectedMovie.has_happy_end === ("true" || "false")
      ? selectedMovie.has_happy_end
      : "neutral"
  );

  const [scrollActors, setScrollActors] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(100);

  const [searchActor, setSearchActor] = useState<string>("");

  const [filteredActors, setFilteredActors] = useState<(ICastMovie | ICrewMovie)[]>(concatCastAndCrew(selectedMovie.cast, selectedMovie.directors));

  const [userSelection, setUserSelection] = useState<IUserSelections>({
    [user.userId]: {happyEnd_Voting: "neutral", haveSeen: false},
  });

  useEffect(() => {
    selectedMovie.has_happy_end === "true"
      ? setHappyMovie("true")
      : selectedMovie.has_happy_end === "false"
        ? setHappyMovie("false")
        : setHappyMovie("neutral");
  }, [selectedMovie.has_happy_end, selectedMovie]);

  useEffect(() => {
    setScrollWidth(getScrollWidth());
  }, []);

  return (
    <section className={classes.detailsMoviePage}>
      <section className={classes.movieSection}>
        <img
          src={
            selectedMovie.backdrop_path
              ? imageUrlBig + selectedMovie.backdrop_path
              : imageUrlBig + selectedMovie.poster_path
          }
          className={classes.backdropImage}
          alt="Backdrop"
        />

        <div className={`${classes.detailsContainer} ${classes.sectionContent}`}>
          <div className={classes.posterContainer}>
            {happyMovie === "true" ? (
              <FaSmileBeam
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--green)"}}
              />
            ) : happyMovie === "false" ? (
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
                  ? imageUrlBig + selectedMovie.poster_path
                  : emptyImage
              }
              alt="Poster"
            />
          </div>

          <div className={classes.infoSection}>
            <div>
              <h2 className={classes.title}>{selectedMovie.title}</h2>
              <div className="d-flex-row">
                {selectedMovie.fsk <= 100 && (
                  <div className={classes.fskInfo}>
                    <img
                      src={`https://altersfreigaben.de/images/rating/de/${selectedMovie.fsk}_90.png`}
                      className={classes.fsk}
                      alt={selectedMovie.fsk.toString()}
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
                  {selectedMovie.genres.map((genre, index) => (
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

      <section>
        <Beschreibung
          tagline={selectedMovie.tagline}
          overview={selectedMovie.overview}
          className={`${classes.sectionContent}`}/>
      </section>

      <section className={classes.actorSection}>
        <div className={`${classes.actorSearchContainer} ${classes.sectionContent}`}>
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
                  key={index}
                  person={actor}
                />
              ))
              : ""}
          </div>
        </div>
      </section>

      <section className={classes.extraInfosSection}>
        <div className={`${classes.videosImagesContainer} ${classes.sectionContent}`}>
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
      </section>

      <section className={classes.userSelectionSection}>
        <div className={classes.userSelectionContainer}>
          <div>
            <div className={classes.gesehen}>Schon gesehen?</div>
            <div className={classes.eyes}>
              <FaRegEye
                onClick={() => handleClickUserSelection("haveSeen", true)}
                className={
                  userSelection[user.userId].haveSeen === true
                    ? classes.eyeGreen
                    : classes.eye
                }
              />
              <FaRegEyeSlash
                onClick={() => handleClickUserSelection("haveSeen", false)}
                className={
                  userSelection[user.userId].haveSeen === false
                    ? classes.eyeRed
                    : classes.eye
                }
              />
            </div>
          </div>

          {userSelection[user.userId].haveSeen === true && (
            <div>
              <div className={classes.happyEnd}>Dein Happy End ?</div>

              <div className={classes.smileys}>
                <FaSmileBeam
                  onClick={() => handleClickUserSelection("happyEnd_Voting", "true")}
                  className={
                    userSelection[user.userId].happyEnd_Voting === "true"
                      ? classes.smileyLaugh
                      : classes.smiley
                  }
                ></FaSmileBeam>
                <FaMeh
                  onClick={() => handleClickUserSelection("happyEnd_Voting", "neutral")}
                  className={
                    userSelection[user.userId].happyEnd_Voting === "neutral"
                      ? classes.smileyNeutral
                      : classes.smiley
                  }
                ></FaMeh>
                <FaSadTear
                  onClick={() => handleClickUserSelection("happyEnd_Voting", "false")}
                  className={
                    userSelection[user.userId].happyEnd_Voting === "false"
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
              setMovieForDb({...selectedMovie, userSelections: userSelection});
              saveMovieToDb(movieForDb);
              setHappyMovie("neutral");
              navigate("/showroom");
            }}
          />
        </div>
      </section>
    </section>
  );

  //Change state for User Selection
  function handleClickUserSelection(name: TUserSelections, state: boolean | THasHappyEnd): void {
    setUserSelection({[user.userId]: {...userSelection[user.userId], [name]: state}})
  }

  //Searching and Filtering For Actor
  function searchForActor(actorSearch: string) {
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
            // for (let role of actor.roles) {   TODO
            //   if (
            //     role.character.toLowerCase().includes(actorSearchLow)
            //   ) {
            //     actorCharacter = true;
            //   }
            // }
            return (
              actor.name.toLowerCase().includes(actorSearchLow) ||
              actorCharacter
            );
          }
        })
      );
    }
  }

  //Set Scroll Width
  function getScrollWidth(): number {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) return actorContainer.scrollWidth - actorContainer.offsetWidth
    else return 0
  }

  //Scroll Actors Right
  function scrollRight(): void {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) {
      const scrollWidth = scrollActors + actorContainer.offsetWidth - 100;
      if (scrollActors < actorContainer.scrollWidth) {
        actorContainer.scroll(scrollWidth, 0);
        setScrollActors(scrollWidth);
      }
    }
  }

  //Scroll Actors Left
  function scrollLeft() {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) {
      const scrollWidth = scrollActors - actorContainer.offsetWidth + 100;
      if (scrollActors > 0) {
        actorContainer.scroll(scrollWidth, 0);
        setScrollActors(scrollWidth);
      }
    }
  }

  //Listen if the Enter-Button is pressed
  function keyPressEvent(event: any) {
    if (event.key === "Enter") {
      searchForActor(searchActor);
    }
  }

  //Berechnet die Laufzeit in Stunden und Minuten
  function laufzeitInStunden(laufzeit: number): { stunden: number, minuten: number } {
    const laufzeitStunden = Math.floor(laufzeit / 60);
    const restminuten = laufzeit - laufzeitStunden * 60;
    return {stunden: laufzeitStunden, minuten: restminuten};
  }

};

export default observer(DetailsMovie);
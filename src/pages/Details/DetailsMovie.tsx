import classes from "./DetailsMovie.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
  FaSmileBeam,
  FaSadTear,
  FaMeh,
  FaRegEyeSlash,
  FaRegEye,
} from "react-icons/fa";
import globalStore from "../../stores/global-store";
import apiStore from "../../stores/api-store";
import {observer} from "mobx-react";
import {IUserSelections} from "../../interfaces/interfaces";
import {THasHappyEnd, TUserSelections} from "../../interfaces/types";
//Components
import {Button} from "../../styleComponents/ButtonStyleComp";
import ImagesBox from "./details-components/imagesBox";
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";


const DetailsMovie = () => {
  const {user} = globalStore;
  const {selectedMovie, saveMovieToDb} = apiStore;

  const navigate = useNavigate();
  // const urlParams = useParams(); //TODO get id from url

  const [movieForDb, setMovieForDb] = useState(selectedMovie);

  const [userSelection, setUserSelection] = useState<IUserSelections>({
    [user.userId]: {happyEnd_Voting: "neutral", haveSeen: false},
  });

  return (
    <section className={classes.detailsMoviePage}>

      <section className={classes.movieSection}>
        <DetailInfos title={selectedMovie.title}
                     fsk={selectedMovie.fsk}
                     posterPath={selectedMovie.poster_path}
                     backdropPath={selectedMovie.backdrop_path}
                     hasHappyEnd={selectedMovie.has_happy_end}
                     releaseDate={selectedMovie.release_date}
                     runtime={selectedMovie.runtime}
                     genres={selectedMovie.genres}
                     voteAverage={selectedMovie.vote_average}
                     classNameContent={classes.sectionContent}/>
      </section>

      <section>
        <Beschreibung
          tagline={selectedMovie.tagline}
          overview={selectedMovie.overview}
          className={`${classes.sectionContent}`}/>
      </section>

      <section className={classes.actorSection}>
        <CastAndCrew castAndCrew={selectedMovie.castAndCrew}
                     classNameContent={classes.sectionContent}/>
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
                  userSelection[user.userId].haveSeen
                    ? classes.eyeGreen
                    : classes.eye
                }
              />
              <FaRegEyeSlash
                onClick={() => handleClickUserSelection("haveSeen", false)}
                className={
                  userSelection[user.userId].haveSeen
                    ? classes.eyeRed
                    : classes.eye
                }
              />
            </div>
          </div>

          {userSelection[user.userId].haveSeen && (
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

};

export default observer(DetailsMovie);

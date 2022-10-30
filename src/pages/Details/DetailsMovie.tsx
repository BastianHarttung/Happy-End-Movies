import classes from "./Details.module.scss";
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import detailsStore from "../../stores/page-stores/details-store";


const DetailsMovie = () => {

  const {selectedMovie, isLoading} = detailsStore;

  const [movie, setMovie] = useState(selectedMovie)

  const urlParams = useParams(); //TODO get id from url
  console.log("urlParams", urlParams.id)

  useEffect(() => {
    const storage = localStorage.getItem("selectedMovie")
    if (storage && urlParams) {
      const storageMovie = JSON.parse(storage)
      if (storageMovie.id.toString() === urlParams.id) setMovie(storageMovie)
    }
  }, []);

  return (
    <main className={classes.detailsMoviePage}>
      {/*{isLoading && <LoadingMovieStreifen/>}*/}
      {movie && <>
          <section className={classes.movieSection}>
              <DetailInfos title={movie.title}
                           fsk={movie.fsk}
                           posterPath={movie.poster_path}
                           backdropPath={movie.backdrop_path}
                           hasHappyEnd={movie.has_happy_end}
                           releaseDate={movie.release_date}
                           runtime={movie.runtime}
                           genres={movie.genres}
                           voteAverage={movie.vote_average}
                           classNameContent={classes.sectionContent}/>
          </section>

          <section className={classes.beschreibungSection}>
              <Beschreibung
                  tagline={movie.tagline}
                  overview={movie.overview}
                  className={classes.sectionContent}/>
          </section>

          <section className={classes.actorSection}>
              <CastAndCrew castAndCrew={movie.castAndCrew}
                           classNameContent={classes.sectionContent}/>
          </section>

          <section className={classes.imagesVideosSection}>
              <ImagesVideosSection classNameContent={classes.sectionContent}
                                   images={movie.images}
                                   videos={movie.videos.results}/>
          </section>

          <section className={classes.userSelectionSection}>
              <UserSelectionSection selectedMedia={movie}
                                    classNameContent={classes.sectionContent}/>
          </section>
      </>
      }

    </main>
  );

};

export default observer(DetailsMovie);

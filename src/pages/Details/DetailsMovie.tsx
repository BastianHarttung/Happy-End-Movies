import classes from "./Details.module.scss";
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import detailsStore from "../../stores/page-stores/details-store";
import LoadingMovieStreifen from "../../components/LoadingMovieStreifen";


const DetailsMovie = () => {

  const {selectedMovie, isLoading} = detailsStore;

  const urlParams = useParams(); //TODO get id from url
  console.log("urlParams", urlParams.id)

  return (
    <main className={classes.detailsMoviePage}>
      {isLoading && <LoadingMovieStreifen/>}
      {selectedMovie && <>
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

          <section className={classes.beschreibungSection}>
              <Beschreibung
                  tagline={selectedMovie.tagline}
                  overview={selectedMovie.overview}
                  className={classes.sectionContent}/>
          </section>

          <section className={classes.actorSection}>
              <CastAndCrew castAndCrew={selectedMovie.castAndCrew}
                           classNameContent={classes.sectionContent}/>
          </section>

          <section className={classes.imagesVideosSection}>
              <ImagesVideosSection classNameContent={classes.sectionContent}
                                   images={selectedMovie.images}
                                   videos={selectedMovie.videos.results}/>
          </section>

          <section className={classes.userSelectionSection}>
              <UserSelectionSection selectedMedia={selectedMovie}
                                    classNameContent={classes.sectionContent}/>
          </section>
      </>
      }

    </main>
  );

};

export default observer(DetailsMovie);

import classes from "./Details.module.scss";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import detailsStore from "../../stores/page-stores/details-store";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import LoadingMovieStreifen from "../../components/Loaders/LoadingMovieStreifen";
import globalStore from "../../stores/global-store";

const DetailsMovie = () => {
  const { userData } = globalStore;

  const { selectedMovie, isLoading, setSelectedMediaOrPersonForDetails } =
    detailsStore;

  const urlParams = useParams();

  useEffect(() => {
    if (userData && urlParams) {
      setSelectedMediaOrPersonForDetails(Number(urlParams.id), "movie");
    }
  }, [userData, urlParams, setSelectedMediaOrPersonForDetails]);

  return (
    <main className={classes.detailsMediaPage}>
      {isLoading && <LoadingMovieStreifen />}

      {!isLoading && selectedMovie && (
        <>
          <section className={classes.mediaSection}>
            <DetailInfos
              category={"movie"}
              title={selectedMovie.title}
              fsk={selectedMovie.fsk}
              posterPath={selectedMovie.poster_path}
              backdropPath={selectedMovie.backdrop_path}
              hasHappyEnd={selectedMovie.has_happy_end}
              releaseDate={selectedMovie.release_date}
              runtime={selectedMovie.runtime}
              genres={selectedMovie.genres}
              status={selectedMovie.status}
              voteAverage={selectedMovie.vote_average}
              classNameContent={classes.sectionContent}
            />
          </section>

          {selectedMovie.overview && (
            <section className={classes.beschreibungSection}>
              <Beschreibung
                tagline={selectedMovie.tagline}
                overview={selectedMovie.overview}
                className={classes.sectionContent}
              />
            </section>
          )}

          <section className={classes.actorSection}>
            <CastAndCrew
              castAndCrew={selectedMovie.castAndCrew}
              classNameContent={classes.sectionContent}
            />
          </section>

          <section className={classes.imagesVideosSection}>
            <ImagesVideosSection
              classNameContent={classes.sectionContent}
              images={selectedMovie.images}
              videos={selectedMovie.videos.results}
            />
          </section>

          <section className={classes.userSelectionSection}>
            <UserSelectionSection
              selectedMedia={selectedMovie}
              classNameContent={classes.sectionContent}
            />
          </section>
        </>
      )}
    </main>
  );
};

export default observer(DetailsMovie);

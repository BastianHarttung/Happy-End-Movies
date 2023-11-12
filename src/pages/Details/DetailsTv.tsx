import classes from "./Details.module.scss";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import detailsStore from "../../stores/page-stores/details-store";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import { useParams } from "react-router-dom";
import LoadingMovieStreifen from "../../components/Loaders/LoadingMovieStreifen";
import globalStore from "../../stores/global-store";

const DetailsMovie = () => {
  const { userData } = globalStore;

  const {
    selectedTv,
    isLoading,
    checkLocalStorage,
    setSelectedMediaOrPersonForDetails,
  } = detailsStore;

  const urlParams = useParams();

  useEffect(() => {
    if (userData && urlParams) {
      checkLocalStorage("selectedTv", Number(urlParams.id));
      setSelectedMediaOrPersonForDetails(Number(urlParams.id), "tv");
    }
  }, [userData, urlParams]);

  return (
    <main className={classes.detailsMediaPage}>
      {isLoading && <LoadingMovieStreifen />}
      {!isLoading && selectedTv && (
        <>
          <section className={classes.mediaSection}>
            <DetailInfos
              classNameContent={classes.sectionContent}
              title={selectedTv.original_name}
              fsk={selectedTv.fsk}
              posterPath={selectedTv.poster_path}
              backdropPath={selectedTv.backdrop_path}
              hasHappyEnd={selectedTv.has_happy_end}
              releaseDate={selectedTv.first_air_date}
              runtime={calculateAverageRunTime(selectedTv.episode_run_time)}
              genres={selectedTv.genres}
              voteAverage={selectedTv.vote_average}
            />
          </section>

          <section className={classes.beschreibungSection}>
            <Beschreibung
              tagline={selectedTv.tagline}
              overview={selectedTv.overview}
              className={classes.sectionContent}
            />
          </section>

          <section className={classes.actorSection}>
            <CastAndCrew
              castAndCrew={selectedTv.castAndCrew}
              classNameContent={classes.sectionContent}
            />
          </section>

          <section className={classes.imagesVideosSection}>
            <ImagesVideosSection
              classNameContent={classes.sectionContent}
              images={selectedTv.images}
              videos={selectedTv.videos.results}
            />
          </section>

          <section className={classes.userSelectionSection}>
            <UserSelectionSection
              selectedMedia={selectedTv}
              classNameContent={classes.sectionContent}
            />
          </section>
        </>
      )}
    </main>
  );
};

export default observer(DetailsMovie);

// Average Runtime for Tv Show
function calculateAverageRunTime(runtimeArray: number[]): number {
  const averageRunTime = runtimeArray.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);
  return Math.ceil(averageRunTime);
}

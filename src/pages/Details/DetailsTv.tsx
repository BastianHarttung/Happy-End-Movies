import classes from "./Details.module.scss";
import {observer} from "mobx-react";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import detailsStore from "../../stores/page-stores/details-store";


const DetailsMovie = () => {

  const {selectedTv} = detailsStore;

  // const urlParams = useParams(); //TODO get id from url

  return (
    <section className={classes.detailsMediaPage}>

      <section className={classes.mediaSection}>
        <DetailInfos title={selectedTv.original_name}
                     fsk={selectedTv.fsk}
                     posterPath={selectedTv.poster_path}
                     backdropPath={selectedTv.backdrop_path}
                     hasHappyEnd={selectedTv.has_happy_end}
                     releaseDate={selectedTv.first_air_date}
                     runtime={calculateAverageRunTime(selectedTv.episode_run_time)}
                     genres={selectedTv.genres}
                     voteAverage={selectedTv.vote_average}
                     classNameContent={classes.sectionContent}/>
      </section>

      <section className={classes.beschreibungSection}>
        <Beschreibung
          tagline={selectedTv.tagline}
          overview={selectedTv.overview}
          className={classes.sectionContent}/>
      </section>

      <section className={classes.actorSection}>
        <CastAndCrew castAndCrew={selectedTv.castAndCrew}
                     classNameContent={classes.sectionContent}/>
      </section>

      <section className={classes.imagesVideosSection}>
        <ImagesVideosSection classNameContent={classes.sectionContent}
                             images={selectedTv.images}
                             videos={selectedTv.videos.results}/>
      </section>

      <section className={classes.userSelectionSection}>
        <UserSelectionSection selectedMedia={selectedTv}
                              classNameContent={classes.sectionContent}/>
      </section>

    </section>
  );

  // Average Runtime for Tv Show
  function calculateAverageRunTime(runtimeArray: number[]): number {
    const averageRunTime = runtimeArray.reduce((avg, value, _, {length}) => {
      return avg + (value / length);
    }, 0)
    return Math.ceil(averageRunTime)
  }

};

export default observer(DetailsMovie);

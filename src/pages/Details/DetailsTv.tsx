import classes from "./Details.module.scss";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import detailsStore from "../../stores/page-stores/details-store";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";
import {useParams} from "react-router-dom";
import LoadingMovieStreifen from "../../components/LoadingMovieStreifen";


const DetailsMovie = () => {

  const {selectedTv, isLoading} = detailsStore;

  const [tv, setTv] = useState(selectedTv)

  const urlParams = useParams();

  useEffect(() => {
    const storage = localStorage.getItem("selectedTv")
    if (storage && urlParams) {
      const storageTv = JSON.parse(storage)
      if (storageTv.id.toString() === urlParams.id) setTv(storageTv)
    }
  }, []);

  return (
    <main className={classes.detailsMediaPage}>
      {isLoading && <LoadingMovieStreifen/>}
      {tv && <>
          <section className={classes.mediaSection}>
              <DetailInfos classNameContent={classes.sectionContent}
                           title={tv.original_name}
                           fsk={tv.fsk}
                           posterPath={tv.poster_path}
                           backdropPath={tv.backdrop_path}
                           hasHappyEnd={tv.has_happy_end}
                           releaseDate={tv.first_air_date}
                           runtime={calculateAverageRunTime(tv.episode_run_time)}
                           genres={tv.genres}
                           voteAverage={tv.vote_average}/>
          </section>

          <section className={classes.beschreibungSection}>
              <Beschreibung
                  tagline={tv.tagline}
                  overview={tv.overview}
                  className={classes.sectionContent}/>
          </section>

          <section className={classes.actorSection}>
              <CastAndCrew castAndCrew={tv.castAndCrew}
                           classNameContent={classes.sectionContent}/>
          </section>

          <section className={classes.imagesVideosSection}>
              <ImagesVideosSection classNameContent={classes.sectionContent}
                                   images={tv.images}
                                   videos={tv.videos.results}/>
          </section>

          <section className={classes.userSelectionSection}>
              <UserSelectionSection selectedMedia={tv}
                                    classNameContent={classes.sectionContent}/>
          </section>
      </>
      }

    </main>
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

import classes from "./DetailsMovie.module.scss";
import apiStore from "../../stores/api-store";
import {observer} from "mobx-react";
//Components
import Beschreibung from "./details-components/beschreibung";
import DetailInfos from "./details-components/detailInfos";
import CastAndCrew from "./details-components/castAndCrew";
import ImagesVideosSection from "./details-components/imagesVideosSection";
import UserSelectionSection from "./details-components/userSelectionSection";


const DetailsMovie = () => {

  const {selectedMovie} = apiStore;

  // const urlParams = useParams(); //TODO get id from url

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
          className={classes.sectionContent}/>
      </section>

      <section className={classes.actorSection}>
        <CastAndCrew castAndCrew={selectedMovie.castAndCrew}
                     classNameContent={classes.sectionContent}/>
      </section>

      <section className={classes.extraInfosSection}>
        <ImagesVideosSection classNameContent={classes.sectionContent}
                             images={selectedMovie.images}
                             videos={selectedMovie.videos.results}/>
      </section>

      <section className={classes.userSelectionSection}>
        <UserSelectionSection selectedMedia={selectedMovie}
                              classNameContent={classes.sectionContent}/>
      </section>

    </section>
  );

};

export default observer(DetailsMovie);

import classes from "./DetailsPerson.module.scss";
import {imageUrlBig, imageUrlSmall} from "../../constants";
import {useEffect, useState} from "react";
import {FaBirthdayCake, FaCross} from "react-icons/all";
//Images
import imageActorMan from "../../assets/img/actor.png";
import imageActorWoman from "../../assets/img/actor_girl.png";
//Components
import SearchResultBox from "../../components/SearchResultBox";

import {observer} from "mobx-react";
import detailsStore from "../../stores/page-stores/details-store";


const DetailsPerson = () => {
  const {selectedPerson} = detailsStore;

  const [age, setAge] = useState<number>(0);
  const [deathAge, setDeathAge] = useState<number>(0);

  useEffect(() => {
    setAge(calculateAge(new Date().toString()))
    setDeathAge(calculateAge(selectedPerson.deathday))
  }, [])

  return (
    <section className={classes.detailsPersonSection}>

      <div className={classes.personContainer}>

        <div>

          <img src={selectedPerson.profile_path ?
            imageUrlBig + selectedPerson.profile_path
            : selectedPerson.gender === 2 ?
              imageActorMan
              : imageActorWoman}
               className={classes.bigPic}
               alt='Schauspieler Foto'
               title={selectedPerson.name}/>

        </div>

        <div className={classes.personInfosContainer}>

          <h2>{selectedPerson.name}</h2>

          {selectedPerson.homepage ?
            <a href={selectedPerson.homepage} target='_blank'
               rel="noreferrer">{selectedPerson.homepage}</a> : ''}

          <div className={classes.birthday}>
            <FaBirthdayCake></FaBirthdayCake><span> {selectedPerson.birthday} ({age} Jahre)</span>
          </div>

          {selectedPerson.deathday ?
            <div className={classes.deathday}>
              <FaCross></FaCross><span>{selectedPerson.deathday} ({deathAge} Jahre)</span>
            </div> : ''}

          <div>
            <b>Geburtsort:</b> {selectedPerson.place_of_birth}
          </div>

          <div className={classes.imagesContainer}>
            {selectedPerson.images.profiles.slice(1).map(image =>
              <a href={imageUrlSmall + image.file_path}
                 target="_blank"
                 rel="noreferrer">
                <img src={imageUrlSmall + image.file_path}
                     alt="Foto"
                     loading="lazy"/>
              </a>)}
          </div>

        </div>

      </div>

      <section className={classes.biographySection}>
        <div className={classes.biography}>
          {selectedPerson.biography && <span><b>Biografie:</b> {selectedPerson.biography}</span>}
        </div>
      </section>

      <div className={classes.knownForHeading}>Bekannt für</div>

      <div className={classes.knownForContainer}>
        {selectedPerson.known_for.map(movie => {
            return <SearchResultBox key={movie.id}
                                    category={movie.media_type}
                                    id={movie.id}
                                    movieName={movie.title}
                                    posterPath={movie.poster_path}/>
          }
        )}
      </div>

    </section>
  )

  // Calculate Age of Person Today
  function calculateAge(calculateDay: string | null): number {
    const birthday = new Date(selectedPerson.birthday);
    if (calculateDay) {
      const monthDiff = new Date(calculateDay).getTime() - birthday.getTime();
      const ageDate = new Date(monthDiff);
      const year = ageDate.getUTCFullYear();
      const age = Math.abs(year - 1970);
      return age
    } else return 0
  }

}

export default observer(DetailsPerson)
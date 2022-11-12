import classes from "./DetailsPerson.module.scss";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react";
import {FaBirthdayCake, FaCross} from "react-icons/all";
import detailsStore from "../../stores/page-stores/details-store";
//Images
import imageActorMan from "../../assets/img/actor.png";
import imageActorWoman from "../../assets/img/actor_girl.png";
import {imageUrlBig, imageUrlSmall} from "../../constants";
//Components
import SearchResultBox from "../../components/SearchResultBox";
import LoadingMovieStreifen from "../../components/LoadingMovieStreifen";


const DetailsPerson = () => {
  const {selectedPerson, isLoading} = detailsStore;

  const urlParams = useParams();

  const [age, setAge] = useState<number>(0);
  const [deathAge, setDeathAge] = useState<number>(0);
  const [person, setPerson] = useState(selectedPerson)

  useEffect(() => {
    setAge(calculateAge(new Date().toString()))
    setDeathAge(calculateAge(selectedPerson.deathday))
  }, [])

  useEffect(() => {
    console.log(person.imdb_id)
    const storage = localStorage.getItem("selectedPerson")
    if (storage && urlParams) {
      const storagePerson = JSON.parse(storage)
      if (storagePerson.id.toString() === urlParams.id) setPerson(storagePerson)
    }
  }, []);


  return (
    <main>
      {isLoading && <LoadingMovieStreifen/>}
      {person && <section className={classes.detailsPersonSection}>

          <div className={classes.personContainer}>

              <div>

                  <img src={person.profile_path ?
                    imageUrlBig + person.profile_path
                    : person.gender === 2 ?
                      imageActorMan
                      : imageActorWoman}
                       className={classes.bigPic}
                       alt='Schauspieler Foto'
                       title={person.name}/>

              </div>

              <div className={classes.personInfosContainer}>

                  <h2>{person.name}</h2>

                {person.homepage ?
                  <a href={person.homepage} target='_blank'
                     rel="noreferrer">{person.homepage}</a> : ''}

                  <div className={classes.birthday}>
                      <FaBirthdayCake></FaBirthdayCake><span> {person.birthday} ({age} Jahre)</span>
                  </div>

                {person.deathday ?
                  <div className={classes.deathday}>
                    <FaCross></FaCross><span>{person.deathday} ({deathAge} Jahre)</span>
                  </div> : ''}

                  <div>
                      <b>Geburtsort:</b> {person.place_of_birth}
                  </div>

                  <div className={classes.imagesContainer}>
                    {person.images.profiles.slice(1).map((image, index) =>
                      <a key={index}
                         href={imageUrlSmall + image.file_path}
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
                {person.biography && <span><b>Biografie:</b> {person.biography}</span>}
              </div>
          </section>

          <div className={classes.knownForHeading}>Bekannt für</div>

          <div className={classes.knownForContainer}>
            {person.known_for?.map(movie => {
                return <SearchResultBox key={movie.id}
                                        category={movie.media_type}
                                        id={movie.id}
                                        hasHappyEnd={null}
                                        movieName={movie.title}
                                        posterPath={movie.poster_path}
                                        onClick={() => {
                                        }}/>
              }
            )}
          </div>

      </section>}
    </main>
  )

  // Calculate Age of Person Today
  function calculateAge(calculateDay: string | null): number {
    const birthday = new Date(person.birthday);
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
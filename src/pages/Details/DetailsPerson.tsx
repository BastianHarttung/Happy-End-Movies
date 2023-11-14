import classes from "./DetailsPerson.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { FaBirthdayCake, FaCross } from "react-icons/all";
import globalStore from "../../stores/global-store";
import detailsStore from "../../stores/page-stores/details-store";
import { imageUrlBig, imageUrlSmall } from "../../constants";
//Images
import imageActorMan from "../../assets/img/actor.png";
import imageActorWoman from "../../assets/img/actor_girl.png";
//Components
import SearchResultBox from "../../components/SearchResultBox";
import LoadingMovieStreifen from "../../components/Loaders/LoadingMovieStreifen";

const DetailsPerson = () => {
  const {
    selectedPerson,
    isLoading,
    checkLocalStorage,
    setSelectedMediaOrPersonForDetails,
  } = detailsStore;

  const { userData } = globalStore;

  const urlParams = useParams();

  const age = calculateAge(new Date().toString());
  const deathAge = calculateAge(selectedPerson.deathday);

  useEffect(() => {
    if (userData && urlParams) {
      checkLocalStorage("selectedPerson", Number(urlParams.id));
      setSelectedMediaOrPersonForDetails(Number(urlParams.id), "person");
    }
  }, [userData, urlParams]);

  return (
    <main>
      {isLoading && <LoadingMovieStreifen />}

      {!isLoading && selectedPerson && (
        <section className={classes.detailsPersonSection}>
          <div className={classes.personContainer}>
            <div>
              <img
                src={
                  selectedPerson.profile_path
                    ? imageUrlBig + selectedPerson.profile_path
                    : selectedPerson.gender === 2
                    ? imageActorMan
                    : imageActorWoman
                }
                className={classes.bigPic}
                alt="Schauspieler Foto"
                title={selectedPerson.name}
              />
            </div>

            <div className={classes.personInfosContainer}>
              <h2>{selectedPerson.name}</h2>

              {selectedPerson.homepage ? (
                <a
                  href={selectedPerson.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedPerson.homepage}
                </a>
              ) : (
                ""
              )}

              <div className={classes.birthday}>
                <FaBirthdayCake></FaBirthdayCake>
                <span>
                  {" "}
                  {selectedPerson.birthday} ({age} Jahre)
                </span>
              </div>

              {selectedPerson.deathday ? (
                <div className={classes.deathday}>
                  <FaCross></FaCross>
                  <span>
                    {selectedPerson.deathday} ({deathAge} Jahre)
                  </span>
                </div>
              ) : (
                ""
              )}

              <div>
                <b>Geburtsort:</b> {selectedPerson.place_of_birth}
              </div>

              <div className={classes.imagesContainer}>
                {selectedPerson.images.profiles.slice(1).map((image, index) => (
                  <a
                    key={index}
                    href={imageUrlSmall + image.file_path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={imageUrlSmall + image.file_path}
                      alt="Foto"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <section className={classes.biographySection}>
            <div className={classes.biography}>
              {selectedPerson.biography && (
                <span>
                  <b>Biografie:</b> {selectedPerson.biography}
                </span>
              )}
            </div>
          </section>

          <div className={classes.knownForHeading}>Bekannt für</div>

          <div className={classes.knownForContainer}>
            {selectedPerson.known_for?.map((movie) => {
              return (
                <SearchResultBox
                  key={movie.id}
                  category={movie.media_type}
                  id={movie.id}
                  hasHappyEnd={null}
                  movieName={movie.title}
                  posterPath={movie.poster_path}
                  onClick={() => {}}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );

  // Calculate Age of Person Today
  function calculateAge(calculateDay: string | null): number {
    const birthday = new Date(selectedPerson.birthday);
    if (calculateDay) {
      const monthDiff = new Date(calculateDay).getTime() - birthday.getTime();
      const ageDate = new Date(monthDiff);
      const year = ageDate.getUTCFullYear();
      const age = Math.abs(year - 1970);
      return age;
    } else return 0;
  }
};

export default observer(DetailsPerson);

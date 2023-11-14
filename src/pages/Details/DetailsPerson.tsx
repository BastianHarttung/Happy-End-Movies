import classes from "./DetailsPerson.module.scss";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { TCategory } from "../../models/types";
import { ROUTES } from "../../models/routes";

const DetailsPerson = () => {
  const {
    selectedPerson,
    isLoading,
    checkLocalStorage,
    setSelectedMediaOrPersonForDetails,
  } = detailsStore;

  const { userData } = globalStore;

  const urlParams = useParams();

  const navigate = useNavigate();

  const age = calculateAge(new Date(selectedPerson.birthday), new Date());
  const deathAge = calculateAge(
    new Date(selectedPerson.birthday),
    selectedPerson.deathday ? new Date(selectedPerson.deathday) : null
  );

  const handleSearchResultBoxClick = (id: number, category: TCategory) => {
    navigate(ROUTES.DETAILS_WITH_CATEGORY_ID(category, id.toString()));
  };

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

              {selectedPerson.homepage && (
                <a
                  href={selectedPerson.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedPerson.homepage}
                </a>
              )}

              <div className={`${classes.days_container} gap-4`}>
                <div className={`${classes.birthday} gap-2`}>
                  <FaBirthdayCake />
                  <span>
                    {formatDate(selectedPerson.birthday)} ({age} Jahre)
                  </span>
                </div>

                {selectedPerson.deathday && (
                  <div className={`${classes.deathday} gap-2`}>
                    <FaCross />
                    <span>
                      {formatDate(selectedPerson.deathday)} ({deathAge} Jahre)
                    </span>
                  </div>
                )}
              </div>

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
                  movieName={movie.title || movie.name}
                  posterPath={movie.poster_path}
                  onClick={handleSearchResultBoxClick}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default observer(DetailsPerson);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Calculate Age of Person Today
export function calculateAge(
  StartDate: Date,
  EndDate: Date | null
): number | null {
  if (EndDate) {
    const monthDiff = StartDate.getTime() - EndDate.getTime();
    const ageDate = new Date(monthDiff);
    const year = ageDate.getUTCFullYear();
    return Math.abs(year - 1969);
  } else return null;
}

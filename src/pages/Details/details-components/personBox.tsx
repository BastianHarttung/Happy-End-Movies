import classes from "./personBox.module.scss";
import { imageUrlSmall } from "../../../constants";
import imageActorMan from "../../../assets/img/actor.png";
import imageActorWoman from "../../../assets/img/actor_girl.png";
import { useNavigate } from "react-router-dom";
import tmdbStore from "../../../stores/tmdb-store";
import {
  ICastMovie,
  ICrewMovie,
} from "../../../models/interfaces/movie-interfaces";
import { ICastTv, ICrewTv } from "../../../models/interfaces/tv-interfaces";

interface IPersonBoxProps {
  person: ICastMovie | ICrewMovie | ICastTv | ICrewTv;
}

const PersonBox = ({ person }: IPersonBoxProps) => {
  const { getSelectedMediaOrPerson } = tmdbStore;

  const navigate = useNavigate();

  return (
    <div
      className={classes.actorProfile}
      onClick={async () => {
        await getSelectedMediaOrPerson(person.id, "person");
        navigate(`/detailansicht/person/${person.id}`);
      }}
    >
      <img
        className={classes.actorImage}
        src={
          person.profile_path
            ? imageUrlSmall + person.profile_path
            : person.gender === 2
            ? imageActorMan
            : imageActorWoman
        }
        alt={person.name}
        title={person.name}
        loading="lazy"
      />
      <h5 className={classes.actorName}>{person.name}</h5>

      {"character" in person && person.character ? (
        <p className={classes.character}>"{person.character}"</p>
      ) : "job" in person && person.job === "Director" ? (
        "Regie"
      ) : (
        ""
      )}
      {"roles" in person && person.roles
        ? person.roles.map((role, index) => {
            if (role.character !== "") {
              return (
                <p key={index} className={classes.character}>
                  "{role.character}"
                </p>
              );
            } else return "";
          })
        : ""}
    </div>
  );
};

export default PersonBox;

import classes from "./PersonBox.module.scss";
import {imageUrlSmall} from "../../../constants";
import imageActorMan from "../../../assets/img/actor.png";
import imageActorWoman from "../../../assets/img/actor_girl.png";
import {useNavigate} from "react-router-dom";
import {ICastMovie, ICrewMovie, IPerson} from "../../../interfaces/interfaces";
import apiStore from "../../../stores/api-store";

interface IPersonBoxProps {
  person: ICastMovie | ICrewMovie,
}

const PersonBox = ({person}: IPersonBoxProps) => {
  const {saveSelectedMovieOrPerson} = apiStore;

  const navigate = useNavigate();

  return (
    <div
      className={classes.actorProfile}
      onClick={async () => {
        await saveSelectedMovieOrPerson(person, "person");
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
      />
      <h5 className={classes.actorName}>{person.name}</h5>

      {"character" in person && person.character ? (
        <p className={classes.character}>"{person.character}"</p>
      ) : "job" in person && person.job === "Director" ? (
        "Regie"
      ) : (
        ""
      )}
      {"roles" in person && person.roles.map((role, index) => {
        if (role.character !== "") {
          return (
            <p key={index} className={classes.character}>
              "{role.character}"
            </p>
          );
        } else return "";
      })}
    </div>
  );
};

export default PersonBox;

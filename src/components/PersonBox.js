import classes from "./PersonBox.module.scss";
import { imageUrlSmall } from "../constants";
import imageActorMan from "../assets/img/actor.png";
import imageActorWoman from "../assets/img/actor_girl.png";
import { useNavigate } from "react-router-dom";

const PersonBox = (props) => {
   const navigate = useNavigate();

   return (
      <div
         className={classes.actorProfile}
         onClick={async () => {
            await props
               .saveSelectedPerson(props.person)
               .then(() =>
                  navigate(`/detailansicht/person/${props.person.id}`)
               );
         }}
      >
         <img
            className={classes.actorImage}
            src={
               props.person.profile_path
                  ? imageUrlSmall + props.person.profile_path
                  : props.person.gender === 2
                  ? imageActorMan
                  : imageActorWoman
            }
            alt={props.person.name}
            title={props.person.name}
         />
         <h5 className={classes.actorName}>{props.person.name}</h5>

         {props.person.character ? (
            <p className={classes.character}>"{props.person.character}"</p>
         ) : props.person.job === "Director" ? (
            "Regie"
         ) : (
            ""
         )}
         {props.person.roles
            ? props.person.roles.map((role, index) => {
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

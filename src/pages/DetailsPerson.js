import classes from "./DetailsPerson.module.css";
import {imageUrl} from "../constants";

const DetailsPerson = (props) => {
    return (
        <section className={classes.detailsPersonSection}>

            <h3>{props.person.name}</h3>
            <img src={imageUrl + props.person.profile_path}
                 alt='Schauspieler Foto'
                 title={props.person.name}/>
            {props.person.known_for.map( (movie,index) =>{
                return <div key={index}>{movie.title}</div>
            })}

        </section>
    )
}

export default DetailsPerson
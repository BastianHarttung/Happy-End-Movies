import classes from "./DetailsPerson.module.css";
import {imageUrl, imageUrlSmall} from "../constants";
import {useEffect, useState} from "react";
import {FaBirthdayCake, FaCross} from "react-icons/all";
import imageActorMan from "../assets/img/actor.png";
import imageActorWoman from "../assets/img/actor_girl.png";
import SearchResultBox from "../components/SearchResultBox";

const DetailsPerson = (props) => {
    console.log(props)
    const [age, setAge] = useState();
    const [deathAge, setDeathAge] = useState();

    useEffect(() => {
        setAge(calculateAge(new Date()))
        setDeathAge(calculateAge(props.person.deathday))
    }, [])

    return (
        <section className={classes.detailsPersonSection}>

            <div className={classes.personContainer}>

                <div>

                    <img src={props.person.profile_path ?
                        imageUrl + props.person.profile_path
                        : props.person.gender === 2 ?
                            imageActorMan
                            : imageActorWoman}
                         className={classes.bigPic}
                         alt='Schauspieler Foto'
                         title={props.person.name}/>

                </div>

                <div className={classes.personInfosContainer}>

                    <h2>{props.person.name}</h2>

                    {props.person.homepage ?
                        <a href={props.person.homepage} target='_blank'
                           rel="noreferrer">{props.person.homepage}</a> : ''}

                    <div className={classes.birthday}>
                        <FaBirthdayCake></FaBirthdayCake><span> {props.person.birthday} ({age} Jahre)</span>
                    </div>

                    {props.person.deathday ?
                        <div className={classes.deathday}>
                            <FaCross></FaCross><span>{props.person.deathday} ({deathAge} Jahre)</span>
                        </div> : ''}

                    <div>
                        <b>Geburtsort:</b> {props.person.place_of_birth}
                    </div>

                    <div className={classes.imagesContainer}>
                        {props.person.images.profiles.slice(1).map(image =>
                            <a href={imageUrlSmall + image.file_path}
                               target="_blank">
                                <img src={imageUrlSmall + image.file_path}
                                     alt="Foto"/>
                            </a>)}
                    </div>

                </div>

            </div>

            <section className={classes.biographySection}>
                <div className={classes.biography}>
                    <b>Biografie:</b> {props.person.biography}
                </div>
            </section>

            <div className={classes.knownForHeading}>Bekannt für</div>

            <div className={classes.knownForContainer}>
                {props.person.known_for.map(movie => {
                        console.log(movie)
                        return <SearchResultBox key={movie.id}
                                                saveSelectedMovie={(currentMovie, category) => props.saveSelectedMovie(currentMovie, category)}
                                                category={movie.media_type}
                                                movie={movie}/>
                    }
                )}
            </div>

        </section>
    )

    /**
     * Calculate Age of Person Today
     * @param {} calculateDay Day of Birth or Death
     * @return {number} age
     */
    function calculateAge(calculateDay) {
        const birthday = new Date(props.person.birthday);
        const monthDiff = new Date(calculateDay) - birthday.getTime();
        const ageDate = new Date(monthDiff);
        const year = ageDate.getUTCFullYear();
        const age = Math.abs(year - 1970);
        return age
    }

}

export default DetailsPerson
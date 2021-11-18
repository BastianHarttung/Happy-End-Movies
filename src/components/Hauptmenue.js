import image from '../assets/img/hauptmenue_movie-night.png'
import classes from './Hauptmenue.module.css'

const Hauptmenue = (props) => {
    return (
        <section className={classes.hauptmenueSection}>
            <img src={image} alt="Movie Night with Happy End"/>
        </section>
    )
}

export default Hauptmenue
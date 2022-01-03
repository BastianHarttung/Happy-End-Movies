import image from '../assets/img/hauptmenue_movie-night.png'
import classes from './Hauptmenue.module.css'
import {useNavigate} from "react-router-dom";
import {MdArrowForwardIos} from "react-icons/all";

const Hauptmenue = (props) => {
    const navigate = useNavigate();

    return (
        <section className={classes.hauptmenueSection}>
            <img className={classes.startImage} src={image} alt="Movie Night with Happy End"/>
            <div className={classes.buttonContainer}>
                <button className={classes.button}
                        onClick={() => navigate('/filmsuche')}>Gebe einem Film ein Happy End
                    <MdArrowForwardIos/>
                </button>
                <button className={classes.button}
                        onClick={() => navigate('/showroom')}>Durchsuche die Datenbank nach Filmen mit Happy End
                    <MdArrowForwardIos/>
                </button>
            </div>

        </section>
    )
}

export default Hauptmenue
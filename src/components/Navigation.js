import {Link} from "react-router-dom";
import icons_search_light from "../assets/icons/search_light.svg"
import icon_projector from "../assets/icons/projector_light.svg"
import classes from "./Navigation.module.scss";
import iconSignout from "../assets/icons/sign-out-alt_light.svg";
import {useState} from "react";

const Navigation = ({isHandy, propSetDarkMode}) => {

    const [darkMode, setDarkMode] = useState(false)

    return (
        <nav>
            <Link to='/filmsuche'
                  className={classes.navLinkContainer}>
                <div className={classes.linkContainer}>
                    {!isHandy && <div>Filmsuche</div>}
                    <img src={icons_search_light} alt="filmsuche"
                         className={classes.icons}/>
                </div>
            </Link>
            <Link to='/showroom'
                  className={classes.navLinkContainer}>
                <div className={classes.linkContainer}>
                    {!isHandy && <div>Showroom</div>}
                    <img src={icon_projector} alt="showroom"
                         className={classes.icons}/>
                </div>
            </Link>
            <button onClick={saveDarkMode}>DarkMode</button>
            <div className={classes.logoutLinkContainer}>
                {!isHandy && <div className={classes.username}>BASTIAN</div>}
                <Link to="/"
                      className={classes.logoutLink}>
                    <div className={classes.linkContainer}>
                        {!isHandy && <div>Logout</div>}
                        <img src={iconSignout}
                             className={classes.icons}/>
                    </div>
                </Link>
            </div>
        </nav>
    )

    function saveDarkMode() {
        propSetDarkMode(!darkMode);
        setDarkMode(!darkMode);
    }

}

export default Navigation
import {Link} from "react-router-dom";
import icons_search_light from "../assets/icons/search_light.svg"
import icon_projector from "../assets/icons/projector_light.svg"
import classes from "./Navigation.module.scss";

const Navigation = ({isHandy}) => {

    return (
        <nav>
            <Link to='/filmsuche'>
                <div className={classes.linkContainer}>
                    {!isHandy && <div>Filmsuche</div>}
                    <img src={icons_search_light} alt="filmsuche"
                         className={classes.icons}/>
                </div>
            </Link>
            <Link to='/showroom'>
                <div className={classes.linkContainer}>
                    {!isHandy && <div>Showroom</div>}
                    <img src={icon_projector} alt="showroom"
                         className={classes.icons}/>
                </div>
            </Link>
        </nav>
    )
}

export default Navigation
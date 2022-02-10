import Navigation from "./Navigation";
import {FaFilm} from "react-icons/all";
import classes from "./Header.module.css";
import {Link} from "react-router-dom";
import iconSignout from "../assets/icons/sign-out-alt_light.svg"


const Header = (props) => {
    return (
        <header className={classes.header}>
            <Link to='/'>
                <FaFilm style={{color: 'white', width: "50px", height: "50px"}}/>
            </Link>
            <Navigation></Navigation>
            <Link to="/login"
                  className={classes.logoutLink}>
                <div className={classes.linkContainer}>
                    <div>Logout</div>
                    <img src={iconSignout}
                         className={classes.icons}/>
                </div>
            </Link>
        </header>
    )
}

export default Header
import Navigation from "./Navigation";
import classes from "./Header.module.scss";
import {Link} from "react-router-dom";
import iconSignout from "../assets/icons/sign-out-alt_light.svg"
import {ReactComponent as HappyLogo} from '../assets/logos/Happy-End_logo-mit-Text.svg';


const Header = (props) => {
    return (
        <header className={classes.header}>
            <Link to='/menu'
                  className={classes.headerLogoLink}>
                <HappyLogo className={classes.happyLogo}/>
            </Link>

            <Navigation/>

            <div className={classes.userContainer}>
                <div className={classes.username}>BASTIAN</div>
                <Link to="/"
                      className={classes.logoutLink}>
                    <div className={classes.linkContainer}>
                        <div>Logout</div>
                        <img src={iconSignout}
                             className={classes.icons}/>
                    </div>
                </Link>
            </div>

        </header>
    )
}

export default Header
import Navigation from "./Navigation";
import classes from "./Header.module.scss";
import {Link} from "react-router-dom";
import {ReactComponent as HappyLogo} from '../assets/logos/Happy-End_logo-mit-Text.svg';
import {useEffect, useState} from "react";


const Header = ({openModalUserSettings}) => {

    const [isHandy, setIsHandy] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 800) setIsHandy(true)
        else setIsHandy(false)
    }, [])

    return (
        <header className={classes.header}>

            {!isHandy &&
            <Link to='/menu'
                  className={classes.headerLogoLink}>
                <HappyLogo className={classes.happyLogo}/>
            </Link>}

            <Navigation isHandy={isHandy}
                        openModalUserSettings={(modal) => openModalUserSettings(modal)}/>

        </header>
    )
}

export default Header
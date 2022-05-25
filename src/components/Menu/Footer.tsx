import classes from "./Footer.module.scss";
import {Link} from "react-router-dom";
import {FaGithubSquare} from "react-icons/all";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <a href="https://github.com/BastianHarttung/Happy-End-Movies"
               target="_blank"
               className={classes.iconContainer}>
                <FaGithubSquare/>
            </a>
            <div>
                <Link className={classes.link} to="/impressum">Impressum</Link>
                <Link className={classes.link} to="/hilfe">Hilfe</Link>
            </div>
        </footer>
    )
}

export default Footer
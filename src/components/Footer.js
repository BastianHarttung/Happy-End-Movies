import classes from "./Footer.module.css";
import {Link} from "react-router-dom";

const Footer = (props) => {
    return (
        <footer className={classes.footer}>
            <Link className={classes.link} to="/impressum">Impressum</Link>
        </footer>
    )
}

export default Footer
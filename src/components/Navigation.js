import {Link} from "react-router-dom";
import "./Navigation.module.css"

const Navigation = (props) => {
    return (
        <nav>
            <Link className={"link"} to = '/'>Hauptmenü</Link>
            <Link to = '/bewertung'>Bewertung</Link>
        </nav>
    )
}

export default Navigation
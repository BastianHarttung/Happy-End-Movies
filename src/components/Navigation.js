import {Link} from "react-router-dom";
import "./Navigation.module.css"

const Navigation = (props) => {
    return (
        <nav>
            <Link to = '/bewertung'>Filmsuche</Link>
            <Link to = '/showroom'>Showroom</Link>
        </nav>
    )
}

export default Navigation
import {Link} from "react-router-dom";
import "./Navigation.module.css"

const Navigation = (props) => {
    return (
        <nav>
            <Link to = '/filmsuche'>Filmsuche</Link>
            <Link to = '/showroom'>Showroom</Link>
        </nav>
    )
}

export default Navigation
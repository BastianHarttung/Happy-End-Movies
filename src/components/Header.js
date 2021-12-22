import Navigation from "./Navigation";
import {FaFilm} from "react-icons/all";
import  "./Header.module.css";
import {Link} from "react-router-dom";


const Header = (props) => {
    return (
        <header className="header">
            <Link className={"link"} to = '/'>
                <FaFilm style={ {color: 'white',width: "50px", height: "50px"}}/>
            </Link>
            <Navigation></Navigation>
        </header>
    )
}

export default Header
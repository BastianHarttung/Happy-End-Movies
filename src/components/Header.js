import Navigation from "./Navigation";
import {FaFilm} from "react-icons/all";
import  "./Header.module.css";


const Header = (props) => {
    return (
        <header className="header">
            <FaFilm style={ {color: 'white',width: "50px", height: "50px"}}/>
            <Navigation></Navigation>
        </header>
    )
}

export default Header
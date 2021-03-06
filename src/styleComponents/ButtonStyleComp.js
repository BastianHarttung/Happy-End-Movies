import {useState} from "react";

export const Button = ({name, fontSize, activated, onClick}) => {

    const [hovered, setHovered] = useState(false)

    const hoveredBackground = () => {
        if (activated) return "var(--main-color)"
        if (hovered) return "var(--main-color)"
        else return "var(--main-color-bright)"
    }
    const hoveredFontColor = () => {
        if (activated) return "white"
        if (hovered) return "white"
        else return "black"
    }

    const btnStyle = {
        color: `${hoveredFontColor()}`,
        backgroundColor: `${hoveredBackground()}`,
        minWidth: "150px",
        fontSize: `${fontSize}rem`,
        border: "0px",
        borderRadius: "10px",
        transition: "all var(--hover-time-short) ease-in-out",
        cursor: "pointer",
        padding: "10px 20px",
        margin: "5px",
    };

    return (
        <button style={btnStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}>
            {name}
        </button>
    )

}
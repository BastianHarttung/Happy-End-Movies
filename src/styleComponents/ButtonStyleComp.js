import {useState} from "react";

export const Button = ({name, activated, onClick}) => {

    const [hovered, setHovered] = useState(false)

    const hoveredBackground = () => {
        if (activated) return "var(--main-color)"
        if (hovered) return "var(--main-color)"
        else return "var(--main-color-white)"
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
        fontSize: "18px",
        border: "0px",
        borderRadius: "10px",
        transition: "all var(--hover-time-short) ease-in-out",
        cursor: "pointer",
        padding: "10px 20px",
        margin: "10px",
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
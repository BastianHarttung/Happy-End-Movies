import {useState} from "react";

interface IButtonProps {
  name: string,
  fontSize?: number,
  activated?: boolean,
  onClick: () => void,
}

export const Button = ({name, fontSize, activated, onClick}: IButtonProps) => {

  const [hovered, setHovered] = useState<boolean>(false);

  const hoveredBackground = (): string => {
    if (activated) return "var(--main-color)";
    if (hovered) return "var(--main-color)";
    else return "var(--main-color-bright)";
  };
  const hoveredFontColor = (): string => {
    if (activated) return "white";
    if (hovered) return "white";
    else return "black";
  };

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
  );

};
import {useState} from "react";

interface IButtonProps {
  name: string,
  onClick: () => void,
  buttonStyle?: "first" | "second" | "third",
  fontSize?: number,
  activated?: boolean,
  className?: string,
  type?: "button" | "submit" | "reset" | undefined,
}

export const Button = (
  {
    name,
    onClick,
    buttonStyle = "first",
    fontSize = 1,
    activated,
    className,
    type = "button"
  }: IButtonProps) => {

  const [hovered, setHovered] = useState<boolean>(false);

  const backgroundColor = (): string => {
    if (buttonStyle === "third" || buttonStyle === "second") {
      return "transparent";
    } else {
      if (activated || hovered) return "var(--main-color)";
      else return "var(--main-color-bright)"
    }
  };
  const fontColor = (): string => {
    if (buttonStyle === "second" || buttonStyle === "third") {
      if (activated || hovered) return "var(--main-color-dark)";
      else return "var(--main-color)"
    } else {
      if (activated || hovered) return "white";
      else return "black"
    }
  };
  const border = (): string => {
    if (buttonStyle === "second") {
      if (activated || hovered) return "3px solid var(--main-color-dark)";
      else return "3px solid var(--main-color)"
    } else {
      return "0"
    }
  };


  const btnStyle = {
    color: `${fontColor()}`,
    backgroundColor: `${backgroundColor()}`,
    minWidth: "100px",
    fontSize: `${fontSize}rem`,
    fontWeight: `${buttonStyle === "second" ? "700" : "500"}`,
    textDecoration: `${(buttonStyle === "third") ? "underline" : "none"}`,
    border: `${border()}`,
    borderRadius: "10px",
    transition: "all var(--hover-time-short) ease-in-out",
    cursor: "pointer",
    padding: `${buttonStyle === "third" ? "5px" : "10px 20px"}`,
    margin: "5px",
  };

  return (
    <button type={type}
            style={btnStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className={className}>
      {name}
    </button>
  );

};
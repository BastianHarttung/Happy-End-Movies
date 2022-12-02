import classes from "./button.module.scss"
import {CSSProperties} from "react";

interface IButtonProps {
  name: string,
  onClick: () => void,
  buttonStyle?: "primary" | "secondary" | "third",
  activated?: boolean,
  disabled?: boolean,
  style?: CSSProperties,
  className?: string,
  type?: "button" | "submit" | "reset" | undefined,
}

export const Button = (
  {
    name,
    onClick,
    buttonStyle = "primary",
    activated,
    disabled,
    className,
    type = "button",
    ...restProps
  }: IButtonProps) => {

  const buttonClasses = `${classes.button} 
                         ${!!buttonStyle ? classes[buttonStyle] : classes.primary} 
                         ${className ? className : ""} 
                         ${activated ? classes.activated : ""}
                         ${disabled ? classes.disabled : ""}`

  return (
    <button type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...restProps}
    >
      {name}
    </button>
  );

};
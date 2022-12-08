import classes from "./input-string.module.scss";
import React, {CSSProperties} from "react";

interface IInputStringProps {
  changeInput: (value: string) => void;
  value: string;
  showError: boolean;
  isDirty: boolean;
  handleBlur: () => void;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  type?: string;
  style?: CSSProperties;
  icon?: string;
}

const InputString = ({
                       changeInput,
                       value,
                       showError,
                       isDirty,
                       handleBlur,
                       label,
                       placeholder,
                       initialValue = "",
                       type = "text",
                       style,
                       icon,
                       ...restProps
                     }: IInputStringProps) => {

  const containerClasses = `
    ${classes.inputContainer} 
    ${showError ? classes.invalid : ""} 
    ${(!!initialValue ?? isDirty) ? classes.dirty : ""}`;


  return (
    <div className={containerClasses}>
      {!!label && <label htmlFor={label}>{label}:</label>}
      <input
        id={!!label ? label : "input"}
        type={type}
        placeholder={showError ? `Bitte korrekt ausfüllen.` : placeholder}
        value={value}
        onChange={(event) => changeInput(event.target.value)}
        onBlur={handleBlur}
        style={style}
        {...restProps}
      />
      {icon && <img src={icon} alt="Name"/>}
    </div>
  );
};

export default InputString;

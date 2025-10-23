import classes from "./input-string.module.scss";
import React, { CSSProperties, useId } from "react";


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

export const InputString = ({
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
  const inputId = useId();

  const containerClasses = `
    ${classes.inputContainer} 
    ${showError ? classes.invalid : ""} 
    ${(!!initialValue || isDirty) ? classes.dirty : ""}`;


  return (
    <div className={containerClasses}>
      {!!label && <label htmlFor={label}>{label}:</label>}
      <input
        id={inputId}
        type={type}
        placeholder={showError ? `Bitte korrekt ausfüllen.` : placeholder}
        value={value}
        onChange={(event) => changeInput(event.target.value)}
        onBlur={handleBlur}
        style={style}
        {...restProps}
      />
      {icon && <img src={icon} alt="Name" />}
    </div>
  );
};

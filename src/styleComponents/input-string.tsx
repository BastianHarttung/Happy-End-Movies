import classes from "./input-string.module.scss";
import useInput from "../hooks/useInput";
import React, {useEffect} from "react";

interface IInputStringProps {
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  type?: string;
}

const InputString = ({
                       onChange,
                       label = "",
                       placeholder = "",
                       initialValue = "",
                       type = "text",
                       ...restProps
                     }: IInputStringProps) => {
  const {value, showError, changeValue, handleBlur, isDirty} = useInput(
    (value: string) => !!value.trim(),
    initialValue
  );

  const containerClasses = `
    ${classes.inputContainer} 
    ${showError ? classes.invalid : ""} 
    ${(!!initialValue ?? isDirty) ? classes.dirty : ""}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(event);
    onChange(event.target.value);
  };

  useEffect(() => {
    changeValue({target: {value: `${initialValue}`}} as React.ChangeEvent<HTMLInputElement>);
  }, []);

  return (
    <div className={containerClasses}>
      {!!label && <label htmlFor={label}>{label}:</label>}
      <input
        id={!!label ? label : "input"}
        type={type}
        placeholder={showError ? `Please fill in ${label ? label : placeholder ? placeholder : "correct"}.` : placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...restProps}
      />
    </div>
  );
};

export default InputString;

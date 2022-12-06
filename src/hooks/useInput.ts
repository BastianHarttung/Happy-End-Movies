import {useState} from "react";

const useInput = (validateFn: (value: string) => boolean, initialValue: string) => {

  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFn(value);
  const showError = !isValid && isTouched;
  const isDirty = value !== initialValue;

  const changeValue = (value: string) => {
    setValue(value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    showError,
    isDirty,
    changeValue,
    handleBlur,
    reset,
  };

};

export default useInput;
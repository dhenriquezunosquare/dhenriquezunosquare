import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

export function replaceCamelWithSpaces(colorName) {
  if (colorName) {
    return colorName.replace(/\B([A-Z])\B/g, " $1");
  }
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [textButtonColor, setTextButtonColor] = useState("MidnightBlue");
  const [checkBox, setCheckBox] = useState(false);

  const [auxColor, setAuxColor] = useState("MediumVioletRed");

  const changeColor = () => {
    console.log(buttonColor);
    if (buttonColor === "MediumVioletRed") {
      setButtonColor("MidnightBlue");
      setAuxColor("MidnightBlue");
      setTextButtonColor("MediumVioletRed");
      console.log(buttonColor);
    } else {
      setButtonColor("MediumVioletRed");
      setAuxColor("MediumVioletRed");
      setTextButtonColor("MidnightBlue");
    }
  };

  const checkButton = (e) => {
    setCheckBox(e.target.checked);
    if (e.target.checked) {
      return setButtonColor("gray");
    }
    setButtonColor(auxColor);
  };

  return (
    <div className="App App-header">
      <button
        disabled={checkBox}
        onClick={changeColor}
        style={{ backgroundColor: buttonColor }}
      >
        Change to {textButtonColor}
      </button>
      <br />
      <input onClick={checkButton} value={checkBox} type="checkbox" /> Disable
      button
    </div>
  );
}

export default App;

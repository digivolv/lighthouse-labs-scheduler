import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  ///////++OLD METHOD++//////
  // let buttonClass = "button";
  // if (props.confirm) {
  //   buttonClass += " button--confirm";
  // }
  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      // className={buttonClass}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}

import React, { useState } from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";



export default function InterviewerListItem(props) {
  
  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
 }
    );

  return (
    <li
    className={interviewerItemClass}
      onClick={props.onChange}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* {props.selected ? props.name : null}  */}
      {props.selected && props.name}
    </li>
  );
  
}

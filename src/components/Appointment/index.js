import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import classNames from "classnames";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.time ? "Appointment at " + props.time : "No Appointments"} */}
      {props.interview ? (
        <Show student={props.student} interviewer={props.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}

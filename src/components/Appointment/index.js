import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode.js";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function onDelete(id) {
    transition(CONFIRM);
    props.cancelInterview(id).then((data) => {});
    // transition(EMPTY);
  }

  /*
User clicks delete icon
Transition to CONFIRM
if (cancel) 
>> Back to SHOW
if (confirm)
>> Transition to SAVING
>> API call to delete in database
>> Update the state 
>>Transition to EMPTY
*/

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.time ? "Appointment at " + props.time : "No Appointments"} */}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          onDelete={() => onDelete(props.id)}
          student={props.interview && props.interview.student}
          interviewer={(props.interview && props.interview.interviewer) || {}}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onDelete}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={() => {
            transition(EMPTY);
          }}
        />
      )}

      {mode === DELETING && <Status message={"DELETING"} />}
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )} */}
    </article>
  );
}

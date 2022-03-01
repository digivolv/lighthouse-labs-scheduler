import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode.js";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  function onDelete(id) {
    transition(CONFIRM);
    // props.cancelInterview(id);
    // transition(EMPTY);
  }

  function onConfirm(id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  function onEdit(id) {
    transition(EDIT);
  }
  /*
User clicks delete icon
Transition to CONFIRM
if (cancel) 
>> Back to SHOW
if (confirm)
>> Transition to DELETING
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
          onEdit={() => onEdit(props.id)}
          onDelete={() => onDelete(props.id)}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onDelete}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={() => {
            onConfirm(props.id);
          }}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error onClick={back} message={"Could not save."} />
      )}
      {mode === ERROR_DELETE && (
        <Error onClick={back} message={"Could not delete."} />
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

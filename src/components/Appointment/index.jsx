import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR SAVE";





const Appointment = function (props) {
    const { id, interviewers } = props

    console.log('apt', props)

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
        const interview = {
            student: name,
            interviewer
        }
        transition(SAVING);
        props.bookInterview(id, interview)
            .then(() => transition(SHOW))
            .catch(()=> {
                transition(ERROR_SAVE)
            })
    }

    const deleteInterview = () => {
        transition(DELETING);
        props.cancelInterview(id)
            .then(() => {
                transition(EMPTY);

            })
    }




    return (
        <article className="appointment">

            <Header time={props.time} />
            {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} 
            onDelete={()=> transition(CONFIRMING)}
            onEdit={()=> transition(EDIT)} />}
            {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
            {mode === CREATE && <Form onCancel={back} onSave={save} />}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
            {mode === CONFIRMING && <Confirm onConfirm={deleteInterview} onCancel={back}/>}
            {mode === EDIT && <Form interviewers={interviewers} onCancel={()=> back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer}/>}
            {mode === ERROR_SAVE && <Status message="Deleting" />}


        </article>
    );
}

export default Appointment;
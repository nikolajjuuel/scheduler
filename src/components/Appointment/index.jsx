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
const ERROR_DELETE = "ERROR DELETE";


const Appointment = function (props) {
    const { id } = props
    console.log('appointment', props);

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
            .catch(()=> { //cannot read undefined
                transition(ERROR_SAVE, true)
            })
    }

    const deleteInterview = () => {
        transition(DELETING);
        props.cancelInterview(id)
            .then(() => {
                transition(EMPTY);
            })
            .catch(()=>{
                transition(ERROR_DELETE, true)
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
            {mode === EDIT && <Form interviewers={props.interviewers} onCancel={()=> back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id}/>}
            {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
            {mode === ERROR_DELETE && <Error message="Could not save appointment." onClose={back} />}


        </article>
    );
}

export default Appointment;
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"



const Appointment = function (props) {
    const {id, interviewers} = props

    console.log('apt', props)

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
//        event.preventDefault()

        const interview = {
          student: name,
          interviewer
        }
        // console.log('bookId' ,id)
        // console.log('interviewId' ,interview)

        props.bookInterview(id, interview) 
        .then(() => transition(SHOW))
        
      }




    return (
        <article className="appointment">

            <Header time={props.time} />
            {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />}
            {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
            {mode === CREATE && <Form  onCancel={ back}  onSave={ save} />}
        </article>
    );
}

export default Appointment;
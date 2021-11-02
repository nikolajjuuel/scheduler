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
const SAVING = "SAVING"



const Appointment = function (props) {
    const {id, bookInterview, interview} = props

    const { mode, transition, back } = useVisualMode(
        interview ? SHOW : EMPTY
    );

    const save = (name, interviewer) => {
        const interview = {
          student: name,
          interviewer
        }
        bookInterview(id, interview);

      }




    return (
        <article className="appointment">

            <Header time={props.time} />
            {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} />}
            {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
            {mode === CREATE && <Form onCancel={() => { back() }} onSave={save} />}
        </article>
    );
}

export default Appointment;
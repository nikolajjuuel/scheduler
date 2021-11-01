import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";



const Appointment= function (props) {

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );


    return (
        <article className="appointment">

            <Header time={props.time} />
            {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> }
            {mode === EMPTY && <Empty />}
        </article>
    );
}

export default Appointment; 
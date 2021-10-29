import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

const Appointment= function (props) {


    return (
        <article className="appointment">
            <Header time={props.time} />
            {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> }
            {!props.interview && <Empty />}
        </article>
    );
}

export default Appointment; 
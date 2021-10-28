import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
    let showProps = {}

    return (
        <article className="appointment">
            <Header time={props.time} />
            {props.interview ? <Show {...showProps} /> : <Empty />}
        </article>
    );
}


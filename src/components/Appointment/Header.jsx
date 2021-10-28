import React from "react";
import Appointment from "components/Appointment";

export default function header(props) {

    return (
        <header className="appointment__time">
            <h4 className="text--semi-bold">{props.time}</h4>
            <hr className="appointment__separator" />
        </header>
        
    );
}


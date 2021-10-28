import React from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";

export default function error(props) {

    return (
        <main className="appointment__card appointment__card--error">
            <section className="appointment__error-message">
                <h1 className="text--semi-bold">Error</h1>
                <h3 className="text--light">{props.messaage}</h3>
            </section>
            <img
                className="appointment__error-close"
                src="images/close.png"
                alt="Close"
                onClick={props.onClose}
            />
        </main>
    );
}
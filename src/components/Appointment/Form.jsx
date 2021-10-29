//import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';


const Form = function (props) {
    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const reset = () => {
        setStudent('');
        setInterviewer('');
    }

    const cancel = () => {
        reset();
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={student}
                        onChange={(event) => setStudent(event.target.value, reset())}

                    />
                </form>
                <InterviewerList
                    onChange={setInterviewer}
                    interviewers={props.interviewers}
                    value={interviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={props.onSave}> Save</Button>
                </section>
            </section>
        </main>
    );
}

export default Form;


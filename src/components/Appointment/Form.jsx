//import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

const Form = function (props) {
    const [error, setError] = useState("");

    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const reset = () => {
        setStudent('');
        setInterviewer('');
    }

    const cancel = () => {
        reset();
    }



    function validate() {
        if (student === "") {
            setError("Student name cannot be blank");
            return;
        }

        props.onSave(student, interviewer);
    }

    // console.log('studenFORM',student);
    // console.log('interviwerForm',interviewer);


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
                        onChange={(event) => setStudent(event.target.value, cancel())}
                        data-testid="student-name-input"


                    />
                    <section className="appointment__validation">{error}</section>

                </form>
                <InterviewerList
                    onChange={setInterviewer}
                    interviewers={props.interviewers}
                    value={interviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={props.onCancel}>Cancel</Button>
                    <Button confirm onClick={validate}> Save</Button>
                </section>
            </section>
        </main>
    );
}

export default Form;


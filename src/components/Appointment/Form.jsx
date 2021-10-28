import React from "react";
import Appointment from "components/Appointment";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Appointment/styles.scss";
import React, { useState } from 'react';


export default function form(props) {

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                    /*
                      This must be a controlled component
                      your code goes here
                    */
                    />
                </form>
                <InterviewerList
                /* your code goes here */
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={props.onCancel}>Cancel</Button>
                    <Button confirm onClick={props.onSave}> Save</Button>
                </section>
            </section>
        </main>
    );
}



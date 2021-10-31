import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";
const axios = require('axios').default;



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });



  useEffect(() => {
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);


    const promises = [daysPromise, appointmentsPromise, interviewersPromise];

    Promise.all(promises)
    .then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      console.log(interviewers);
      setState(prev => ({ ...prev, days, appointments, interviewers }));

    })
  }, [])





  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />


        <nav className="sidebar__menu"></nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          )
        }

        )}



      </section>
    </main>
  );
}

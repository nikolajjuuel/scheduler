import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interview = getInterview(state, state.interviewers)
  const dailyInterviews = getInterviewersForDay(state, state.day)


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
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);

          const appointmentProps = {
            appointment,
            interview,
            dailyInterviews,
            bookInterview,
            cancelInterview

          }

          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              {...appointmentProps}
            />
          )
        }
        )}

      </section>
    </main>
  );
}

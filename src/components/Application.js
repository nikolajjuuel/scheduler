import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //change API objects into arrays in order to itterate with filter and map
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const allInterviewers = getInterviewersForDay(state, state.day);

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
        {/* sends most updated state to the appointments with props */}
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);

          const appointmentProps = {
            appointment,
            interview,
            allInterviewers,
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

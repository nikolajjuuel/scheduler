import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
const axios = require('axios').default;



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interview = getInterview(state, state.interviewers)
  const dailyInterviews = getInterviewersForDay(state, state.day)

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
        setState(prev => ({ ...prev, days, appointments, interviewers }));

      })
  }, [])


  const bookInterview = function (id, interview) {



    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };



    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {

        const days = updateSpots(state, appointments)

        setState(() =>
        ({
          ...state,
          days,
          appointments: {
            ...state.appointments,
            ...state.appointments[id] = appointment
          }
        }))
      })
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const days = updateSpots(state, appointments)
        setState({
          ...state,
          days,
          appointments
        });
      })
  }

  const updateSpots = function (state, appointments, id) {
    const day = state.days.find(d => d.name === state.day);
    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = { ...day, spots };
    const newNewDays = state.days.map((d) => d.name === state.day ? newDay : d)
    return newNewDays;
  }



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
              {...appointmentProps}


            />
          )
        }

        )}



      </section>
    </main>
  );
}

import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors";
const axios = require('axios').default;



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);







  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState({ ...state, days });

  


const baseURL = 'http://localhost:8001/api';


  useEffect(() => {
    const daysPromise = axios.get(`${baseURL}/days`);
    const appointmentsPromise = axios.get(`${baseURL}/appointments`);
    const interviewersPromise = axios.get(`${baseURL}/interviewers`);;

    const promises = [daysPromise, appointmentsPromise, interviewersPromise];

    Promise.all(promises)
    .then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      console.log(appointments);
      setState(prev => ({ ...prev, days, appointments }));

    })




    // axios.get(`${baseURL}/days`)
    //   .then(function (response) {
    //     const days = response.data;
    //     setState(prev => ({ ...prev, days }));
    //   })

    // axios.get(`${baseURL}/appointments`)
    //   .then(function (response) {

    //     console.log('request', response.data);

    //   })




  }, [])


  // const appointments = [
  //   {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer: {
  //         id: 3,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       }
  //     }
  //   },
  //   {
  //     id: 3,
  //     time: "2pm",
  //   },
  //   {
  //     id: 4,
  //     time: "3pm",
  //     interview: {
  //       student: "Archie Andrews",
  //       interviewer: {
  //         id: 4,
  //         name: "Cohana Roy",
  //         avatar: "https://i.imgur.com/FK8V841.jpg",
  //       }
  //     }
  //   },
  //   {
  //     id: 5,
  //     time: "4pm",
  //   }
  // ];




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

        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {dailyAppointments.map(appointment => {
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

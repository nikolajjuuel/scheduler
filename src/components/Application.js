import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
const axios = require('axios').default;



export default function Application(props) {
  const [day, setDay] = useState('Monday')
  const [days, setDays] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(function (response) {

        console.log('request', response.data);

        setDays(response.data);

      })

    axios.get('http://localhost:8001/api/appointments')
      .then(function (response) {

        console.log('request', response.data);

      })

  }, [])


  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 3,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Archie Andrews",
        interviewer: {
          id: 4,
          name: "Cohana Roy",
          avatar: "https://i.imgur.com/FK8V841.jpg",
        }
      }
    },
    {
      id: 5,
      time: "4pm",
    }
  ];




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
          days={days}
          value={day}
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
        {appointments.map((item) => {
          return (
            <Appointment
              key={item.id}
              {...item}
            />
          )
        }

        )}



      </section>
    </main>
  );
}

import React, { useState } from "react";

import "components/Application.scss";
//import Button from "./Button";
//import DayListItem from "./DayListItem";
import DayList from "./DayList";


export default function Application(props) {

  const [day, setDay] = useState('Monday')

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
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
          day={"Monday"}
          setDay={day => console.log(day)}
        />


        <nav className="sidebar__menu"></nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

        {/* <Button children='Base' />
        <Button confirm children='Confirm' />
        <Button danger children='Danger' />
        <Button disabled children='Disabled' />
        <Button clickable children='Clickable' /> */}
      </section>
      <section className="schedule">

        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}



      </section>
    </main>
  );
}

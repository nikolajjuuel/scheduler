import React from "react";

import "components/Application.scss";
import Button from "./Button";
import DayListItem from "./DayListItem";

export default function Application(props) {
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
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
        {/* <DayListItem name="Monday" spots={5} />
        <DayListItem name="Monday" spots={5} selected />
        <DayListItem name="Monday" spots={0} full/>
        <DayListItem name="Tuesday" spots={5} /> */}

        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}



      </section>
    </main>
  );
}

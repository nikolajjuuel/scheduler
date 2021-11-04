import React, { useState, useEffect } from "react";
const axios = require('axios').default;

//sets states on render
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  console.log(state);

  const setDay = day => setState({ ...state, day });


  //fetching data from API end points
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

        //keeps existing interview data and adds new appointment
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
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({
          ...state,
          days,
          appointments,
        });
      })
  }

  //changes spots remaing on Days sidebar
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

  return {
    state,
    setDay,
    cancelInterview,
    bookInterview
  }
}

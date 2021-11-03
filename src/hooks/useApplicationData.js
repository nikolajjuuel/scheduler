import React, { useState, useEffect } from "react";
const axios = require('axios').default;

 
 const useApplicationData = function(){

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {},
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
      return axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
  
          setState(() =>
          ({
            ...state,
            appointments: {
              ...state.appointments,
              ...state.appointments[id] = appointment
            }
          }))
        }).catch((err) => console.log(err));
    }
  
    const cancelInterview = (id, interview) =>{
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      return axios.delete(`/api/appointments/${id}`, {interview}) 
        .then((res) => {
          const days = updateSpots(state, appointments)
          setState({
          ...state,
          days,
          appointments
        });
      })
    }
  
    const updateSpots = function (state, appointments, id){
      const day = state.days.find(d => d.name === state.day);
      let spots = 0;
  
      for (const id of day.appointments){
        const appointment = appointments[id];
  
        if(!appointment.interview){
          spots++;
        }
      }
      
      const newDay = {...day, spots};
      const newNewDays = state.days.map((d) => d.name === state.day ? newDay: d)
      return newNewDays;
    }


}


export default useApplicationData;
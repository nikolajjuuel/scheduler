//filters state data  

export function getAppointmentsForDay(state, day) {
    const allAppointments = []
    const days = state.days.filter(info => info.name === day);

    if (days.length < 1) return [];

    const appointments = days[0].appointments;
    for (let i = 0; i < appointments.length; i++) {
        allAppointments.push(state.appointments[appointments[i]]);
    }

    return allAppointments;
}


export function getInterview(state, interview) {
    if (interview === null) return null;

    const id = interview.interviewer;
    const interviewer = state.interviewers[id]
    return {...interview, interviewer};
}


export function getInterviewersForDay(state, day) {
    const allInterviewers = [];
    const days = state.days.find(info => info.name === day);
    
    if (!days) return [];

    for (const id of days.interviewers) {
      const appointment = state.interviewers[id];
      allInterviewers.push(appointment);
    }
    return allInterviewers; 
  }



export default { getAppointmentsForDay, getInterview, getInterviewersForDay }

export function getAppointmentsForDay(state, day) {
    const allAppointments = []
    const days = state.days.filter(info => info.name === day);

    if (days.length === 0) {
        return [];
    }

    const appointments = days[0].appointments;
    for (let i = 0; i < appointments.length; i++) {
        allAppointments.push(state.appointments[appointments[i]]);
    }

    return allAppointments;
}


export function getInterview(state, interview) {
    if (interview === null){
        return null;
        }
        
    interview.interviewer = state.interviewers[interview.interviewer];
    return interview;
}


export function getInterviewersForDay(state, day) {
    const allAppointments = []
    const days = state.days.filter(info => info.name === day);

    if (days.length === 0) {
        return [];
    }

    const appointments = days[0].appointments;
    for (let i = 0; i < appointments.length; i++) {
        allAppointments.push(state.appointments[appointments[i]]);
    }

    return allAppointments;
}



export default { getAppointmentsForDay, getInterview, getInterviewersForDay }

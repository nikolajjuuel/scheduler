function selectUserByName(state, name) {
    const filteredNames = state.users.filter(user => user.name === name);
    return filteredNames;
  }










const getAppointmentsForDay = (state, day) => {
    const stateday = state.days.filter(days => days.name === name)
    return stateday;
}


const [day, setDay] = useState([])



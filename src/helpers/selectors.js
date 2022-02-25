export default function getAppointmentsForDay(state, day) {
  // state.days.id = states.appointments.[index].id

  const foundDay = state.days.filter((dayItem) => dayItem.name === day);

  //if array is not empty
  if (foundDay.length) {
    //filter returns an array so we access index 0
    const foundDayAppts = foundDay[0].appointments;

    const appointments = foundDayAppts.map((appointmentId) => {
      return state.appointments[appointmentId];
    });

    return appointments;
  }
  return [];
}

//gets student name and interviewer id pair for a specific appointment
function getInterview(state, interview) {
  const result = {};
  if (interview === null) {
    return null;
  }
  if (interview.interviewer) {
    result.interviewer = state.interviewers[interview.interviewer];
  }
  result.student = interview.student;
  return result;
}

//gets the appointments for a specific day
function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const foundDay = state.days.find((d) => d.name === day);
  if (!foundDay) {
    return [];
  }

  const result = foundDay.appointments.map(
    (appointmentID) => state.appointments[appointmentID]
  );
  return result;
}

//get the interviewers for a specific day
function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const foundDay = state.days.find((d) => d.name === day);
  if (!foundDay) {
    return [];
  }

  const result = foundDay.interviewers.map(
    (interviewerID) => state.interviewers[interviewerID]
  );
  return result;
}

export { getInterview, getAppointmentsForDay, getInterviewersForDay };

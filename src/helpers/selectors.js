function getInterview(state, interview) {
  const result = {};
  if (interview === null) {
    return null;
  }
  if (interview.interviewer) {
    result.interviewer = state.interviewers[interview.interviewer];
    // console.log(interview.interviewer);
    // console.log("result", result);
  }
  result.student = interview.student;
  return result;
}

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

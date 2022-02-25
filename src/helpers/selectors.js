export function getInterview(state, interview) {
  const result = {};
  if (interview === null) {
    return null;
  }
  if (interview.interviewer) {
    result.interviewer = state.interviewers[interview.interviewer];
    result.student = interview.student;
    // console.log(interview.interviewer);
    // console.log("result", result);
    return result;
  }
}

export default function getAppointmentsForDay(state, day) {
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

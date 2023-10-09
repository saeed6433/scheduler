export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) {
    return [];
  }
const appointments = selectedDay.appointments.map((apptId) => state.appointments[apptId]);
return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);
  if (!selectedDay) {
    return [];
  }

  const interviewers = selectedDay.interviewers.map(
    (intId) => state.interviewers[intId]
  );

  return interviewers;
}
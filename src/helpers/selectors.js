// Function to get the appointments for a specific day from the application state
export function getAppointmentsForDay(state, day) {
  // Find the day object that matches the provided day name
  const selectedDay = state.days.find((d) => d.name === day);
  
  // If the day is not found, return an empty array
  if (!selectedDay) {
    return [];
  }
  
  // Map the appointment IDs to their corresponding appointment objects
  const appointments = selectedDay.appointments.map((apptId) => state.appointments[apptId]);
  
  return appointments;
}

// Function to get the interview details from the application state
export function getInterview(state, interview) {
  // If the interview is null (no interview), return null
  if (!interview) {
    return null;
  }
  
  // Return an object with student and interviewer details
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

// Function to get the interviewers available for a specific day from the application state
export function getInterviewersForDay(state, day) {
  // Find the day object that matches the provided day name
  const selectedDay = state.days.find((d) => d.name === day);
  
  // If the day is not found, return an empty array
  if (!selectedDay) {
    return [];
  }
  
  // Map the interviewer IDs to their corresponding interviewer objects
  const interviewers = selectedDay.interviewers.map(
    (intId) => state.interviewers[intId]
  );

  return interviewers;
}

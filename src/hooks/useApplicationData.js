import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Initialize state with default values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Function to set the currently selected day
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        // Fetch days, appointments, and interviewers in parallel
        const [days, appointments, interviewers] = await Promise.all([
          axios.get("/api/days"),
          axios.get("/api/appointments"),
          axios.get("/api/interviewers")
        ]);

        // Update the state with the fetched data
        setState((prevState) => ({
          ...prevState,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Function to update the available spots for a specific day
  const updateSpots = (dayName, days, appointments) => {
    return days.map((day) => {
      if (day.name === dayName) {
        return {
          ...day,
          spots: day.appointments.filter((id) => !appointments[id].interview)
            .length
        };
      }
      return day;
    });
  };

  // Function to book an interview for a specific appointment slot
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    // Send a PUT request to the server to book the interview
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState((prevState) => ({ ...prevState, appointments, days })));
  };

  // Function to cancel an existing interview for a specific appointment slot
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    // Send a DELETE request to the server to cancel the interview
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState((prevState) => ({ ...prevState, appointments, days })));
  };

  // Return the state and functions as an object for use in components
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

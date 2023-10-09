import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [days, appointments, interviewers] = await Promise.all([
          axios.get("/api/days"),
          axios.get("/api/appointments"),
          axios.get("/api/interviewers")
        ]);
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

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState((prevState) => ({ ...prevState, appointments, days })));
  };

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState((prevState) => ({ ...prevState, appointments, days })));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

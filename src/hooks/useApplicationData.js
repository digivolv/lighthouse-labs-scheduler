import { useState, useEffect } from "react";
import axios from "axios";
// import { getAppointmentsForDay } from "../helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    console.log("bookInterview-interview-spots ", id, interview);

    const oldAppointment = state.appointments[id].interview;
    console.log("oldAppointment", oldAppointment);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("newAppointment", oldAppointment);

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        if (!oldAppointment) {
          day.spots--;
        }
      }
      return day;
    });
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  function cancelInterview(id) {
    // console.log("cancelInterview INVOKED");
    const oldAppointment = state.appointments[id].interview;
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        if (oldAppointment) {
          day.spots++;
        }
      }
      return day;
    });
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  const daysURL = `http://localhost:8001/api/days`;
  const appointmentsURL = `http://localhost:8001/api/appointments`;
  const interviewersURL = `http://localhost:8001/api/interviewers`;

  useEffect(() => {
    //get days data
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      // console.log(all[0].data);
      // console.log(all[1].data);
      // console.log(all[2].data);
      //NO longer need setDays because the days is being set here using setState
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));

      const [first, second, third] = all;

      // console.log("FREAK", first, second, third);
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

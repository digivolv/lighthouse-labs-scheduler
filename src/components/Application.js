import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment/";
import "components/Application.scss";
// import getAppointmentsForDay from "helpers/selectors.js";
import { getInterview, getAppointmentsForDay } from "helpers/selectors.js";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // const setDay = (day) => setState({ ...state, day });
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const daysURL = `http://localhost:8001/api/days`;
  const appointmentsURL = `http://localhost:8001/api/appointments`;
  const interviewersURL = `http://localhost:8001/api/interviewers`;

  // axios.get(daysURL).
  // then((response) => {
  //   console.log(response.data);
  //   // setDays([...response.data]);
  //   return response.data;
  // }),

  useEffect(() => {
    //get days data
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      console.log(all[0].data);
      console.log(all[1].data);
      console.log(all[2].data);
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
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsParse = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}

        // time={appointment.time}
        // interviewer={appointment.interviewer}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsParse}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

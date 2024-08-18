import React, { useState, useEffect } from "react";
import axios from "axios";
// import './AllEvents.css'
import '../assets/css/AllEvents.css'
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Eventsmain() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getEvents() {
      axios.get("http://localhost:8080/api/event/")
        .then((res) => {
          console.log(res.data);
          setEvents(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getEvents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.ename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.edate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.hallType && event.hallType.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (event.contactNo && event.contactNo.toLowerCase().includes(searchTerm.toLowerCase())) 
    );
  });

  return (
    <>
    <Header/>
    <div className="container">
      <div className="box"/>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h1 className="events-heading">All Events</h1>
      <div className="events-container">
        {filteredEvents.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.ename}</h3>
            <p>Event Name: {event.ename}</p>
            <p>Date: {event.edate}</p>
            <p>Start Time: {event.stime}</p>
            <p>End Time: {event.etime}</p>
            <p>Availability: {event.available ? "Yes" : "No"}</p>
            <p>Hall Type: {event.hallType}</p> 
            <p>Contact Number: {event.contactNo}</p>
            <p>Description: {event.descrip}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
  </>
  );
}

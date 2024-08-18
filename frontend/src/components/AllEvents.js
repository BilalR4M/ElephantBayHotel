import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEventForm from "./EditEventForm";
import '../assets/css/AllEvents.css'


import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from "react-router-dom";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
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

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/event/delete/${id.trim()}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditClick = (id) => {
    setEditingEventId(id);
  };
  const formatTime = (time) => {
    
    const [hours, minutes] = time.split(":");
    
    
    const formattedTime = new Date();
    formattedTime.setHours(hours);
    formattedTime.setMinutes(minutes);

   
    return formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const handleUpdate = (updatedEventData) => {
    setEvents(events.map((event) => {
      if (event._id === updatedEventData._id) {
        return updatedEventData;
      }
      return event;
    }));
    setEditingEventId(null);
  };

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



  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const totalPagesExp = '{total_pages_count_string}';
    let pageHeight = doc.internal.pageSize.height;
    let y = 20; // Initial y position
  
    // Add heading
    doc.setFontSize(20);
    doc.text('All Events', 105, y, { align: 'center' });

    y += 10;
  
    // Generate table
    doc.autoTable({
      head: [['Event Name', 'Date', 'Start Time', 'End Time', 'Availability', 'Hall Type', 'Contact Number', 'Description']],
      body: filteredEvents.map(row => [row.ename, row.edate, row.stime, row.etime, row.available, row.hallType, row.contactNo, row.descrip]),
      startY: y + 10,
      theme: 'grid', // Add table styling
      didDrawPage: function(data) {
        // Footer
        let pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(190, pageHeight - 10, 'Page ' + doc.internal.getCurrentPageInfo().pageNumber + ' of ' + totalPagesExp);
      }
    });
  
    // Save the PDF
    doc.save('AllEvents.pdf');
  };


  return (
    <div className="container">
      <button onClick={handleGeneratePdf}>Genarate PDF</button>
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
      <div className="add-event-button-container">
        <Link to="/add-event" className="add-event-button">
          Add Event
        </Link>
      </div>
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
            <div className="button-group">
              {editingEventId === event._id ? (
                <EditEventForm event={event} onUpdate={handleUpdate} />
              ) : (
                <>
                  <button className="edit-button" onClick={() => handleEditClick(event._id)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteEvent(event._id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

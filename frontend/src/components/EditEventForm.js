import React, { useState } from "react";
import axios from "axios";

export default function EditEventForm({ event, onUpdate }) {
  const [formData, setFormData] = useState(event);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/event/updateEvent/${event._id}`, formData);
      onUpdate(formData);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input
          type="text"
          name="ename"
          value={formData.ename}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Event Date:
        <input
          type="date"
          name="edate"
          value={formData.edate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Start Time:
        <input
          type="time"
          name="stime"
          value={formData.stime}
          onChange={handleInputChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="time"
          name="etime"
          value={formData.etime}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Hall Type:
        <select
          name="hallType"
          value={formData.hallType}
          onChange={handleInputChange}
        >
          <option value="">Select hall type</option>
          <option value="banquet">Banquet</option>
          <option value="garden">Garden</option>
          <option value="wedding">Wedding</option>
        </select>
      </label>
      <label>
        Contact Number:
        <input
          type="text"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Availability:
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={() =>
            setFormData({ ...formData, available: !formData.available })
          }
        />
      </label>
      <label>
        Description:
        <textarea
          name="descrip"
          value={formData.descrip}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update Event</button>
    </form>
  );
}

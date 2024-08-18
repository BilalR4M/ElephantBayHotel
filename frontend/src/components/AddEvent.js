import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";


export default function AddEvent() {
    const [ename, setEventName] = useState("");
    const [edate, setDate] = useState(new Date());
    const [stime, setStartTime] = useState("");
    const [etime, setEndTime] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [available, setAvailable] = useState(false);
    const [descrip, setDescription] = useState("");
    const [hallType, setHallType] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [existingEvents, setExistingEvents] = useState([]);

    useEffect(() => {
        // Fetch existing events from the server
        axios.get("http://localhost:8080/api/event/")
            .then(response => {
                setExistingEvents(response.data);
            })
            .catch(error => {
                console.error("Error fetching existing events:", error);
            });
    }, []);

    function sendData(e) {
        e.preventDefault();

        // Validate contact number
        if (contactNo.length !== 10 || !/^\d+$/.test(contactNo)) {
            alert("Contact number must be 10 digits.");
            return;
        }

        // Validate capacity based on hall type
        let maxCapacity;
        switch (hallType) {
            case "banquet":
                maxCapacity = 150;
                break;
            case "wedding":
                maxCapacity = 200;
                break;
            case "garden":
                maxCapacity = 100;
                break;
            default:
                maxCapacity = Infinity; // No specific limit for other hall types
                break;
        }

        if (capacity > maxCapacity) {
            alert(`Capacity exceeds the limit for selected hall type (${maxCapacity}).`);
            return;
        }

        // Check for conflicts
       // Check for conflicts: Ensure both date AND hall type match for a conflict
    const formattedDate = edate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    const conflict = existingEvents.some(event =>
      event.edate === formattedDate && event.hallType === hallType
    );

    if (conflict) {
      alert("There is already an event scheduled in this hall on the selected date.");
      return;
    }

        const newEvent = {
            ename,
            edate: edate.toISOString().split('T')[0], // Convert date to string in YYYY-MM-DD format
            stime,
            etime,
            capacity,
            available,
            descrip,
            hallType,
            contactNo
        };

        axios.post("http://localhost:8080/api/event/addEvent", newEvent)
            .then(() => {
                alert("Event Added");

                setEventName("");
                setDate(new Date());
                setStartTime("");
                setEndTime("");
                setCapacity(0);
                setAvailable(false);
                setDescription("");
                setHallType("");
                setContactNo("");
            })
            .catch((err) => {
                alert("Failed to add event: " + err.message);
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="ename">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ename"
                        placeholder="Event Name"
                        value={ename}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="edate">Event Date</label>
                    <DatePicker
                        className="form-control"
                        selected={edate}
                        onChange={(date) => setDate(date)}
                        dateFormat="dd.MM.yyyy"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stime">Start Time</label>
                    <TimePicker
                        clearIcon={null}
                        onChange={(time) => setStartTime(time)}
                        value={stime}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="etime">End Time</label>
                    <TimePicker
                        clearIcon={null}
                        onChange={(time) => setEndTime(time)}
                        value={etime}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hallType">Hall Type</label>
                    <select
                        className="form-control"
                        value={hallType}
                        onChange={(e) => setHallType(e.target.value)}
                    >
                        <option value="">Select hall type</option>
                        <option value="banquet">Banquet</option>
                        <option value="garden">Garden</option>
                        <option value="wedding">Wedding</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="contactNo">Contact Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactNo"
                        placeholder="Contact Number"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="capacity"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(parseInt(e.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="available">Available</label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            id="checkbox"
                            checked={available}
                            onChange={() => setAvailable(!available)}
                        />
                        <label htmlFor="checkbox" className="checkbox-label">YES</label>
                        <span className="checkmark"></span>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="descrip">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descrip"
                        placeholder="Description"
                        value={descrip}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

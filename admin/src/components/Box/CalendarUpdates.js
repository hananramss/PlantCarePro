import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { baseUrl } from '../../utils/constant';
import '../../styles/components/Box/calendarUpdates.scss';

export const CalendarUpdates = () => {
    const [dateSelected, setDateSelected] = useState(new Date());
    const [wateringDates, setWateringDates] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/getAllMoistureLevel`);
            const responseData = res.data;
            const uniqueDates = new Set(responseData.map(doc => new Date(doc.timestamp).toISOString().split('T')[0]));
            setWateringDates(Array.from(uniqueDates));
        } catch (err) {
            console.error("Error fetching watering dates:", err);
        }
    };

    const handleDateClick = date => {
        // Adjust the selected date to match the database date
        const selectedDate = new Date(date);
        selectedDate.setDate(selectedDate.getDate() + 1); // Add 1 day to match the database date
    
        // Convert the adjusted date to a string in YYYY-MM-DD format
        const selectedDateString = selectedDate.toISOString().split('T')[0];
    
        // Toggle the presence of the selected date in the wateringDates array
        if (wateringDates.includes(selectedDateString)) {
            // If the date exists, remove it from the wateringDates array
            const updatedDates = wateringDates.filter(d => d !== selectedDateString);
            setWateringDates(updatedDates);
        } else {
            // If the date doesn't exist, add it to the wateringDates array
            setWateringDates([...wateringDates, selectedDateString]);
        }
    };
    
    const isWatered = date => {
        // Adjust the date to match the database date
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Add 1 day to match the database date
    
        // Convert the adjusted date to a string in YYYY-MM-DD format
        const adjustedDateString = adjustedDate.toISOString().split('T')[0];
    
        // Check if the adjusted date exists in the wateringDates array
        return wateringDates.includes(adjustedDateString);
    };

    return (
        <div className="calendar-updates">
            <h2>Plant Watering Calendar</h2>
            <p>Track your plant watering schedule effortlessly with our intuitive plant watering calendar.</p>
            <div className="calendar-container">
                <Calendar
                    onChange={setDateSelected}
                    value={dateSelected}
                    onClickDay={handleDateClick}
                    tileClassName={({ date }) => (isWatered(date) ? 'watered' : '')}
                />
            </div>
            <div className="table-container">
                <h2>Watering Dates</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wateringDates.map((date, index) => (
                            <tr key={index}>
                                <td>{date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

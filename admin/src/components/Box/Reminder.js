import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constant';

import '../../styles/components/Box/reminder.scss'

export const Reminder = () => {
    const [activity, setActivity] = useState('');
    const [plant, setPlant] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [savedReminder, setSavedReminder] = useState(null);
    const [setError] = useState('');

    // Function to handle form submission (Add)
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/api/saveReminder`, { activity, plant, frequency, dateTime, notificationMethod, additionalNotes })
            .then(res => {
                console.log('API Response:', res.data);
                setSavedReminder(res.data); // Save the reminder data to state
                setError(''); // Clear any previous error message
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Failed to save reminder. Please try again.'); // Set error message
            });
    };

    return (
        <div>
            <h2 style={{ marginBottom: '30px' }}>Reminder Setup Form</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <form onSubmit={handleSubmit} style={{ width: '70%', margin: '15px auto', backgroundColor: 'white', boxShadow: '0 2px 4px #ccc', padding: '50px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Type of Activity:</label>
                        <select value={activity} onChange={(e) => setActivity(e.target.value)} style={{ marginLeft: '22px',padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="">Select Activity</option>
                            <option value="Watering">Watering</option>
                            <option value="Fertilizing">Fertilizing</option>
                            <option value="Repotting">Repotting</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Plant Selection:</label>
                        <input type="text" value={plant} onChange={(e) => setPlant(e.target.value)} placeholder="Search for plant..." style={{ marginLeft: '23px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Frequency:</label>
                        <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Enter frequency..." style={{marginLeft: '49px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Date and Time:</label>
                        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} style={{ marginLeft: '26px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Notification Method:</label>
                        <select value={notificationMethod} onChange={(e) => setNotificationMethod(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="">Select Method</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                            <option value="In-App Notification">In-App Notification</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Additional Notes:</label>
                        <textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', marginTop: '10px' }} />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#4B6D52', color: '#fff', cursor: 'pointer' }}>Save Reminder</button>
                </form>

                <div style={{ width: '30%', margin: '15px auto', backgroundColor: 'white', boxShadow: '0 2px 4px #ccc', padding: '50px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Reminder Saved:</h2>
                    {savedReminder ? (
                        <>
                            <p style={{ marginBottom: '10px' }}>Type of Activity: <span style={{ fontWeight: 'bold' }}>{savedReminder.activity}</span></p>
                            <p style={{ marginBottom: '10px' }}>Plant: <span style={{ fontWeight: 'bold' }}>{savedReminder.plant}</span></p>
                            <p style={{ marginBottom: '10px' }}>Frequency: <span style={{ fontWeight: 'bold' }}>{savedReminder.frequency}</span></p>
                            <p style={{ marginBottom: '10px' }}>Date and Time: <span style={{ fontWeight: 'bold' }}>{savedReminder.dateTime}</span></p>
                            <p style={{ marginBottom: '10px' }}>Notification Method: <span style={{ fontWeight: 'bold' }}>{savedReminder.notificationMethod}</span></p>
                            <p style={{ marginBottom: '10px' }}>Additional Notes: <span style={{ fontWeight: 'bold' }}>{savedReminder.additionalNotes}</span></p>
                        </>
                    ) : (
                        <p>No reminder saved yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

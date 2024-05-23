import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch } from 'antd';
import { baseUrl } from '../../utils/constant';

export const WaterPumpBtn = () => {
    const [isPumpOn, setIsPumpOn] = useState(false);

    useEffect(() => {
        // Fetch initial pump state from the database
        axios.get(`${baseUrl}/api/getAllControlRelay`)
            .then(response => {
                setIsPumpOn(response.data.isPumpOn);
                console.log(setIsPumpOn)
            })
            .catch(error => {
                console.error('Error fetching water pump state:', error);
            });
    }, []);


    const toggleWaterPump = () => {
        const newPumpState = !isPumpOn;

        // Send updated pump state to the backend
        axios.post(`${baseUrl}/api/saveControlRelay`, { isPumpOn: newPumpState })
            .then(response => {
                setIsPumpOn(newPumpState);
                console.log('Water pump state updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating water pump state:', error);
            });
    };

    return (
        <div>
            <h2>Water Pump</h2>
            <p style={{ marginTop: '10px', marginBottom: '20px' }}>
                Use the switch below to turn the water pump on or off. The current status shows if the pump is running or stopped.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 2px' }}>
                    <Switch
                        checked={isPumpOn}
                        onChange={toggleWaterPump}
                        style={{ transform: 'scale(2)', margin: '0 10px' }}
                    />
                </div>
                <p style={{ paddingTop: '5px' }}>Water Pump is <span style={{ fontWeight: 'bold' }}>{isPumpOn ? 'On' : 'Off'}</span></p>
            </div>
        </div>
    );
};

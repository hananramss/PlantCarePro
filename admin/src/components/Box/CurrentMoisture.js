import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constant';
import Chart from 'react-apexcharts';

export const CurrentMoisture = () => {
    const [moistureLevel, setMoistureLevel] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/getAllMoistureLevel`);
                const responseData = response.data;
    
                if (responseData.length > 0) {
                    const latestReading = responseData[responseData.length - 1];
                    setMoistureLevel(latestReading.moisture_level);
                    
                    // Convert the timestamp to the desired format and adjust to local timezone
                    const utcTimestamp = new Date(latestReading.timestamp);

                    // Subtract one day from the retrieved timestamp
                    const yesterday = new Date(utcTimestamp);
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    // Manually set the timezone offset for the Philippines (UTC+8)
                    const philippinesOffset = 8 * 60 * 60 * 1000;
                    const localTimestamp = new Date(yesterday.getTime() + philippinesOffset);
                    
                    // Format the local timestamp
                    const formattedTimestamp = localTimestamp.toLocaleString('en-US', {
                        month: 'short', // Short month name (e.g., Jan)
                        day: 'numeric', // Numeric day of the month (e.g., 1)
                        year: 'numeric', // Numeric year (e.g., 2024)
                        hour: 'numeric', // Numeric hour (e.g., 1)
                        minute: '2-digit', // Two-digit minute (e.g., 05)
                        hour12: true // Use 12-hour clock (e.g., pm)
                    });
                    setLastUpdated(formattedTimestamp);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };


    useEffect(() => {
        fetchData(); // Fetch data on initial render

        const interval = setInterval(() => {
            fetchData(); // Fetch data at regular intervals
        }, 5000); // Fetch data every 5 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    // Function to determine the status based on the moisture level
    const getStatus = (level) => {
        if (level != null) {
            if (level < 30) {
                return 'Dry';
            } else {
                return 'Wet';
            }
        }
        return 'Loading...';
    };

    const status = getStatus(moistureLevel);

    // Options and data for the Apex donut chart
    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: ['Moisture Level'],
        colors: ['#4B6D52', '#E0E0E0'],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: false,
                        },
                        value: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 'bold',
                            color: '#333',
                            formatter: function (val) {
                                return `${val}%`;
                            },
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: '',
                            formatter: function () {
                                return moistureLevel != null ? `${moistureLevel}%` : 'Loading...';
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
    };

    const chartSeries = moistureLevel != null ? [moistureLevel, 100 - moistureLevel] : [0, 0];

    return (
        <div>
            <h2 >Current Moisture Level</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:'1rem' }}>
                {moistureLevel != null && (
                    <div style={{ width: '70%', display: 'flex', justifyContent: 'center' }}>
                        <Chart options={chartOptions} series={chartSeries} type="donut" width="70%" />
                    </div>
                )}
                <p>Status: <span style={{fontWeight:'bold'}}>{status}</span></p>
                <p>Last Updated: <span style={{fontWeight:'bold'}}>{lastUpdated != null ? lastUpdated : 'Loading...'}</span></p>
            </div>
        </div>
    );
};

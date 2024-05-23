import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import { baseUrl } from '../../utils/constant';

export const WeeklyChart = () => {
    const [options] = useState({
        chart: {
            id: 'chart'
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            title: {
                text: 'Day',
                style: {
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Moisture Level',
                style: {
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    fontSize: '12px'
                },
                formatter: function(value) {
                    return Math.round(value); // Round to nearest whole number
                }
            }
        }
    });

    const [series, setSeries] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const fetchData = () => {
        axios
            .get(`${baseUrl}/api/getAllMoistureLevel`)
            .then((res) => {
                const responseData = res.data;
                console.log(responseData)

                const selectedWeekYear = selectedDate.split('-W')[0];
                const selectedWeekNumber = selectedDate.split('-W')[1];

                const startOfWeek = new Date(selectedWeekYear, 0, (selectedWeekNumber - 1) * 7);
                startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Start on Monday

                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(endOfWeek.getDate() + 6); // End on Sunday

                const filteredData = responseData.filter(item => {
                    const itemDate = new Date(item.timestamp);
                    return itemDate >= startOfWeek && itemDate <= endOfWeek;
                });

                const groupedData = filteredData.reduce((acc, item) => {
                    const day = new Date(item.timestamp).getDay();
                    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    const dayName = dayNames[day];

                    if (!acc[dayName]) acc[dayName] = [];
                    acc[dayName].push(item.moisture_level);
                    return acc;
                }, {});

                const moistureLevels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                    const levels = groupedData[day] || [];
                    return levels.length ? Math.round(levels.reduce((sum, val) => sum + val, 0) / levels.length) : 0;
                });

                setSeries([{
                    name: 'Moisture Level',
                    data: moistureLevels
                }]);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    };

    useEffect(() => {
        if (selectedDate) {
            fetchData();
        }
    }, [selectedDate]);

    return (
        <div style={{
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '15px',
        }}>
            <div style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
            }}> 
                <div>
                    <h2>Last 7 days</h2>
                    <h3 style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontWeight: 'normal',
                    }}>Weekly Moisture level over time</h3>
                </div>
                <label>
                    <input type="week" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ 
                        fontSize:'15px',
                        padding: '12px', 
                        border: '2px solid black',
                    }}
                    />
                </label>
            </div>   
            <p>This chart visualizes moisture levels over the week, enabling users to observe fluctuations throughout the selected week.</p>       
            <Chart options={options} series={series} type="line" />
        </div>
    );
}

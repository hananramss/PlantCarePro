import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import { baseUrl } from '../../utils/constant';

export const MonthlyChart = () => {
    const [options] = useState({
        chart: {
            id: 'chart'
        },
        xaxis: {
            categories: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
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
    const [selectedMonth, setSelectedMonth] = useState('');

    const fetchData = () => {
        axios
            .get(`${baseUrl}/api/getAllMoistureLevel`)
            .then((res) => {
                const responseData = res.data;
                console.log(responseData);

                const [year, month] = selectedMonth.split('-').map(Number);
                const startOfMonth = new Date(year, month - 1, 1);
                const endOfMonth = new Date(year, month, 0);

                const filteredData = responseData.filter(item => {
                    const itemDate = new Date(item.timestamp);
                    return itemDate >= startOfMonth && itemDate <= endOfMonth;
                });

                const groupedData = filteredData.reduce((acc, item) => {
                    const day = new Date(item.timestamp).getDate();
                    if (!acc[day]) acc[day] = [];
                    acc[day].push(item.moisture_level);
                    return acc;
                }, {});

                const daysInMonth = new Date(year, month, 0).getDate();
                const moistureLevels = Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
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
        if (selectedMonth) {
            fetchData();
        }
    }, [selectedMonth]);

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
                    <h2>Last Month</h2>
                    <h3 style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontWeight: 'normal',
                    }}>Monthly Moisture Level Over Time</h3>
                </div>
                <label>
                    <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{
                            fontSize: '15px',
                            padding: '12px',
                            border: '2px solid black',
                        }}
                    />
                </label>
            </div>
            <p>This chart visualizes moisture levels over the month, enabling users to observe fluctuations throughout the selected month.</p>
            <Chart options={options} series={series} type="line" />
        </div>
    );
};

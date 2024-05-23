import React, { useState, useEffect } from "react";
import axios from 'axios';
import Chart from "react-apexcharts";
import { baseUrl } from '../../utils/constant';

export const RealTimeChart = () => {
    const [noDataMessage, setNoDataMessage] = useState("");
    const [options, setOptions] = useState({
        chart: {
            type: 'line'
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Time',
                style: {
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    fontSize: '12px'
                },
                formatter: function(value) {
                    const date = new Date(value);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const hours12 = hours % 12 || 12;
                    const minutesPadded = minutes < 10 ? '0' + minutes : minutes;
                    return `${hours12}:${minutesPadded} ${ampm}`;
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
        },
        markers: {
            size: 4,
            colors: ['white'],
            strokeColors: '#008FFB',
            strokeWidth: 2,
            hover: {
                size: 8,
                sizeOffset: 2
            }
        }
    });

    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`${baseUrl}/api/getAllMoistureLevel`)
                .then((res) => {
                    const responseData = res.data;

                    if (!Array.isArray(responseData)) {
                        throw new Error("Unexpected response data format");
                    }

                    if (responseData.length === 0) {
                        setNoDataMessage("No data found");
                        setSeries([]);
                        setOptions(prevOptions => ({
                            ...prevOptions,
                            xaxis: {
                                ...prevOptions.xaxis,
                                categories: [],
                            }
                        }));
                        return;
                    }

                    const philippinesOffset = 8 * 60 * 60 * 1000; // UTC+8
                    const adjustedData = responseData.map(item => ({
                        timestamp: new Date(new Date(item.timestamp).getTime() + philippinesOffset),
                        moisture_level: item.moisture_level
                    }));

                    const latestData = adjustedData.slice(-18);
                    const timeDate = latestData.map(item => item.timestamp);
                    const moistureLevel = latestData.map(item => item.moisture_level);

                    setNoDataMessage("");
                    setOptions(prevOptions => ({
                        ...prevOptions,
                        xaxis: {
                            ...prevOptions.xaxis,
                            categories: timeDate,
                        }
                    }));

                    setSeries([{
                        name: 'Moisture Level',
                        data: moistureLevel.map(value => Math.round(value)) // Round values
                    }]);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                    setNoDataMessage("No data found");
                    setSeries([]);
                    setOptions(prevOptions => ({
                        ...prevOptions,
                        xaxis: {
                            ...prevOptions.xaxis,
                            categories: [],
                        }
                    }));
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

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
                    <h2>Moisture Level Over Time</h2>
                    <h3 style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontWeight: 'normal',
                    }}>Realtime</h3>
                </div>
            </div>
            <p>This chart visualizes moisture levels over time, enabling users to observe fluctuations throughout the day.</p>
            {noDataMessage ? (
                <p>{noDataMessage}</p>
            ) : (
                <Chart options={options} series={series} type="line" />
            )}
        </div>
    );
}

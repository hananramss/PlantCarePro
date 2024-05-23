import React from 'react';
import { PlusCircleFilled } from '@ant-design/icons';


import { CurrentMoisture } from '../components/Box/CurrentMoisture';
import { WaterPumpBtn } from '../components/Box/WaterPumpBtn';
import { RealTimeChart } from '../components/Chart/RealTimeChart';
import { CalendarUpdates } from '../components/Box/CalendarUpdates';
// import { WeeklyChart } from '../components/Chart/WeeklyChart';
import { Link } from 'react-router-dom';


import '../styles/pages/dashboard.scss'


export const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="title">
        <span>Dashboard</span>
      </div>
      <div className="container">
        <div className="box box2"><CurrentMoisture/></div>
        <div className="box box1">
          <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '15px'}}>
            <h2>Reminder</h2>
            <Link to="/reminder">
              <button type='button' style={{
                padding: '3px', 
                width: '75px', 
                height: '25px', 
                background: 'none',
                backgroundColor: '#4B6D52',
                color: 'white',
                boxShadow: '0 2px 4px #ccc',
                cursor: 'pointer',
              }}>
                <PlusCircleFilled style={{paddingRight: '3px'}}/> Add
              </button>
            </Link>
          </div>
          <ul style={{textAlign: 'justify', listStyleType: 'none', padding: '0px'}}>
            <li style={{ paddingBottom: '6px', marginBottom: '5px', border:'1px solid #ccc', borderRadius: '5px', padding: '5px'}}>
              <span style={{fontWeight: 'bold'}}>Regular Watering Schedule</span>: Ensure your plants are watered consistently. Set reminders for specific times of the day to keep your plants healthy.
            </li>
            <li style={{ paddingBottom: '6px', marginBottom: '5px', border:'1px solid #ccc', borderRadius: '5px', padding: '5px'}}>
            <span style={{fontWeight: 'bold'}}>Check Moisture Levels</span>: Regularly monitor the soil moisture levels. Use the moisture sensor data to avoid over or under-watering.
            </li>
            <li style={{ paddingBottom: '6px', border:'1px solid #ccc', borderRadius: '5px', padding: '5px'}}>
            <span style={{fontWeight: 'bold'}}>Pump Maintenance</span>: Periodically check the water pump for any signs of wear or clogging. Ensure it is functioning properly to avoid disruptions.
            </li>
          </ul>
        </div>
        <div className="box box3"><WaterPumpBtn/></div>
        <div className="box box5"><RealTimeChart/></div>
        <div className="box box4"><CalendarUpdates/></div>
        {/* <div className="box box6"><WeeklyChart/></div> */}
        {/* <div className="box box7">Recent Orders</div> */}
      </div>
    </div>
  )
}

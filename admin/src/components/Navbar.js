import React, {useState} from 'react';
import axios from 'axios';
import { SearchOutlined  } from '@ant-design/icons';
import { BellOutlined  } from '@ant-design/icons';
import { baseUrl } from "../utils/constant";
import { useNavigate } from 'react-router-dom';

import '../styles/components/navbar.scss'

export const Navbar = () => { 
  // Get username from local storage
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  
  axios.defaults.withCredentials = true;
  
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`${baseUrl}/api/logoutAdmin`)
      .then((res) => {
        if (res.data.success) {
          navigate('/login');
          } 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

   // Function to toggle dropdown visibility
   const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

   // Function to handle notification click
   const handleNotificationClick = () => {
    setNotificationVisible(true); // Show notification message
  };

  // Function to close notification message
  const closeNotification = () => {
      setNotificationVisible(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/assets/logo.jpg"/>
        <span className="title">PlantCarePro</span>
      </div>
      <div className="icons">
        <SearchOutlined className="size" />
            <div className="notification" onClick={handleNotificationClick}>
              <BellOutlined className="size" />
            </div>
        <div className="user" onClick={toggleDropdown}>
          <img src="/assets/profile.png" alt="Profile"/>
          <span className="username">{username}</span>
          {dropdownVisible && (
          <div className="dropdown-content">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
        </div>
      </div>
      {/* Notification message */}
      {notificationVisible && (
                <div className="notification-message">
                    <p>Notification message goes here.</p>
                    <button onClick={closeNotification}>Close</button>
                </div>
            )}
    </div>
  )
}

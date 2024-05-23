import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { MonthlyChart } from './components/Chart/MonthlyChart';
import { WeeklyChart } from './components/Chart/WeeklyChart';
import { Reminder } from './components/Box/Reminder';
import { CalendarUpdates } from './components/Box/CalendarUpdates';
import { Navbar } from './components/Navbar';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';

import './styles/main/main.scss';


const Layout = () => {
  
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const App = () => {

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        
        {/* Default route to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Private routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monthlyChart" element={<MonthlyChart />} />
          <Route path="/weeklyChart" element={<WeeklyChart />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/calendar" element={<CalendarUpdates />} />
        </Route>
      </Routes>
    </Router>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import '../styles/components/menu.scss';

export const Menu = () => {
  const location = useLocation();

  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/dashboard" className={`listItem ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <DashboardOutlined />
          <span className="listItemTitle">Dashboard</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">LISTS</span>
        <Link to="/reminder" className={`listItem ${location.pathname === '/reminder' ? 'active' : ''}`}>
          <ShoppingCartOutlined />
          <span className="listItemTitle">Reminder</span>
        </Link>
        <Link to="/calendar" className={`listItem ${location.pathname === '/calendar' ? 'active' : ''}`}>
          <ShoppingOutlined />
          <span className="listItemTitle">Calendar</span>
        </Link>
      </div>
      <div className="item">
        <span className="title">ANALYTICS</span>
        <Link to="/monthlyChart" className={`listItem ${location.pathname === '/monthlyChart' ? 'active' : ''}`}>
          <BarChartOutlined />
          <span className="listItemTitle">Monthly</span>
        </Link>
        <Link to="/weeklyChart" className={`listItem ${location.pathname === '/weeklyChart' ? 'active' : ''}`}>
          <FileTextOutlined />
          <span className="listItemTitle">Weekly</span>
        </Link>
      </div>
      {/* <div className="item">
        <span className="title">MAINTENANCE</span>
        <Link to="/products" className={`listItem ${location.pathname === '/products' ? 'active' : ''}`}>
          <SettingOutlined />
          <span className="listItemTitle">Settings</span>
        </Link>
      </div> */}
    </div>
  );
};

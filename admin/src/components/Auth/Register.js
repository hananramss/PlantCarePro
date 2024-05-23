import React, { useState } from "react";
import axios from "axios";
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/components/Auth/Login.scss'

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    // Perform client-side validation
    if (!email.includes('@gmail.com')) {
      setEmailError("Invalid email address");
      setEmail("");
      return;
    }

    if (!isValidUsername(username)) {
      setUsernameError("Username must contain only letters, numbers, or underscores");
      setUsername("");
      return;
    }

    if (password !== confirmPass) {
      setPasswordError("Passwords do not match");
      setPassword("");
      return;
    }

    axios
      .post(`${baseUrl}/api/registerAdmin`, { username, email, password })
      .then((res) => {
        if (res.data.error) {
          setPasswordError(res.data.error);
        } else {
          localStorage.setItem('username', username);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPasswordError("An error occurred while processing your request.");
      });
  };

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  };

  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            gap: '1rem',
            height: '80vh',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: '40px',
              padding: '30px',
              width: '500px'
            }}>
              <h2 style={{
                fontSize: '35px',
                fontWeight: '800',
                color: '#4B6D52'
              }}>Register</h2>
              <div className="input-container">
                <div className="input">
                  <label className="label"><UserOutlined /></label>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError("");
                    }}
                    className={usernameError ? "error" : ""}
                    required
                  />
                </div>
                {usernameError && <div className="error">{usernameError}</div>}
                <div className="input">
                  <label className="label"><MailFilled /></label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className={emailError ? "error" : ""}
                    required
                  />
                </div>
                {emailError && <div className="error">{emailError}</div>}
                <div className="input">
                  <label className="label"><LockFilled /></label>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className={passwordError ? "error" : ""}
                    required
                  />
                </div>
                <div className="input">
                  <label className="label"><LockFilled /></label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className={passwordError ? "error" : ""}
                    required
                  />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <button style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    backgroundColor: '#8BB594'
                  }} className="loginBtn" type="submit">REGISTER</button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: '40px',
              padding: '30px',
              width: '400px',
              backgroundColor: '#4B6D52',
              boxShadow: '1px 2px 4px rgba(76, 175, 80, 0.5)',
              color: 'white',
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
              }}>Hello, ka-plantita!</h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.5rem',
                textAlign: 'center'
              }}>Sign up to embark on the journey of becoming a plantita.</p>

            <div style={{
              position: 'absolute',
              bottom: '20px',
              display: 'flex',
              justifyContent: 'flex-end', 
            }}>
              <p style={{
                fontSize: '17px',
                color: 'white',
                textShadow: '2px 1px 2px rgba(0, 0, 0, 0.3)',
                fontWeight: '700',
                textAlign: 'center',
                width: '21rem',
                backgroundColor: '#8BB594'
              }}
                className="loginBtn"><Link to="/login">LOGIN</Link></p>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

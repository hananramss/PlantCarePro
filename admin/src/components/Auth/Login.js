import React, { useState } from "react";
import axios from "axios";
import { MailFilled, LockFilled } from '@ant-design/icons';
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";

import '../../styles/components/Auth/Login.scss';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Perform client-side validation
    if (!email.includes('@gmail.com')) {
      setEmailError("Invalid email address");
      setEmail("");
      return;
    }

    axios
      .post(`${baseUrl}/api/loginAdmin`, { email, password })
      .then((res) => {
        if (res.data.message === "User not registered") {
          setEmailError("User not registered");
          setEmail("");
          setPassword("");
        } else if (res.data.success) {
          // User successfully authenticated
          setEmail("");
          setPassword("");
          navigate('/dashboard');
        } else {
          // Authentication failed
          setPasswordError("Incorrect password");
          setPassword("");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPasswordError("Incorrect password. Please try again.");
        setPassword("");
      });
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
              width: '400px',
              backgroundColor: '#4B6D52',
              boxShadow: '1px 2px 4px rgba(76, 175, 80, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                padding: '30px',
                color: 'white',
              }}>
                <h2 style={{
                  fontSize: '35px',
                  fontWeight: '800',
                }}>WELCOME BACK!</h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.5rem',
                  textAlign: 'center'
                }}>Stay connected! Log in with your credentials to join the joy of planting.</p>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                width: '78%',
                display: 'flex',
                
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
                  className="loginBtn"><Link to="/register">REGISTER</Link></p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: '40px',
              padding: '30px',
              width: '500px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '35px',
                  fontWeight: '800',
                  color: '#4B6D52'
                }}>Login</h2>
                <div className="input-container">
                  <div className="input">
                    <label className="label"><MailFilled /></label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(""); // Clear any previous error
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
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(""); // Clear any previous error
                      }}
                      className={passwordError ? "error" : ""}
                      required
                    />
                  </div>
                  {passwordError && <div className="error">{passwordError}</div>}
                  <Link to="/forgotPassword" style={{
                    paddingLeft: '2.5rem',
                    textDecoration: 'underline',
                  }}>Forgot Password</Link>
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
                  }} className="loginBtn" type="submit">LOGIN</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

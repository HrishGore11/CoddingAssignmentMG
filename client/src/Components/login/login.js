import "./login.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
let background = require("../login/login.jpeg");
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Home");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9046/api/auth/signIN", credentials)
      .then((data) => {
        console.log(data.data.data);
        if (data.data.success === true) {
          localStorage.setItem("token", data.data.data);
          navigate("/Home");
          window.alert("Login Successfull");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="App1" style={{ backgroundImage: `url(${background})` }}>
      <Box className="box">
        <div className="css-15m7mkq">
          <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">
            Sign in
          </h4>

          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1amtie4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="GoogleIcon"
          >
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
          </svg>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1amtie4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="FacebookIcon"
          >
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
          </svg>
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1amtie4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="GitHubIcon"
          >
            <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
          </svg>
        </div>
        <div className="form-div1">
          <form onSubmit={handleSubmit}>
            <div className="form-div2">
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={credentials.email}
                name="email"
                id="outlined-required"
                label="Email"
                type="Email"
                size="small"
              />
            </div>
            <div className="form-div2">
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                fullWidth
                onChange={handleChange}
                value={credentials.password}
                size="small"
                autoComplete="current-password"
              />
            </div>
            <div class="MuiBox-root css-1id64jh">
              <button
                class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
                tabindex="0"
                type="Submit"
              >
                sign in
                {/* <span class="MuiTouchRipple-root css-w0pj6f"></span> */}
              </button>
            </div>
            <div class="MuiBox-root css-ne2rd">
              <span class="MuiTypography-root MuiTypography-button css-18rmxgd">
                Don't have an account?{" "}
                <Link
                  class="MuiTypography-root MuiTypography-button css-13cfyfx"
                  href="/Signup"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
}

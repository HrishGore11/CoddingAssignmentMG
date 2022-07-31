import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
let bgImage = require("./sign-up.jpeg");

export default function Signup() {
  const [credentials, setCredentials] = useState({
    Name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  // const {name, email, password} = credentials;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9046/api/auth/signUp", credentials)
      .then((data) => {
        console.log(data.data.createUser);
        if (data.data.message === "succesfully created User") {
          // localStorage.setItem("token", data.data.token);
          // console.log(data.data.token);
          window.alert("Register Successfull");
          navigate("/Login");
        }
      });
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="App">
      <div
        class="MuiBox-root css-ssrfv1"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <Box className="box1">
        <div className="css-15m7mkq">
          <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi">
            Join us today
          </h4>
          <span class="MuiTypography-root MuiTypography-button css-1vmcl1i">
            Enter your Name,Email and Password to register
          </span>
        </div>
        <div className="form-div1">
          <form onSubmit={handleSubmit}>
            <div className="form-div2">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  fullWidth
                  // id="input-with-sx"
                  label="Your Name"
                  variant="standard"
                  value={credentials.Name}
                  onChange={handleChange}
                  id="name"
                  name="Name"
                />
              </Box>
            </div>
            <div className="form-div2">
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                type="Email"
                variant="standard"
                size="small"
                value={credentials.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form-div2">
              <TextField
                fullWidth
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                size="small"
                value={credentials.password}
                onChange={handleChange}
                name="password"
              />
            </div>
            <div class="MuiBox-root css-1id64jh">
              <button
                class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
                tabindex="0"
                type="submit"
              >
                sign up
                {/* <span class="MuiTouchRipple-root css-w0pj6f"></span> */}
              </button>
            </div>
            <div class="MuiBox-root css-ne2rd">
              <span class="MuiTypography-root MuiTypography-button css-18rmxgd">
                Already have an account?{" "}
                <Link
                  class="MuiTypography-root MuiTypography-button css-13cfyfx"
                  href="./Login"
                >
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
}

import * as React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircleRounded";
import "../dashboard/dashboard.css";
export default function Dashboard() {
  let navigate = useNavigate();
  ///////////////////////// To LogOut User:
  const LogOut = () => {
    localStorage.removeItem("token");
    alert("User is LogOut Succesfully");
    navigate("/Login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div className="MuiTypography-root MuiTypography-h6 css-1juivf6-MuiTypography-root">
            <Link href="/Home" color="inherit">
              Home
            </Link>
          </div>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={LogOut}
            color="inherit"
          >
            <AccountCircle className="icon" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

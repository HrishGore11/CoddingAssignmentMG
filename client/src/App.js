import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/login/login";
import Signup from "./Components/signup/Signup";
import Dashboard from "./Components/dashboard/dashboard";
import Home from "./Components/Homepage/home";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="Home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

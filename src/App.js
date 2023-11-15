import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Activate from "./pages/Activate";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NavbarStyle from "./pages/Navbar";
import Profile from "./pages/Profile";
import Users from "./pages/Users";


function App() {
  return (
    <BrowserRouter>
    <NavbarStyle/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/activate" element={<Activate/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;

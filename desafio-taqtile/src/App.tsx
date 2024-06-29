import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import AddUser from "./Pages/AddUserPage";
import UserDetails from "./Components/UserDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};

export default App;

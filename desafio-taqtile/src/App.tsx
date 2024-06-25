import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Components/User/UserList";
import AddUser from "./Components/User/AddUser";
import LoginPage from "./Pages/LoginPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<UserList />} />
      <Route path="/add-user" element={<AddUser />} />
    </Routes>
  </Router>
);

export default App;

import React from "react";
import UserList from "../Components/UserList";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Lista de Usuários</h1>
      <UserList />
    </div>
  );
};

export default HomePage;

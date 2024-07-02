import React from "react";
import UserList from "../Components/User/UserList";

const UserListPage: React.FC = () => {
  return (
    <div>
      <h1>Lista de Usuários</h1>
      <UserList />
    </div>
  );
};

export default UserListPage;

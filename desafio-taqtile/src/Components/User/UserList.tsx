import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { USERS_QUERY } from "../../GraphQl/Queries/UsersQuery";
import client from "../../GraphQl/Apollo/ApolloClient";
import UserListLogic from "../../Utils/UserListLogic";
import { handleError } from "../../Utils/ErrorQueries";
import LogoutModal from "../../Components/LogoutModal";
import {
  UserListContainer,
  Title,
  StyledUserList,
  UserListItem,
  Button,
  ButtonWrapper,
} from "../../Styles/UserListStyles";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersQueryData {
  users: {
    nodes: User[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
}

interface UsersQueryVariables {
  data: {
    offset: number;
    limit: number;
  };
}

const UserList: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // eslint-disable-next-line
  const { loading, error, data, fetchMore } = useQuery<
    UsersQueryData,
    UsersQueryVariables
  >(USERS_QUERY, {
    variables: { data: { offset, limit: 20 } },
    client,
    onCompleted: (data) => {
      setUsers(data.users.nodes);
    },
  });

  const navigate = useNavigate();

  const { handleLoadMore } = UserListLogic(
    offset,
    setOffset,
    fetchMore,
    setUsers,
  );

  const handleOpenLogoutModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
    setSelectedUserId("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    client.clearStore();
    navigate("/");
  };

  if (loading && users.length === 0) return <p>Carregando...</p>;
  if (error) {
    return <p>Erro: {handleError(error)}</p>;
  }

  return (
    <UserListContainer>
      <Title>Lista de Integrantes Tàqtile</Title>
      <StyledUserList>
        {users.map((user: User) => (
          <UserListItem
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <div className="userInfo">
              <strong>Nome:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
            </div>
          </UserListItem>
        ))}
      </StyledUserList>
      <ButtonWrapper>
        <Button onClick={handleLoadMore}>Carregar mais</Button>
        <Button onClick={() => navigate("/add-user")}>
          Adicionar Integrante
        </Button>
        <Button
          style={{ backgroundColor: "red" }}
          onClick={() => handleOpenLogoutModal(selectedUserId)}
        >
          Logout
        </Button>
      </ButtonWrapper>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={handleCloseLogoutModal}
        onConfirm={handleLogout}
      />
    </UserListContainer>
  );
};

export default UserList;

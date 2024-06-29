import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { USERS_QUERY } from "../../GraphQl/Queries/UsersQuery";
import client from "../../GraphQl/Apollo/ApolloClient";
import UserListLogic from "../../Utils/UserListLogic";
import { handleError } from "../../Utils/ErrorQueries";
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
  const { loading, error, data, fetchMore } = useQuery<
    UsersQueryData,
    UsersQueryVariables
  >(USERS_QUERY, {
    variables: { data: { offset, limit: 20 } },
    client,
  });

  useEffect(() => {
    if (data?.users?.nodes) {
      setUsers(data.users.nodes);
    }
  }, [data]);

  const navigate = useNavigate();

  const { handleLoadMore } = UserListLogic(
    offset,
    setOffset,
    fetchMore,
    setUsers,
  );

  if (loading && users.length === 0) return <p>Carregando...</p>;
  if (error) {
    return <p>Erro: {handleError(error)}</p>;
  }

  return (
    <UserListContainer>
      <Title>Lista de Usuários Tàqtile</Title>
      <StyledUserList>
        {users.map((user: User) => (
          <UserListItem
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <strong>Nome:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
          </UserListItem>
        ))}
      </StyledUserList>
      {data?.users?.pageInfo.hasNextPage && (
        <ButtonWrapper>
          <Button onClick={handleLoadMore}>Carregar mais</Button>
          <Link to="/add-user">
            <Button>Adicionar Usuário</Button>
          </Link>
        </ButtonWrapper>
      )}
    </UserListContainer>
  );
};

export default UserList;
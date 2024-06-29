import React, { useState, useEffect } from "react";
import { useQuery, gql, ApolloError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { client } from "../GraphQl/Apollo/ApolloClient";

const USERS_QUERY = gql`
  query Users($data: PageInput!) {
    users(data: $data) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
}

interface PageInfo {
  hasNextPage: boolean;
}

interface UsersData {
  users: {
    nodes: User[];
    pageInfo: PageInfo;
  };
}

interface UsersVars {
  data: {
    offset: number;
    limit: number;
  };
}

const UserList: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const { loading, error, data, fetchMore } = useQuery<UsersData, UsersVars>(
    USERS_QUERY,
    {
      variables: { data: { offset, limit: 20 } },
      client,
    },
  );

  useEffect(() => {
    if (data?.users?.nodes) {
      setUsers((prevUsers) => [...prevUsers, ...data.users.nodes]);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleLoadMore = async () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    await fetchMore({
      variables: { data: { offset: newOffset, limit: 20 } },
    });
  };

  if (loading && users.length === 0) return <p>Carregando...</p>;
  if (error) {
    console.error("Erro ao buscar usuários:", error);
    return <p>Erro: {(error as ApolloError).message}</p>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
            <strong>Nome:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
          </li>
        ))}
      </ul>
      {data?.users?.pageInfo.hasNextPage && (
        <button onClick={handleLoadMore}>Carregar mais</button>
      )}
      <button onClick={() => navigate("/add-user")}>Adicionar Usuário</button>
    </div>
  );
};

export default UserList;

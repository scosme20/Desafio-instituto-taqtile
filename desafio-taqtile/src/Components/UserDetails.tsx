import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id },
    skip: !id,
    onError: (err) => {
      console.error("Erro ao buscar detalhes do usuário:", err);
    },
  });

  if (loading) return <p>Carregando...</p>;
  if (error) {
    return (
      <div>
        <p>Erro ao buscar detalhes do usuário:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const user = data?.user;

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      {user ? (
        <div>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Telefone:</strong> {user.phone}
          </p>
          <p>
            <strong>Data de Nascimento:</strong>{" "}
            {new Date(user.birthDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Perfil:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default UserDetails;

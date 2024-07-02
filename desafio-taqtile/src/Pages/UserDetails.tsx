import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import client from "../GraphQl/Apollo/ApolloClient";
import {
  Container,
  Title,
  DetailItem,
  ErrorMessage,
  LoadingMessage,
  BackButton,
} from "../Styles/UserDetails";

const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: userId },
    client,
  });

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error.message}</ErrorMessage>;

  const user = data?.user;

  return (
    <Container>
      <Title>Detalhes</Title>
      {user ? (
        <>
          <DetailItem>
            <strong>Nome:</strong> {user.name}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {user.email}
          </DetailItem>
          <DetailItem>
            <strong>Telefone:</strong> {user.phone}
          </DetailItem>
          <DetailItem>
            <strong>Data de Nascimento:</strong>{" "}
            {new Date(user.birthDate).toLocaleDateString()}
          </DetailItem>
          <DetailItem>
            <strong>Função:</strong> {user.role}
          </DetailItem>
        </>
      ) : (
        <p>User not found</p>
      )}
      <BackButton onClick={() => navigate("/home")}>
        Voltar para a Home
      </BackButton>
    </Container>
  );
};

export default UserDetails;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "../../Graphql/Queries/UserQuery";
import { User } from "../../Interface/User";
import { Container, Title, DetailItem } from "../../Styles/UserDetails";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(USERS_QUERY, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user: User = data.user;

  return (
    <Container>
      <Title>Detalhes do Usuário</Title>
      <DetailItem>Nome: {user.name}</DetailItem>
      <DetailItem>Email: {user.email}</DetailItem>
      <DetailItem>Telefone: {user.phone}</DetailItem>
      <DetailItem>Data de Nascimento: {user.birthDate}</DetailItem>
    </Container>
  );
};

export default UserDetails;

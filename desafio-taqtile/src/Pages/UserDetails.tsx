import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import client from "../Graphql/Apollo/ApolloClient";
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
  if (error)
    return <ErrorMessage>Error: {(error as Error).message}</ErrorMessage>;

  const user = data?.user;

  return (
    <Container>
      <Title>User Details</Title>
      {user ? (
        <>
          <DetailItem>
            <strong>Name:</strong> {user.name}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {user.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {user.phone}
          </DetailItem>
          <DetailItem>
            <strong>Birth Date:</strong>{" "}
            {new Date(user.birthDate).toLocaleDateString()}
          </DetailItem>
          <DetailItem>
            <strong>Role:</strong> {user.role}
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

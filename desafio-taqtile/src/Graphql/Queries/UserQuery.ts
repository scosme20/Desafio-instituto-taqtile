import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query Users {
    users {
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

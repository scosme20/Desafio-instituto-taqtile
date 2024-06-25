import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "../../Graphql/Queries/UserQuery";
import client from "../../Graphql/Apollo/ApolloClient";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(USERS_QUERY, {
    client,
    onCompleted: (data) => {
      setUsers(data.users.nodes);
    },
  });

  const loadMoreUsers = async () => {
    setLoadingMore(true);
    try {
      const { data } = await fetchMore({
        variables: { offset: users.length },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            users: {
              nodes: [...prev.users.nodes, ...fetchMoreResult.users.nodes],
              pageInfo: fetchMoreResult.users.pageInfo,
            },
          };
        },
      });
      setUsers((prevUsers) => [...prevUsers, ...data.users.nodes]);
    } catch (fetchError) {
      console.error("Error fetching more users:", fetchError);
    }
    setLoadingMore(false);
  };

  if (loading && !loadingMore) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching users:", error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
          </li>
        ))}
      </ul>
      {data.users.pageInfo.hasNextPage && (
        <button onClick={loadMoreUsers} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default UserList;

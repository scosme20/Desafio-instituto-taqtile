import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { USERS_QUERY } from "../../Graphql/Queries/UserQuery";
import client from "../../Graphql/Apollo/ApolloClient";

const UserList: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const { loading, error, data, fetchMore } = useQuery(USERS_QUERY, {
    variables: { data: { offset, limit: 20 } },
    client,
  });

  useEffect(() => {
    if (data && data.users && data.users.nodes) {
      setUsers(data.users.nodes);
    }
  }, [data]);

  const handleLoadMore = async () => {
    const newOffset = offset + 20;
    setOffset(newOffset);

    try {
      const { data: moreData } = await fetchMore({
        variables: {
          data: {
            offset: newOffset,
            limit: 20,
          },
        },
      });

      if (moreData && moreData.users && moreData.users.nodes) {
        setUsers((prevUsers) => [...prevUsers, ...moreData.users.nodes]);
      }
    } catch (error: unknown) {
      console.error("Error fetching more users:", error);
      alert("Failed to load more users. Please try again.");
    }
  };

  if (loading && users.length === 0) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching users:", error);
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
          </li>
        ))}
      </ul>
      {data && data.users && data.users.pageInfo.hasNextPage && (
        <button onClick={handleLoadMore}>Carregar mais</button>
      )}
      <Link to="/add-user">
        <button>Adicionar Usuário</button>
      </Link>
    </div>
  );
};

export default UserList;

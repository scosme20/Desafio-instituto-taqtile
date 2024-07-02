import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface FetchMoreResult {
  data: {
    users: {
      nodes: User[];
    };
  };
}

const UserListLogic = (
  initialOffset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  fetchMore: (variables: {
    variables: { data: { offset: number; limit: number } };
  }) => Promise<FetchMoreResult>,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
) => {
  const [offset, setInternalOffset] = useState(initialOffset);

  const handleLoadMore = async () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    setInternalOffset(newOffset);

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
    } catch (error) {
      console.error("Erro ao carregar mais usuários:", error);
      alert("Falha ao carregar mais usuários. Por favor, tente novamente.");
    }
  };

  return {
    handleLoadMore,
  };
};

export default UserListLogic;

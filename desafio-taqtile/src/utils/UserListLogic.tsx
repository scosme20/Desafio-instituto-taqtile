import { useState } from "react";

const UserListLogic = (
  initialOffset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>,
  fetchMore: (variables: any) => Promise<any>,
  setUsers: React.Dispatch<React.SetStateAction<any[]>>,
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
        setUsers((prevUsers: any[]) => [...prevUsers, ...moreData.users.nodes]);
      }
    } catch (error: any) {
      console.error("Erro ao carregar mais usuários:", error);
      alert("Falha ao carregar mais usuários. Por favor, tente novamente.");
    }
  };

  return {
    handleLoadMore,
  };
};

export default UserListLogic;

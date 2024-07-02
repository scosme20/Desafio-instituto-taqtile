export const handleError = (error: unknown): string => {
  console.error("Erro ao buscar usuários:", error);
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocorreu um erro desconhecido.";
};

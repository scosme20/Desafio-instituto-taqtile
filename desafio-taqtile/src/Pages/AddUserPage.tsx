import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ApolloError } from "@apollo/client/errors";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await createUser({
        variables: {
          data: {
            name,
            email,
            phone,
            birthDate: new Date(birthDate).toISOString(),
            password,
            role,
          },
        },
      });

      if (data?.createUser) {
        navigate("/home");
      }
    } catch (err) {
      handleApolloError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApolloError = (err: ApolloError | Error | unknown) => {
    if (err instanceof ApolloError) {
      setError(err.message);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Erro desconhecido ocorreu");
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Telefone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <label>Data de Nascimento</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
        />
        <br />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>Perfil</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as string)}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar Usuário"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;

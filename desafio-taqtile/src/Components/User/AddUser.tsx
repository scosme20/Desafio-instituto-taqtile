import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_USER_MUTATION } from "../../Graphql/Mutations/AddMutation";

const AddUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState("user");
  const [cpf, setCpf] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cpf.length !== 11) {
      alert("CPF inválido. Deve conter exatamente 11 números.");
      return;
    }

    try {
      await createUser({
        variables: {
          data: {
            name,
            email,
            phone,
            birthDate,
            role,
            password: "defaultPassword", // Just to pass the validation, handle this securely
          },
        },
      });
      navigate("/user-list");
    } catch (error: unknown) {
      console.error("Error adding user:", error);
      alert(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h2>Adicionar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <button type="submit">Adicionar Usuário</button>
      </form>
    </div>
  );
};

export default AddUser;

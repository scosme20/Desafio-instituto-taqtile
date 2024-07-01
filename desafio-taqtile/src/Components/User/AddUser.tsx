import React, { useState, useEffect } from "react";
import { useMutation, ApolloError } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../GraphQl/Mutations/AddMutatios";
import {
  Form,
  Input,
  Label,
  ErrorMessage,
  Button,
  Select,
  ButtonWrapper,
  Title,
} from "../../Styles/AddUserStyles";
import { useNavigate, Link } from "react-router-dom";

interface UserInput {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  role: string;
}

interface CreateUserMutationData {
  createUser: {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  };
}

const AddUserForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [addUser] = useMutation<CreateUserMutationData, { data: UserInput }>(
    CREATE_USER_MUTATION,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setName("");
    setEmail("");
    setPhone("");
    setBirthDate("");
    setPassword("");
    setRole("user");
    setError("");
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formattedBirthDate = new Date(birthDate).toISOString();
    try {
      await addUser({
        variables: {
          data: {
            name,
            email,
            phone,
            birthDate: formattedBirthDate,
            password,
            role,
          },
        },
      });
      navigate("/home");
    } catch (err) {
      if (err instanceof ApolloError) {
        setError(err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Adicionar Usuário</Title>
      <Label>Nome</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: João Silva"
      />
      <Label>Email</Label>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ex: joao.silva@email.com"
      />
      <Label>Telefone</Label>
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ex: (11) 91234-5678"
      />
      <Label>Data de Nascimento</Label>
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <Label>Senha</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite uma senha"
      />
      <Label>Role</Label>
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Usuário</option>
        <option value="adm">Administrador</option>
      </Select>
      {loading && <p>Carregando...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonWrapper>
        <Button type="submit">Adicionar </Button>
        <Link to="/home">
          <Button type="button">Voltar para Home</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default AddUserForm;

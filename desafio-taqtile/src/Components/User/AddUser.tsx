import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../Graphql/Mutations/AddMutation";
import {
  Form,
  Input,
  Label,
  ErrorMessage,
  Button,
  Select,
  ButtonWrapper,
  Title,
} from "../../Styles/AddUserStyle";
import { useNavigate, Link } from "react-router-dom";

const AddUserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [addUser] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formattedBirthDate = new Date(birthDate).toISOString();
    console.log("Submitting:", {
      name,
      email,
      phone,
      birthDate: formattedBirthDate,
      password,
      role,
    });
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
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Adicionar Usuário</Title>
      <Label>Nome</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Label>Email</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Telefone</Label>
      <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
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
      />
      <Label>Role</Label>
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="adm">Adm</option>
      </Select>
      {loading && <p>Carregando...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonWrapper>
        <Button type="submit">Adicionar Usuário</Button>
        <Link to="/home">
          <Button type="button">Voltar para Home</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default AddUserForm;

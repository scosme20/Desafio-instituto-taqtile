import React, { useState } from "react";
import { useMutation, ApolloError } from "@apollo/client";
import { LOGIN_MUTATION } from "../../GraphQl/Mutations/LoginMutation";
import {
  Form,
  Input,
  Label,
  ErrorMessage,
  Button,
} from "../../Styles/LoginPageStyles";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [login] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await login({
        variables: {
          data: {
            email,
            password,
          },
        },
      });

      const token = data?.login?.token;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (err) {
      if (err instanceof ApolloError) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
      />
      <Label>Senha</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </Button>
    </Form>
  );
};

export default LoginForm;

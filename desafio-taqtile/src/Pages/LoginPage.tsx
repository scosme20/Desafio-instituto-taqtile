import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../Graphql/Mutations/LoginMutations";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 7) {
      return false;
    }
    const hasDigit = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return hasDigit && hasLetter;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError(null);

    if (!email) {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 7 characters long and contain at least one digit and one letter",
      );
    }

    if (
      email &&
      password &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      setLoading(true);
      try {
        const { data } = await login({
          variables: { data: { email, password } },
        });
        setLoading(false);
        if (data?.login?.token) {
          localStorage.setItem("token", data.login.token);
          console.log("Login successful");
          console.log("Token:", data.login.token);
          navigate("/home");
        } else {
          console.error("Unexpected response structure", data);
          setLoginError("Unexpected response structure");
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Login error", error);
        setLoginError(error.message || "An unexpected error occurred");
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <div>
      <h1>Bem vindo a Taqtile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p>{passwordError}</p>}
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
        {loading && <p>Loading...</p>}
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Input from "./Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      return navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const loginReq = await axios.post("http://localhost:3000/user/sign-in", {
        email,
        password,
      });

      if (loginReq.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        return navigate("/dashboard");
      }
    } catch (err: any) {
      toast(err.response.data.erro);
    }
  };

  const handleCreateAccount = () => {
    setCreateAccount((account) => !account);
  };

  const handleNewAccount = async () => {
    try {
      const signUpReq = await axios.post("http://localhost:3000/user/sign-up", {
        email,
        password,
      });

      if (signUpReq.status === 201) {
        localStorage.setItem("isLoggedIn", "true");
        return navigate("/dashboard");
      }
    } catch (err: any) {
      toast(err.response.data.erro);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <ToastContainer />
      <div className="card p-4">
        <h2 className="text-center mb-4">
          {createAccount ? "Crie sua conta" : "Login"}
        </h2>
        <form>
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={createAccount ? handleNewAccount : handleLogin}
          >
            {createAccount ? "Criar conta" : "Login"}
          </button>
          <button
            type="button"
            className="btn btn-link text-decoration-underline"
            onClick={handleCreateAccount}
          >
            {createAccount ? "Fazer Login" : "Criar Conta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

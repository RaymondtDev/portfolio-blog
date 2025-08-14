import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./ux/SubmitButton";
import { login } from "../api/blogapi";

const Login = () => {
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const { setUser, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(
        credentials.usernameOrEmail,
        credentials.password
      );

      if (response.status === 200) {
        setLoggedIn(true);
        setUser(response.data.admin);
        setToast(true);
        setTimeout(() => setToast(false), 3000);
        setTimeout(() => {
          navigate("/dashboard");
        }, 4000);
      }

    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="full-width h-screen flex flex-col justify-center items-center bg-[var(--primary-color)] relative overflow-x-hidden">
      <p
        className={`p-2.5 bg-slate-50 absolute top-[90px] right-5 rounded-sm shadow-sm shadow-amber-50 text-[var(--primary-color)] ${
          toast ? "translate-x-[0px]" : "translate-x-[calc(100%+20px)]"
        } transition`}
      >
        Login Successful!
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-10 rounded-md flex flex-col w-1/3"
      >
        <h2 className="text-[var(--primary-color)] mb-2.5">Login</h2>
        <input
          type="text"
          placeholder="Username or Email"
          value={credentials.usernameOrEmail}
          onChange={(e) =>
            setCredentials({ ...credentials, usernameOrEmail: e.target.value })
          }
          required
          className="mb-2.5"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <br />
        <p className="text-red-500 italic text-sm">{error && error}</p>
        <SubmitButton className="bg-[var(--btn-color)] text-[var(--secondary-text-color)] px-4 py-2 rounded-md w-fit self-start">
          Login
        </SubmitButton>
      </form>
    </div>
  );
};

export default Login;

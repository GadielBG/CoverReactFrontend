import { useState } from "react";
import { register, login } from "../controllers/AuthController";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = login(email, password);
      if (!result.success) return setError(result.message);
    } else {
      const result = register({ email, password });
      if (!result.success) return setError(result.message);
    }
    navigate("/home");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>
      <button
        className="mt-4 text-sm text-blue-500 underline w-full"
        onClick={() => {
          setError("");
          setIsLogin(!isLogin);
        }}
      >
        {isLogin
          ? "¿No tienes una cuenta? Regístrate"
          : "¿Ya tienes una cuenta? Inicia sesión"}
      </button>
    </div>
  );
}

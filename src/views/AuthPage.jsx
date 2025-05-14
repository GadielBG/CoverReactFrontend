import { useState } from "react";
import { register, login } from "../controllers/AuthController";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    nombre_completo: "",
    telefono: "",
    carnet: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const result = await login({
        correo: formData.correo,
        contrasena: formData.contrasena,
      });
      if (!result.success) return setError(result.message);
      navigate("/home");
    } else {
      const result = await register(formData);
      if (!result.success) return setError(result.message);
      setIsLogin(true); // Cambia a modo login tras registro exitoso
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              name="nombre_completo"
              placeholder="Nombre completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              name="carnet"
              placeholder="Carnet de identidad"
              value={formData.carnet}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
              required
            />
          </>
        )}
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
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

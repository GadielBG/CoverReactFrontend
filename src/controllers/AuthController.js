// src/controllers/AuthController.js
const API_URL = "http://localhost:3000/api/auth"; // Ajustar la URL según el backend

export const register = async (data) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, rol: "cliente" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Error al registrar" };
    }

    return { success: true };
  } catch (err) {
    console.error("Error de red:", err);
    return { success: false, message: "Error de red al registrar" };
  }
};

export const login = async ({ correo, contrasena }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Credenciales incorrectas" };
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true, user: data.user };
  } catch (err) {
    console.error("Error de red:", err);
    return { success: false, message: "Error de red al iniciar sesión" };
  }
};

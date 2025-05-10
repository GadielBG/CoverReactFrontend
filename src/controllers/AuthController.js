import { addUser, findUserByEmail } from "../models/UserModel";

export function register(user) {
  const exists = findUserByEmail(user.email);
  if (exists) {
    return { success: false, message: "El usuario ya existe." };
  }
  addUser(user);
  return { success: true };
}

export function login(email, password) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return { success: true, user };
  }
  return { success: false, message: "Credenciales incorrectas." };
}

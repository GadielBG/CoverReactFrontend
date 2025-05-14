// src/models/UserModel.js
export class UserModel {
  constructor({ nombre_usuario, correo, contrasena, nombre_completo, telefono, carnet, rol }) {
    this.nombre_usuario = nombre_usuario;
    this.correo = correo;
    this.contrasena = contrasena;
    this.nombre_completo = nombre_completo;
    this.telefono = telefono;
    this.carnet = carnet;
    this.rol = rol || "cliente";
  }
}

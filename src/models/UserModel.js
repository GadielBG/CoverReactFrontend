export const userDatabase = [];
import axios from "axios";

export  async function addUser(user) {
  console.log('Entrando');
  userDatabase.push(user);
    try {
      const respuesta = await axios.post('http://localhost:3030/api/createPersona', {
        nombre_usuario: "pedro12",
        correo: "pedro@example.com",
        contrasena: "12345",
        nombre_completo: "pedro Pérez",
        telefono: "1234567890",
        carnet: "ABC1234",
        rol: "cliente",
        estado: "activo"
      });

      console.log('Respuesta del servidor:', respuesta.data);
    } catch (error){
      console.error('Error al crear persona:', error);
    }
  
}

export function findUserByEmail(email) {
  return userDatabase.find(user => user.email === email);
}

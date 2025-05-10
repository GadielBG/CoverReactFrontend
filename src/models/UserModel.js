export const userDatabase = [];

export function addUser(user) {
  userDatabase.push(user);
}

export function findUserByEmail(email) {
  return userDatabase.find(user => user.email === email);
}

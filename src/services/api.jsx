export const getUsers = async () =>
  fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());

export const getComments = async () =>
  fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json());

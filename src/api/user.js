import instance from "./axios.js";

export const userList = async () => {
    // Realiza una solicitud GET a la ruta "/Users" para obtener la lista de usuarios
    return await instance.get("/Users");
};

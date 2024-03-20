import instance from "./axios.js";

export const createRol = async (roleData) => {
    // Realiza una solicitud POST a la ruta "/newRole" con los datos del rol
    return await instance.post("/newRole", roleData);
   };
   

  export const rolList = async () => {
    // Realiza una solicitud POST a la ruta "/register" con los datos del usuario
    return await instance.get("/getRoles");
  }

  // En tu archivo de rutas API
export const consultRole = async (id) => {
    return await instance.get(`/getRol/${id}`);
   };
   

   export const updateRol = async (id, roleData) => {
    return await instance.put(`/updateRole/${id}`, roleData);
}

export const desableRol = async (id) => {
    return await instance.delete(`/deleteRole/${id}`);
}

   

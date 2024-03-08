import instance from "./axios.js";

export const registerRequest = async (data) => {
    return await instance.post("/register", data)
}

export const loginRequest = async (data) => {
    return await instance.post("/logIn", data)
}
import instance from "./axios.js";

export const registerRequest = data => {
    instance.post("/register", data)
}

export const loginRequest = data => {
    instance.post("/logIn", data)
}
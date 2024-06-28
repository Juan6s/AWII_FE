import axios from 'axios';


export async function login(email, password){
    const data = {email, password}
    const response = await axios.post("http://localhost:3000/login", data);
    localStorage.setItem("auth", response.data)
}

export async function getToken(){
    return localStorage.getItem("auth")
}

export async function deleteToken(){
    localStorage.removeItem("auth")
}
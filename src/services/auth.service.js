import axios from 'axios';


async function login(email, password){
    const data = {email, password}
    const response = await axios.post("http://localhost:3000/login", data);

    localStorage.setItem("auth", response)
}

async function getToken(){
    localStorage.getItem("auth")
}
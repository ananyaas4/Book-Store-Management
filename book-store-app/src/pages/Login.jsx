import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const Login = ()=>{
    const [credentials, setCredentials] = useState({ "username": "", "password": "" });
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("https://iris-chisel-mimosa.glitch.me/login", credentials);
            if(res.data.success){
                login();
                navigate("/books");
            }
            else{
                alert("Invalid credentials")
            }
        }
        catch{
            alert("Login failed!")
        }
    };
    return (
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" onChange={(e)=>setCredentials({...credentials, username: e.target.value})}/>
            <input type="password" placeholder="Password" onChange={(e)=>setCredentials({...credentials, password: e.target.value})}/>
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;
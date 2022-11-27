import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("localuser");
        if (auth)
        {
            navigate("/")
        }
    })


    const saveinfo = async () => {
        console.log(name, email, password)
        let result = await fetch("http://localhost:8000/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            },

        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("localuser", JSON.stringify(result))
        if (result)
        {
            navigate("/");
        }
    }
    return (

        <div>
            <div className='form-container'>
                <h1>Register</h1>
                <input className='input-text' type="text"
                    value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Name' />
                <input className='input-text' type="email"
                    value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
                <input className='input-text' type="password"
                    value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' />
                <button className='btn-signup' onClick={saveinfo}> Sign Up </button>
            </div>

        </div>
    )
}

export default Signup
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem("localuser");
        if (auth)
        {
            navigate("/")
        }
    })

    const handlelogin = async () => {
        console.log("email : ", email, " password : ", password)
        let result = await fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        console.log(result)
        if (result.email)
        {
            localStorage.setItem("localuser", JSON.stringify(result));
            navigate("/")
        }
        else
        {
            alert({ result: "Please Enter Correct Info" })
        }
    }


    return (
        <div>
            <div className='login-container'>
                <h1>
                    Login Page
                </h1>
                <input className='input-text' type="email" placeholder='Email'
                    value={email} onChange={(e) => setemail(e.target.value)} />
                <input className='input-text' type="password" placeholder='Password'
                    value={password} onChange={(e) => setpassword(e.target.value)} />
                <button className='btn-signup' onClick={handlelogin} > Login </button>
                <h5 className='new-user'>New User : <a href='/signup'>Sign up</a></h5>
            </div>
        </div>
    )
}

export default Login
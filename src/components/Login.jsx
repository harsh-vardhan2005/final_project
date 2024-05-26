import './login.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const history = useHistory();
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            history.push("/");
        }
    }, [history]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = props.name === 'login' ? '/login' : '/signup';
        try {
            const response = await axios.post(`http://localhost:4003${endpoint}`, {
                username: formDetails.email,
                password: formDetails.password
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                history.push("/");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    return (
        <section className="section">
            <div className="right">
                <div className="wrapper">
                    <h1>{props.name === 'login' ? 'Login' : 'Sign Up'} to your account</h1>
                    <form onSubmit={handleSubmit} className='form'>
                        <label>
                            Email
                            <input
                                className='input'
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                value={formDetails.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                className='input'
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                value={formDetails.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        {props.name === 'login' && (
                            <button type="submit" className="btn-1">Login Now</button>
                        )}
                        {props.name === 'signup' && (
                            <button type="submit" className="btn-1">Sign Up Now</button>
                        )}
                        <button className="btn-2">
                            <img src="./assets/Google - Original.svg" alt="" />
                            Continue with Google
                        </button>
                    </form>
                    {props.name === 'login' && <p>
                        Don't have an account?
                        <span>
                            <a href="/signup">SignUp</a>
                        </span>
                    </p>}
                    {props.name === 'signup' && <p>
                        Already have an account?
                        <span>
                            <a href="/login">Login</a>
                        </span>
                    </p>}
                </div>
            </div>
        </section>
    )
}

import React, { useState } from "react";
import Layout from "../Layout/Layout";
import Card from "../Card/Card";
import "./styleRegister.css";
import { signUp } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const registerUser = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        };
        dispatch(signUp(user));
    };
    if (auth.authenticate) {
        return <Navigate to={"/"} />;
    }

    return (
        <Layout>
            <div className="registerContainer">
                <Card>
                    <form onSubmit={registerUser}>
                        <h3>Sign Up</h3>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFisrtName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div>
                            <button>Sign Up</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default Register;

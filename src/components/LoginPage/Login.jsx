import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Card from "../Card/Card";
import "./styleLogin.css";
import { useDispatch } from "react-redux";
import { isLoggedInUser, signIn } from "../../redux/actions/actionsAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const loginUser = (e) => {
        e.preventDefault();
        if (email == "" || password == "") {
            alert("Email and Password are required");
            return;
        }
        dispatch(signIn({ email, password }));
    };

    if (auth.authenticate) {
        return <Navigate to={"/"} />;
    }

    return (
        <Layout>
            <div className="loginContainer">
                <Card>
                    <form onSubmit={loginUser}>
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
                            <button>Login</button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default Login;

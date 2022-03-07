import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./redux/actions/actionsAuth";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isLoggedInUser());
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {localStorage.getItem("user") ? (
                        <Route path="/" element={<Home />} />
                    ) : (
                        <Route path="/" element={<Navigate replace to="/login" />} />
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

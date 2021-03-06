import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logOut } from "../../redux/actions/actionsAuth";
import "../Header/styleHeader.css";

const Header = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <div style={{ display: "flex" }}>
                <div className="logo">Web Messenger</div>
                {!auth.authenticate ? (
                    <ul className="leftMenu">
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Sign up</NavLink>
                        </li>
                    </ul>
                ) : null}
            </div>
            <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
                {auth.authenticate ? `Hi ${auth.loggedInUser.firstName} ${auth.loggedInUser.lastName}` : ""}
            </div>
            <ul className="menu">
                {auth.authenticate ? (
                    <li>
                        <Link
                            to={"#"}
                            onClick={() => {
                                dispatch(logOut(auth.loggedInUser.uid));
                            }}>
                            Logout
                        </Link>
                    </li>
                ) : null}
            </ul>
        </header>
    );
};

export default Header;

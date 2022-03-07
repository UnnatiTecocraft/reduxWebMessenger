import React from "react";
import "./styleCard.css";

const Card = (props) => {
    return <div className="card">{props.children}</div>;
};

export default Card;

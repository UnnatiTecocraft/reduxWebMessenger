import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = (props) => {
    return <Route path={props.path} component={props.component} />;
};

export default PrivateRoute;

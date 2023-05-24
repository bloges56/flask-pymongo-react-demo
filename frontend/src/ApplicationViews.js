import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Users from "./Components/Users"

export const ApplicationViews = (props) => {

    return (
        <Switch>
            <Route path="/" element={<Users />} />
        </Switch>
    );
};
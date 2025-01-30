import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const PrivateRoute = ({Children}) => {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? Children : <Navigate to="/login"/>
};
export default PrivateRoute;
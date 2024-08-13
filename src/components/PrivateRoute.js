// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, user }) => {
    return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;

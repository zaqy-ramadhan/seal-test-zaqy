import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import EditAdminPage from './pages/EditAdminPage';
import Navigation from './components/Navigation'; // Make sure to import the Navigation component

const App = () => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    console.log(token);
    useEffect(() => {
        // Retrieve user information from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <Navigation user={user} onLogout={handleLogout} />
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to="/employees" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/employees" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/employees/*"
                    element={user ? <EmployeePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/admin/edit"
                    element={user ? <EditAdminPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;

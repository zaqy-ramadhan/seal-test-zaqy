import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiMoon, FiSun, FiComputer } from 'react-icons/fi';
import { logout, fetchAdmin } from '../services/api';

const Navigation = ({ user, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true); // State for loading
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); // Call the API logout function
            onLogout(); // Call the parent onLogout function
            navigate('/'); // Redirect to home
        } catch (error) {
            console.error('Error during logout:', error.message);
            alert('Failed to logout. Please try again.');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const fetchUserData = async () => {
        try {
            const response = await fetchAdmin(); // Fetch user data
            // If response.data contains user data, set it to user
            if (response.data) {
                // Update user data if needed
            } else {
                // Handle the case when no user data is found
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    if (loading) {
        return <div className="bg-gray-800 text-white p-4 shadow-md">Loading...</div>;
    }

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-semibold hover:text-gray-300">
                        Home
                    </Link>
                    {user && (
                        <Link to="/employees" className="hover:text-gray-300">
                            Employees
                        </Link>
                    )}
                </div>
                {user && (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            <span>{user.name}</span>
                            <FiUser size={20} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48">
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/admin/edit"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <FiUser size={16} />
                                                <span>Edit Admin</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <FiLogOut size={16} />
                                                <span>Logout</span>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;

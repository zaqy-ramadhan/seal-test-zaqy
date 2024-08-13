import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdmin, updateAdmin } from '../services/api';

const EditAdminPage = () => {
    const [admin, setAdmin] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetchAdmin();
                // console.log('Admin data:', response.data); // Log response data
                setAdmin(response.data);
                setName(response.data?.name || ''); // Handle undefined
                setEmail(response.data?.email || ''); // Handle undefined
                setId(response.data?.id || ''); // Handle undefined
            } catch (error) {
                console.error('Error fetching admin data:', error.message);
            }
        };

        fetchAdminData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Submitting data:', { name, email, id }); // Log the data being sent
        try {
            await updateAdmin({ name, email }, id);
            alert('Admin updated successfully.');
            navigate('/');
        } catch (error) {
            console.error('Error updating admin:', error.message);
            alert('Failed to update admin.');
        }
    };

    if (!admin) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Edit Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAdminPage;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { getEmployeeById, updateEmployee, getDivisions } from '../services/api'; // Import API functions

const EmployeeDetails = () => {
    const { id } = useParams(); // Get the employee ID from URL params
    const navigate = useNavigate(); // Initialize useNavigate
    const [employee, setEmployee] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [division, setDivision] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState(null);
    const [divisions, setDivisions] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data.data.employee);
                setName(data.data.employee.name);
                setPhone(data.data.employee.phone);
                setDivision(data.data.employee.division_id);
                setPosition(data.data.employee.position);
            } catch (error) {
                console.error('Error fetching employee details:', error.response?.data?.message || error.message);
            }
        };

        const fetchDivisions = async () => {
            try {
                const data = await getDivisions();
                setDivisions(data.data.divisions); // Assuming response data has a 'divisions' field
            } catch (error) {
                console.error('Error fetching divisions:', error.response?.data?.message || error.message);
            }
        };

        fetchEmployee();
        fetchDivisions();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('division', division);
        formData.append('position', position);
        if (image) {
            formData.append('image', image);
        }

        try {
            await updateEmployee(id, formData);
            // Redirect to the employee list page after successful update
            navigate('/employees');
        } catch (error) {
            console.error('Error updating employee:', error.response?.data?.message || error.message);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Division</label>
                        <select
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="">Select a division</option>
                            {divisions.map((div) => (
                                <option key={div.id} value={div.id}>
                                    {div.name} {/* Adjust according to your division object structure */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeDetails;

import { useState, useEffect } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/api';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi'; // Import icons from react-icons

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEmployeesList = async (page = currentPage) => {
        try {
            const response = await fetchEmployees(page, 10, nameFilter);
            setEmployees(response.data.employees);
            setFilteredEmployees(response.data.employees);
            setTotalPages(response.pagination.last_page);
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        }
    };

    useEffect(() => {
        fetchEmployeesList();
    }, [currentPage, nameFilter]);

    useEffect(() => {
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [nameFilter, employees]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
        if (confirmed) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp.id !== id));
                fetchEmployeesList();
                alert('Employee deleted successfully.');
            } catch (error) {
                console.error('Error deleting employee:', error.message);
                alert('Failed to delete employee.');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Employees</h1>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <Link to="/employees/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center space-x-2 min-w-[150px] mb-4 sm:mb-0">
                        <FiPlus size={20} />
                        <span>Add Employee</span>
                    </Link>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/3"
                    />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEmployees.map(emp => (
                            <tr key={emp.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                    <img src={`http://localhost:8000/storage/${emp.image}`} alt={emp.name} className="w-12 h-12 rounded-full object-cover mx-auto" />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {emp.name}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {emp.phone}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {emp.division ? emp.division.name : 'N/A'}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {emp.position}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                                    <Link to={`/employees/${emp.id}`} className="text-indigo-600 hover:text-indigo-900">
                                        <FiEdit size={20} />
                                    </Link>
                                    <button onClick={() => handleDelete(emp.id)} className="text-red-500 hover:text-red-700">
                                        <FiTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 mb-4 sm:mb-0"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600 mb-4 sm:mb-0">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;

import { Route, Routes } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeDetails from '../components/EmployeeDetails';
import EmployeeForm from '../components/EmployeeForm';

const EmployeePage = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path=":id" element={<EmployeeDetails />} />
            <Route path="new" element={<EmployeeForm />} />
        </Routes>
    );
};

export default EmployeePage;

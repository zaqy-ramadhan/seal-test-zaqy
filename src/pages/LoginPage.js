import AuthForm from '../components/AuthForm';

const LoginPage = ({ onLogin }) => {
    return (
        <div className="container mx-auto p-4">
            <AuthForm onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;

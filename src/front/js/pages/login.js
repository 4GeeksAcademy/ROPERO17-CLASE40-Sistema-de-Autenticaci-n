import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(null);
    const { actions } = useContext(Context);
    const navigate = useNavigate();  // Hook para redirigir

    const onChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const loginUser = async (event) => {
        event.preventDefault();
        setLoginError(null); // Clear previous error

        const loginSuccess = await actions.login(user.username, user.password);

        if (loginSuccess) {
            navigate("/pages/menu");  // Redirigir al menú si el login es exitoso
        } else {
            setLoginError("Invalid username or password"); // Set error message
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="login-card card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Sign In</h2>
                
                {loginError && <div className="alert alert-danger">{loginError}</div>} {/* Error display */}
                
                <form onSubmit={loginUser}>
                    <div className="form-group mb-3">
                        <label htmlFor="usernameInput">Username</label>
                        <input
                            type="text"
                            id="usernameInput"
                            name="username"
                            className="form-control"
                            value={user.username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="passwordInput">Password</label>
                        <input
                            type="password"
                            id="passwordInput"
                            name="password"
                            className="form-control"
                            value={user.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    
                    <div className="text-center mt-3">
                        <a href="/password-reset-request" className="text-muted">Forgot your password?</a>
                    </div>
                    <div className="text-center mt-3">
                        <a href="/pages/create" className="text-muted">You don’t have an account?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
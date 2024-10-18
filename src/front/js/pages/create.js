import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Create = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState(null); // Para manejar errores
    const { actions } = useContext(Context);
    const navigate = useNavigate(); // Para redirigir después de la creación

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Intentar crear el nuevo usuario a través de la acción del contexto
        const success = await actions.createUser(newUser.username, newUser.email, newUser.password);

        if (success) {
            navigate("/menu"); // Redirige al menú tras la creación del usuario
        } else {
            setError("There was an error creating the user. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Create New User</h2>
                
                {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={newUser.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={newUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={newUser.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Create User</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
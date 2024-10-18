import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Menu = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate(); // Para redirigir después de cerrar sesión

    const handleLogout = () => {
        actions.logout(); // Llama a la acción para cerrar sesión
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    return (
        <div className="menu-container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <h1>Gracias por iniciar sesión</h1>
            <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
};

export default Menu;
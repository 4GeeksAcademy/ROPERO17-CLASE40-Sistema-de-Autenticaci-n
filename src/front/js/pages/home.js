

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Login } from "./login";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Inicializa useNavigate

    // Función para redirigir al signup
    const handleSignupRedirect = () => {
        navigate("/signup"); // Redirige a /signup
    };

    return (
        <>
            <Login />
            <div className="mt-3 text-center">
                <button 
                    className="btn btn-secondary" 
                    onClick={handleSignupRedirect}
                >
                    ¿No tienes una cuenta? Regístrate
                </button>
            </div>
        </>
    );
};
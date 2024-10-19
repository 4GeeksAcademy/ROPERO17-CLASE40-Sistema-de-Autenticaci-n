

const getState = ({ getStore, getActions, setStore }) => {
	return {
		
		        store: {
			       token: localStorage.getItem("token") || null, // Recuperar token de localStorage si ya existe
			         user: {
				        username: null,
				        email: null,
				        role: "user"
			    },
			    isAuthenticated: !!localStorage.getItem("token"), // Verificar si hay token para saber si está autenticado
			    authError: null, // Guardar errores de autenticación
			    redirectTo: "/menu"
				},
				actions: {
					createUser: async (username, email, password) => {
						try {
							const response = await fetch(`${process.env.BACKEND_URL}/pages/create`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({ username, email, password })
							});
							if (!response.ok) {
								throw new Error("Error en la creación del usuario");
							}
							const data = await response.json();
							return true; // Si el usuario se creó correctamente
						} catch (error) {
							console.error(error);
							return false;
						}
					},
				
					loginUser: async (username, password) => {
						try {
							const response = await fetch(`${process.env.BACKEND_URL}/pages/login`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({ username, password })
							});
							if (!response.ok) {
								throw new Error("Error en el inicio de sesión");
							}
							const data = await response.json();
							localStorage.setItem("token", data.access_token); // Almacena el token en localStorage
							return true; // Login exitoso
						} catch (error) {
							console.error(error);
							return false; // Error en el login
						}
					},
					
				}
			}
}	
		

export default getState;

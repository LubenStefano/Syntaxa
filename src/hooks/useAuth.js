import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useErrorHandler } from './useErrorHandler';
import { showMessage } from "../utils/messageHandler";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const { handleError } = useErrorHandler();

    const register = async (email, password, additionalData) => {
        try {
            setError(null);
            await request.registerUser(email, password, additionalData);

            const loggedInUser = await request.loginUser(email, password);

            setUser(loggedInUser); 

            showMessage("success", "Registration successful!", "You have registered successfully"); 
            navigate("/");
            return loggedInUser;
        } catch (err) {
            handleError(err, 'Registration failed.');
            setError(err.message);
        }
    };

    return { register, error };
};

export const useLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const { handleError } = useErrorHandler();

    const login = async (email, password) => {
        try {
            setError(null);
            const userData = await request.loginUser(email, password);
            
            setUser(userData); 
            navigate("/");

            return userData;
        } catch (err) {
            handleError(err, 'Login failed.');
            setError(err.message);
        }
    };

    return { login, error };
};

export const useLogout = () => {
    const { clearUser } = useUser();
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const logout = async () => {
        try {
            await request.logoutUser();
            clearUser(); 
            navigate("/"); 
        } catch (err) {
            handleError(err, 'Logout failed.');
            console.error("Logout error:", err);
        }
    };

    return { logout };
};

export const useUserById = (userId) => {
    const [userById, setUserById] = useState(null);
    const [error, setError] = useState(null);
    const { handleError } = useErrorHandler();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await request.getUserById(userId);
                setUserById(userData);
            } catch (err) {
                handleError(err, 'Fetch user by ID failed.');
                console.error("Error fetching user:", err);
                setError(err.message);
            }
        };

        fetchUser();
    }, [userId, handleError]);

    return { userById , error };
};
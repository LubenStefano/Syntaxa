import { useEffect, useState } from "react";
import { request } from "../utils/request";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { showMessage } from "../utils/messageHandler";
import { useNotification } from "../components/shared/Notification/useNotification";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 

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
            setError(err.message || 'An unexpected error occurred.');
            throw err; // Throw the error to be handled by the caller
        }
    };

    return { register, error };
};

export const useLogin = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const { addNotification } = useNotification();

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await request.loginUser(email, password, addNotification);

            if (response.error) {
                setError(response.error); // Set the error message
                return;
            }

            setUser(response); 
            navigate("/");
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        }
    };

    return { login, error };
};

export const useLogout = () => {
    const { clearUser } = useUser();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await request.logoutUser();
            clearUser(); 
            navigate("/"); 
        } catch (err) {
            throw new Error("Logout error:", err); // Log the error for debugging
        }
    };

    return { logout };
};

export const useUserById = (userId) => {
    const [userById, setUserById] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await request.getUserById(userId);
                setUserById(userData);
            } catch (err) {
                setError(err.message || 'An unexpected error occurred.');
            }
        };

        fetchUser();
    }, [userId]);

    return { userById , error };
};
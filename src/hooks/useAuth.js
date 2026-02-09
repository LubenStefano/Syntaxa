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

export const useDeleteUser = () => {
    const [error, setError] = useState(null);
    const { user, setUser } = useUser(); 
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const deleteUser = async () => {
        try {
            setError(null);
            await request.deleteUser(user.id); 
            setUser(null); 
            await request.logoutUser(); 
            showMessage("success", "User deleted successfully!", "Your account has been deleted."); 
            navigate("/");
        } catch (err) {
            handleError(err, 'Delete user failed.');
            setError(err.message);
        }
    };

    return { deleteUser, error };
};

export const useUpdateUser = () => {
    const { user, setUser } = useUser();
    const { handleError } = useErrorHandler();

    const updateUser = async (updatedData) => {
        try {
            const updatedUser = await request.updateUser(user.id, updatedData);
            setUser({ ...user, ...updatedUser }); 
            showMessage("success", "User updated successfully!", "Your profile has been updated."); 
        } catch (err) {
            handleError(err, 'Update user failed.');
            console.error("Update user error:", err);
        }
    };

    return { updateUser };
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
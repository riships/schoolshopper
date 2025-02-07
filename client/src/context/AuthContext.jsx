import axios from "axios";
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
const url = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get('token') || '');

    const loginAction = async (data) => {
        try {
            const response = await axios.post(url + '/api/users/login', data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token || ''
                    }
                });
            const newToken = response.data.token;
            setToken(newToken);
            Cookies.set("token",
                newToken,
                {
                    expires: 1 / 12,
                    secure: true,
                    sameSite: "Strict"
                });
            return response.data.success;
        } catch (error) {
            toast.error(error.response.data.message)
            return error.response.data.success;
        }
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        Cookies.remove("token");
    };


    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;


export const useAuth = () => {
    return useContext(AuthContext);
}
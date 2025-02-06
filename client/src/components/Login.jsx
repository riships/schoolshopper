import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';
const url = import.meta.env.VITE_API_URL;


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const userCredentials = {
                email,
                password,
            }
            const response = await axios.post(`${url}/api/users/login`, userCredentials,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': `${Cookies.get('token')}`
                    }
                }
            );
            Cookies.set("token", response.data.token, { expires: 60 * 60 * 1000 });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
                <h2 className="mb-6 font-bold text-2xl text-center text-gray-700">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 w-full outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 w-full outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg w-full font-medium text-white transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-500 text-sm">
                    Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;

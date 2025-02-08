import { useEffect, useState } from "react";
import loginLeftImg from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const token = location?.state?.token || null;

    useEffect(() => {
        if (auth.user) {
            navigate('/home');
        } else if (!token) {
            navigate('/')
        } else if (!auth.user && !token) {
            navigate('/')
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== newPassword) {
                toast.error('Passwords do not match');
                return;
            }
            if (password) {
                const reset = await axios.put(`${url}/api/users/resetpassword/${token}`, { password })
                if (reset.data.success) {
                    toast.success('Password reset successfully');
                    navigate('/')
                } else {
                    toast.error(reset.data.message);
                }
            } else {
                toast.error('Please fill all fields');
            }
        } catch (error) {
            toast.error(error.response.data.message || 'Error resetting password');
            // navigate('/')
        }
    }

    function handleOnChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value);
        } else if (name === "newPassword") {
            setnewPassword(value);
        }

    }
    return (
        <Row className=''>
            <ToastContainer />
            <Col md={8}>
                <img className='min-vh-100 img-fluid' src={loginLeftImg} />
            </Col>
            <Col md={4}>
                <div className='d-flex flex-column justify-content-center align-item-center px-5 h-100 text-center'>
                    <img src={logo} className="mx-auto mb-4 w-50 img-fluid" alt="logo icon" />
                    <h5 className='mb-3 text-[#212529]' style={{ fontWeight: '700' }}>Welcome to School Shopper</h5>
                    <h6 className='mb-1' style={{ fontWeight: '700' }}>RESET YOUR PASSWORD</h6>
                    <p className="text-gray-500">Enter your new password to reset it for your account.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="password" onChange={handleOnChange} name="password" className='form-control mb-3' placeholder='New Password' />
                        <input type="password" onChange={handleOnChange} name="newPassword" className='form-control mb-3' placeholder='Re-enter Password' />
                        <Button type="submit" className='w-100 btn btn-dark'>Reset Password</Button>
                    </form>
                </div>
            </Col>
        </Row>
    )

}

export default ResetPassword;

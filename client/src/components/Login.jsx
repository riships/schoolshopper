import { useState } from "react";
import loginLeftImg from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email || password) {
            const login = await auth.loginAction({ email, password });
            if (login) {
                navigate('/home');
            }
        } else {
            toast.error('Please fill all fields');
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
                    <h5 className='mb-3'>Welcome to School Shopper</h5>
                    <h6 className='mb-1'>LOGIN TO YOUR ACCOUNT</h6>
                    <p>Enter your registered email and password to login to your account</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" className='form-control mb-3' placeholder='Enter Username' />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" className='form-control mb-1' placeholder='Enter Username' />
                        <div className='d-flex justify-content-between align-item-center'>
                            <div>
                                <input type="checkbox" className='me-2' />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <div>
                                <a href="#" className='text-primary text-decoration-none'>Forget Password?</a>
                            </div>
                        </div>
                        <Button type="submit" className='mt-3 w-100 btn btn-dark'>Login to Continue </Button>
                    </form>
                </div>
            </Col>
        </Row>
    )

}

export default Login;

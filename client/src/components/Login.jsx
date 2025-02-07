import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';
import loginLeftImg from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { Row, Col, Button } from 'react-bootstrap'
const url = import.meta.env.VITE_API_URL;


function Login() {
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
        <Row className=''>
            <Col md={8}>
                <img className='img-fluid min-vh-100' src={loginLeftImg} />
            </Col>
            <Col md={4}>
                <div className='text-center d-flex align-item-center justify-content-center flex-column h-100 px-5'>
                    <img src={logo} className="mb-4 mx-auto w-50 img-fluid" alt="logo icon" />
                    <h5 className='mb-3'>Welcome to School Shopper</h5>
                    <h6 className='mb-1'>LOGIN TO YOUR ACCOUNT</h6>
                    <p>Enter your registered email and password to login to your account</p>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" onClick={(e) => setEmail(e.target.value)} name="email" className='form-control mb-3' placeholder='Enter Username' />
                        <input type="password" onClick={(e) => setPassword(e.target.value)} name="password" className='form-control mb-1' placeholder='Enter Username' />
                        <div className='d-flex align-item-center justify-content-between'>
                            <div>
                                <input type="checkbox" className='me-2' />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <div>
                                <a href="#" className='text-primary text-decoration-none'>Forget Password?</a>
                            </div>
                        </div>
                        <Button className='btn btn-dark w-100 mt-3'>Login to Continue </Button>
                    </form>
                </div>
            </Col>
        </Row>
    )

}

export default Login;

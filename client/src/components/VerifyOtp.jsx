import { useEffect, useState } from "react";
import loginLeftImg from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.user) {
            navigate('/home');
        }
    }, [auth.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const verifyUser = async () => {
        try {
            const verify = await axios.post(url + "/api/users/forgetpassword", { email });
            if (verify.data.status === 200) {
                toast.success("Email sent successfully");
                navigate('/verifyOtp');
            } else {
                toast.error("Invalid email");
            }

        } catch (error) {
            toast.error(error.response.data.message);
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
                    <h5 className='mb-3 text-[#212529]' style={{ fontWeight: '700' }}>Forgot Password?</h5>
                    <h6 className='mb-1' style={{ fontWeight: '700' }}>ENTER OTP FOR VERIFICATION</h6>
                    <p className="text-gray-500">Enter the OTP sent on your registered email ID for verification</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" className='form-control mb-3' placeholder='Enter Username' />
                        <Button type="submit" className='mt-3 w-100 btn btn-dark'>Send OTP</Button>
                    </form>
                </div>
            </Col>
        </Row>
    )

}

export default ForgotPassword;

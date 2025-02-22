import { useEffect } from "react";
import loginLeftImg from '../assets/images/login.png';
import logo from '../assets/images/logo.png';
import { Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import OtpInput from "./OtpInput";
import { useLocation } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;

function VerifyOtp() {
    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation()
    const email = location?.state?.email || null;

    useEffect(() => {
        if (auth.user) {
            navigate('/home');
        } else if (!email) {
            navigate('/');
        }
    }, [auth.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            onOtpChange();
        }
    }

    const onOtpChange = async (otp) => {
        try {
            if (!otp) {
                toast.error("Please enter OTP");
                return;
            }

            const response = await axios.post(`${url}/api/users/verify`, { email, otp });

            if (response.status === 200) {
                toast.success("OTP verified successfully");
                navigate('/resetPassword', { state: { token: response.data.token } });
            } else {
                toast.error("Invalid OTP");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


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
                        <OtpInput onOtpChange={onOtpChange} />
                        <Button type="submit" className='mt-3 w-100 btn btn-dark'>Submit OTP</Button>
                    </form>
                </div>
            </Col>
        </Row>
    )

}

export default VerifyOtp;

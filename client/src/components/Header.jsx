import React from 'react'
import { Form } from 'react-bootstrap';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAuth } from '../context/AuthContext';

function Header() {
    const auth = useAuth();
    
    return (
        <>
            <div className="flex justify-between shadow-xl px-2 py-2 align-center">
                <div className="relative search_bar">
                    <HiMagnifyingGlass className='top-[12px] left-[10px] absolute' />
                    <Form.Control className='ps-5' placeholder='Search here...' />
                </div>
                <div className="nav">
                    <ul className='flex'>
                        <li><a href="#">Home</a></li>
                        <li>
                            <div className='flex flex-col'>
                                <p className='mb-0 font-[500] text-[14px]'>{auth.user?.name}</p>
                                <p className='mb-0 text-[12px]'>{auth.user?.name}</p>
                            </div>
                        </li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
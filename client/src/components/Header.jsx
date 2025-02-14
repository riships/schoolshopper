import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import searchIcon from '../assets/images/search-icon-header.svg';
import bellIcon from '../assets/images/bell-icon.svg';
import defaultAvtar from '../assets/images/avtar.png';
import logoutIcon from '../assets/images/logout-icon.svg';
import profileIcon from '../assets/images/profile-icon.svg';
import passwordIcon from '../assets/images/change-pass-icon.svg';
import profilePhoneIcon from '../assets/images/profile-phone.svg';
import profileMailIcon from '../assets/images/profile-mail-icon.svg';


function Header() {
    const auth = useAuth();
    console.log(auth)
    const [profileIsActive, setProfileIsIsActive] = useState(false);

    const profiletoggleClass = () => {
        setProfileIsIsActive(!profileIsActive);
    };

    return (
        <>
            {/* <div className="flex justify-between shadow-xl px-2 py-2 align-center">
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
            </div> */}

            <header className="main-header">
                <div className="header-inn">
                    <Sidebar />
                    <div className="header-right">
                        <div className='row align-items-center'>
                            <div className="col-6">
                                <div className="search-are">
                                    <div className="header-searchbar">
                                        <img src={searchIcon} alt="Search Icon" className='search-icon' />
                                        <input type="text" placeholder="Search here..." className='header-search' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='header-right-nav'>
                                    <div className='notification-are have-notification'>
                                        <img src={bellIcon} className='bell-icon' alt="Notification Icon" />
                                        <div className='all-notification'></div>
                                    </div>
                                    <div className='profile-are'>
                                        <div className="main-profile-tp" onClick={profiletoggleClass}>
                                            <div className='prifile-cont'>
                                                <h4>{auth.user?.name}</h4>
                                                <p> {auth.user?.role}</p>
                                            </div>
                                            <div className='profile-img'>
                                                <img className='user-image' src={auth.user?.avatar} alt="User Image" />
                                            </div>
                                        </div>
                                        <div className={`profile-dropdown ${profileIsActive ? "show" : ""}`}>
                                            <div className='profile-dropdown-inner'>
                                                <div className='inner-head'>
                                                    <div className='profile-img'>
                                                        <img className='user-image' src={auth.user?.avatar} alt="User Image" />
                                                    </div>
                                                    <div className='prifile-cont'>
                                                        <h4>{auth.user?.name}</h4>
                                                        <p> {auth.user?.role}</p>
                                                    </div>
                                                </div>
                                                <div className='inner-body'>
                                                    <ul>
                                                        <li><a><img src={profileIcon} />My Profile</a></li>
                                                        <li><a><img src={passwordIcon} />Change Password</a></li>
                                                    </ul>
                                                </div>
                                                <div className='inner-footer'>
                                                    <h4>Support</h4>
                                                    <ul className='support-list'>
                                                        {auth.user?.phone !== "" ? <li><a><img src={profilePhoneIcon} /> {auth.user?.phone}</a></li> : ""}
                                                        {auth.user?.email !== "" ? <li><a><img src={profileMailIcon} /> {auth.user?.email}</a></li> : ""}
                                                    </ul>
                                                </div>
                                            </div>
                                            <button onClick={() => auth.logOut()} className="btn-logout">
                                                <img src={logoutIcon} alt='Logout Icon' /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
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
import menuItems from "../utils/headerAction";


function Header() {
    const auth = useAuth();
    const [profileIsActive, setProfileIsActive] = useState(false);
    const dropdownRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [searhContainer, setSearchContainer] = useState(false);

    const profiletoggleClass = () => {
        setProfileIsActive(!profileIsActive);
    };

    const hideSearchContainer = () => {
        setSearchContainer(false);
        setSearchQuery('');
    }

    const handleSearch = () => {
        const filtered = [];

        menuItems.forEach((item) => {
            const isMainMatch = item.title.toLowerCase().includes(searchQuery);
            const filteredSubMenu = item.subMenu?.filter((sub) =>
                sub.title.toLowerCase().includes(searchQuery)
            ) || [];
            if (isMainMatch) {
                filtered.push({ ...item, isSubMenu: false });
            }
            filteredSubMenu.forEach((sub) => {
                filtered.push({ ...sub, parentTitle: item.title, isSubMenu: true });
            });
        });

        setFilteredItems(filtered);
    };


    useEffect(() => {
        handleSearch();
        setSearchContainer(true);
    }, [searchQuery]);




    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="main-header">
                <div className="header-inn">
                    <Sidebar />
                    <div className="header-right">
                        <div className='row align-items-center'>
                            <div className="col-6">
                                <div className="search-are">
                                    <div className="header-searchbar">
                                        <img src={searchIcon} alt="Search Icon" className='search-icon' />
                                        <input onKeyUp={(event) => setSearchQuery(event.target.value.toLowerCase())} type="text" onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search here..." className='header-search' value={searchQuery} />
                                    </div>
                                    {searchQuery != '' && searhContainer ?
                                        <div className="searchbar-container">
                                            <ul className="custom-scroll">
                                                {filteredItems.length > 0 ? (
                                                    filteredItems.map((item, index) => (

                                                        <li key={index}>
                                                            {
                                                                item.subMenu && item.subMenu.length > 0
                                                                    ? <Link to={item.subMenu[0].link} onClick={hideSearchContainer}>{item.title}</Link>
                                                                    : <Link to={item.link} onClick={hideSearchContainer}>{item.title}</Link>
                                                            }
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li><a>No matching items found</a></li>)}
                                            </ul>
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='header-right-nav'>
                                    <div className='notification-are have-notification'>
                                        <img src={bellIcon} className='bell-icon' alt="Notification Icon" />
                                        <div className='all-notification'></div>
                                    </div>
                                    <div ref={dropdownRef} className='profile-are'>
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
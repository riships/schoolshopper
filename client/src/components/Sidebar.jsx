import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import menuItems from "../utils/headerAction";
import sidebarLogo from '../assets/images/sidebar-logo.svg';


function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(null);
    const location = useLocation();

    const toggleClass = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="sidebar-are">
            <div className="sidebar-head">
                <img src={sidebarLogo} alt="Header Logo" />
            </div>
            <div className="sidebar-navbar">
                <ul className="man-navbar">
                    {menuItems.map((menu, index) => {

                        const isSubMenuActive = menu.subMenu.some(sub => sub.link === location.pathname);


                        return (<li key={menu.id} className={`nav-item ${menu.subMenu.length ? "has-sub-nav" : ""}`}>

                            {menu.subMenu.length > 0 ? (
                                <>
                                    <a
                                        onClick={() => menu.subMenu.length && toggleClass(index)}
                                        className={`nav-link-btn ${activeIndex === index || isSubMenuActive ? "active" : ""}`}
                                        href={menu.link || "#"}
                                    >
                                        <img src={menu.icon} alt={`${menu.title} Icon`} />
                                        <span>{menu.title}</span>
                                    </a>

                                    <ul className="sub-nav">
                                        {menu.subMenu.map((sub) => (
                                            <li key={sub.id} className="nav-item">
                                                <NavLink className='nav-link-btn' to={sub.link || "#"}>
                                                    <span>{sub.title}</span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) :
                                (<NavLink className='nav-link-btn' to={menu.link || "#"}>
                                    <img src={menu.icon} alt={`${menu.title} Icon`} />
                                    <span>{menu.title}</span>
                                </NavLink>)
                            }
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;

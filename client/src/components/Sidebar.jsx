import React, { useState } from "react";
import dashIcon from '../assets/images/sidebar-dash-icon.svg';
import inventoryIcon from '../assets/images/sidebar-inventory-icon.svg';
import confIcon from '../assets/images/sidebar-conf-icon.svg';
import reportIcon from '../assets/images/sidebar-report-icon.svg';
import userIcon from '../assets/images/sidebar-user-icon.svg';
import sidebarLogo from '../assets/images/sidebar-logo.svg';

const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        icon: dashIcon,
        link: "#",
        subMenu: []
    },
    {
        id: 2,
        title: "Inventory",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Item", link: "#" },
            { id: 2, title: "Item Group", link: "#" },
            { id: 3, title: "Stock Adjustment", link: "#" },
            { id: 4, title: "Stock Alert", link: "#" }
        ]
    },
    {
        id: 3,
        title: "Purchase",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Vendor", link: "#" },
            { id: 2, title: "Purchase Order", link: "#" },
            { id: 3, title: "Purchase Receives", link: "#" },
            { id: 5, title: "Purchase Invoice", link: "#" },
            { id: 6, title: "Purchase Return", link: "#" },
            { id: 7, title: "Vendor Payment", link: "#" }
        ]
    },
    {
        id: 4,
        title: "Sale",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Customer", link: "#" },
            { id: 2, title: "Sales Order", link: "#" },
            { id: 3, title: "Sales Invoice", link: "#" },
            { id: 5, title: "Payment Received", link: "#" },
            { id: 6, title: "Shipment", link: "#" },
            { id: 7, title: "Packages", link: "#" },
            { id: 8, title: "Sale Return", link: "#" },
            { id: 8, title: "Credit Note", link: "#" }
        ]
    },
    {
        id: 5,
        title: "User",
        icon: userIcon,
        link: "#",
        subMenu: []
    },
    {
        id: 6,
        title: "Report",
        icon: reportIcon,
        link: "#",
        subMenu: []
    },
    {
        id: 7,
        title: "Configuration",
        icon: confIcon,
        link: "#",
        subMenu: []
    }
];

function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(null);

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
                    {menuItems.map((menu, index) => (
                        <li key={menu.id} className={`nav-item ${menu.subMenu.length ? "has-sub-nav" : ""}`}>
                            <a
                                onClick={() => menu.subMenu.length && toggleClass(index)}
                                className={`nav-link-btn ${activeIndex === index ? "active" : ""}`}
                                href={menu.link || "#"}
                            >
                                <img src={menu.icon} alt={`${menu.title} Icon`} />
                                <span>{menu.title}</span>
                            </a>

                            {menu.subMenu.length > 0 && activeIndex === index && (
                                <ul className="sub-nav">
                                    {menu.subMenu.map((sub) => (
                                        <li key={sub.id} className="nav-item">
                                            <a className="nav-link-btn" href={sub.link}>
                                                <span>{sub.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;

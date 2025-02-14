import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
        link: "/dashboard",
        subMenu: []
    },
    {
        id: 2,
        title: "Inventory",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Item", link: "/inventory/item" },
            { id: 2, title: "Item Group", link: "/inventory/item-group" },
            { id: 3, title: "Stock Adjustment", link: "/inventory/stock-adjustment" },
            { id: 4, title: "Stock Alert", link: "/inventory/stock-alert" }
        ]
    },
    {
        id: 3,
        title: "Purchase",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Vendor", link: "/purchase/vendor" },
            { id: 2, title: "Purchase Order", link: "/purchase/purchase-order" },
            { id: 3, title: "Purchase Receives", link: "/purchase/purchase-receives" },
            { id: 5, title: "Purchase Invoice", link: "/purchase/purchase-invoice" },
            { id: 6, title: "Purchase Return", link: "/purchase/purchase-return" },
            { id: 7, title: "Vendor Payment", link: "/purchase/vendor-payment" }
        ]
    },
    {
        id: 4,
        title: "Sale",
        icon: inventoryIcon,
        subMenu: [
            { id: 1, title: "Customer", link: "/sale/customer" },
            { id: 2, title: "Sales Order", link: "/sale/sales-order" },
            { id: 3, title: "Sales Invoice", link: "/sale/sales-invoice" },
            { id: 5, title: "Payment Received", link: "/sale/payment-received" },
            { id: 6, title: "Shipment", link: "/sale/shipment" },
            { id: 7, title: "Packages", link: "/sale/packages" },
            { id: 8, title: "Sale Return", link: "/sale/sale-return" },
            { id: 9, title: "Credit Note", link: "/sale/credit-note" }
        ]
    },
    {
        id: 5,
        title: "User",
        icon: userIcon,
        link: "/user",
        subMenu: []
    },
    {
        id: 6,
        title: "Report",
        icon: reportIcon,
        link: "/report",
        subMenu: []
    },
    {
        id: 7,
        title: "Configuration",
        icon: confIcon,
        link: "Configuration",
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

                            {menu.subMenu.length > 0 ? (
                                <>
                                    <a
                                        onClick={() => menu.subMenu.length && toggleClass(index)}
                                        className={`nav-link-btn ${activeIndex === index ? "active" : ""}`}
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
                                <NavLink className='nav-link-btn' to={menu.link || "#"}>
                                    <img src={menu.icon} alt={`${menu.title} Icon`} />
                                    <span>{menu.title}</span>
                                </NavLink>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;

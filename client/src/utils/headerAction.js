import dashIcon from '../assets/images/sidebar-dash-icon.svg';
import inventoryIcon from '../assets/images/sidebar-inventory-icon.svg';
import confIcon from '../assets/images/sidebar-conf-icon.svg';
import reportIcon from '../assets/images/sidebar-report-icon.svg';
import userIcon from '../assets/images/sidebar-user-icon.svg';


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
        link: "",
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
        link: "",
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
        link: "",
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

export default menuItems;
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function CustomDropdown({ placeholder, options }) {
    return (
        <Dropdown >
            <Dropdown.Toggle variant="action" id="dropdown-basic">{placeholder}</Dropdown.Toggle>
            <Dropdown.Menu>
                {options.map((option) => {
                    const { icon, name, url } = option;
                    return (
                        <Link className='dropdown-item' to={url}><img src={icon ? icon : ""} className='me-1 w-[15px]' /><span className='ms-10'>{name}</span></Link>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown;
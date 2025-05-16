import React from 'react'
import { Dropdown } from 'react-bootstrap';


function CustomDropdown() {
    return (
        <Dropdown >
            <Dropdown.Toggle variant="action" id="dropdown-basic"></Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown
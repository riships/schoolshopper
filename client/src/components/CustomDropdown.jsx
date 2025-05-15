import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  width: ${(props) => props.buttonWidth || '200px'};
  padding: 10px 12px;
  background-color: ${(props) => props.bg || 'transparent'};
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hover || 'transparent'};
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.menuWidth || '200px'};
  margin-top: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
`;

const DropdownItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CustomDropdown = ({
    options = [],
    onSelect = () => { },
    placeholder = 'Select an option',
    buttonWidth,
    menuWidth,
    bg,
    hover,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownToggle
                onClick={toggleDropdown}
                bg={bg}
                hover={hover}
                buttonWidth={buttonWidth}
            >
                {selectedOption ? selectedOption.label : placeholder}
            </DropdownToggle>
            {isOpen && (
                <DropdownMenu menuWidth={menuWidth}>
                    {options.map((option, index) => (
                        <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
                            {option.label || option}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default CustomDropdown;

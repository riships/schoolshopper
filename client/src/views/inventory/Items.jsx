import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Modal, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useAuth } from '../../context/AuthContext';
const url = import.meta.env.VITE_API_URL;
import viewIcon from '../../assets/images/view-icon.svg';
import actionIcon from '../../assets/images/action-icon.svg';
import prevIcon from '../../assets/images/prev-icon.svg';
import nextIcon from '../../assets/images/next-icon.svg';
import filterIcon from '../../assets/images/filter-icon.svg';
import addIcon from '../../assets/images/add-icon.svg';
import deleteIcon from '../../assets/images/delete-icon.svg';
import exportIcon from '../../assets/images/export-icon.svg';
import columnIcon from '../../assets/images/column-icon.svg';

const Items = () => {
    const auth = useAuth();
    let [tableData, setTableData] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true) };
    const handleClose = () => { setShow(false) };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];


    const [selectedOption, setSelectedOption] = useState(null);

    const redirectToProduct = useNavigate();

    const navigateToProduct = () => {
        redirectToProduct("/inventory/add-product")
    }



    useEffect(() => {
        getItems();
    }, [])

    let getItems = async () => {
        try {
            let res = await axios.get(url + "/api/item/itemByGroup",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': auth.token || ''
                    },
                    withCredentials: true
                }
            );
            let items = res.data.data;
            console.log(items);
            setTableData(items)

        }
        catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="main-heading">
                    <h4>Items</h4>
                </div>
                <div className="box">
                    <div className="box-body">

                        <ul className="common-action-wrapper">
                            <li>
                                <button type="button" className="common-button" onClick={handleShow} >
                                    <img src={filterIcon} alt="filterf-icon" /> Filters
                                </button>

                                <Modal className='center-common-modal' show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title><img src={filterIcon} className='me-1' /> Filters </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div className='common-form-wrapper'>
                                            <Row>
                                                <Col md={12} className='form-gap'>
                                                    <Form.Group className='common-form-group'>
                                                        <Form.Label className='common-label'>Category</Form.Label>
                                                        <Select className='custom-selectpicker' classNamePrefix="select"
                                                            defaultValue={selectedOption}
                                                            onChange={setSelectedOption}
                                                            options={options}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <Form.Label className='common-label'>Price Range</Form.Label>
                                                        </Col>
                                                        <Col md={6} className='form-gap'>
                                                            <Form.Group className='common-form-group'>
                                                                <Form.Control className='common-control' type="text" placeholder="From Amount">

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={6} className='form-gap'>
                                                            <Form.Group className='common-form-group'>
                                                                <Form.Control className='common-control' type="text" placeholder="To Amount">

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button type="button" className='common-button' onClick={handleClose}>
                                            Close
                                        </button>
                                        <button type="button" className='text-white common-button btn-primary' onClick={handleClose}>
                                            Apply
                                        </button>
                                    </Modal.Footer>
                                </Modal>

                            </li>
                            <li>
                                <input className="search-field" type="text" placeholder="Search" />
                            </li>
                            <li className="ms-auto">
                                <button type="button" onClick={navigateToProduct} variant="" className="text-white common-button btn-add btn-primary"> <img src={addIcon} alt="add-icon" />Add</button>
                            </li>
                            <li>
                                <button type="button" variant="" className="common-button btn-delete"><img src={deleteIcon} alt="delete-icon" /> Delete</button>
                            </li>
                            <li>
                                <button type="button" variant="" className="common-button btn-export"><img src={exportIcon} alt="export-icon" /> Export</button>
                            </li>
                            <li>
                                <button type="button" variant="" className="common-button btn-col-filter"><img src={columnIcon} alt="column-icon" /> Column</button>
                            </li>
                            <li>
                                <div className='pagination-wrapper'>
                                    <span>1-10 of 120</span>
                                    <button type="button"><img src={prevIcon} alt="prev-icon" /></button>
                                    <button type="button"><img src={nextIcon} alt="next-icon" /></button>
                                </div>
                            </li>
                        </ul>

                        <div className="table-responsive">
                            <Table className="common-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" /></th>
                                        <th>Item Name</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Unit</th>
                                        <th>Per Unit Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        tableData.map((ele, ind) => {
                                            const { _id, item_name, item_category, item_opening_stock, item_unit, item_hsn, item_actual_price } = ele;
                                            return (
                                                <tr key={_id}>
                                                    <td><input type="checkbox" /></td>
                                                    <td>
                                                        <p className="mb-0 text-dark fw-medium">{item_name}</p>
                                                        <p className="mb-0 text-secondary">{item_hsn}</p>
                                                    </td>
                                                    <td>{item_category}</td>
                                                    <td>{item_opening_stock}</td>
                                                    <td>{item_unit}</td>
                                                    <td>{item_actual_price}</td>
                                                    <td>
                                                        <div className='action-button-wrapper'>
                                                            <button type="button"><img src={viewIcon} alt="view-icon" /></button>
                                                            <button type="button"><img src={actionIcon} alt="action-icon" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default Items;

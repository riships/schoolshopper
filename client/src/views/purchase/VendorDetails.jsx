import React from 'react'
import { Dropdown, Table } from 'react-bootstrap';
import viewIcon from '../../assets/images/view-icon.svg';
import actionIcon from '../../assets/images/action-icon.svg';
import addIcon from '../../assets/images/add-icon.svg';
import exportIcon from '../../assets/images/export-icon.svg';
import columnIcon from '../../assets/images/column-icon.svg';
import prevIcon from '../../assets/images/prev-icon.svg';
import nextIcon from '../../assets/images/next-icon.svg';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../../components/CustomDropdown';
const apiUrl = import.meta.env.VITE_API_URL;

function VendorDetails() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [tableData, setTableData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl + '/api/vendor', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': auth.token || ''
                    },
                    withCredentials: true
                });
                const { vendors } = response.data;
                if (!Array.isArray(vendors)) {
                    throw new Error('Unexpected response format');
                }
                // Filter out items with null or undefined values
                setTableData(vendors);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="main-heading"><h4>Vendor</h4></div>
            <div className='box'>
                <div className='box-body'>
                    <ul className="common-action-wrapper">
                        <li>
                            <input className="search-field" type="text" placeholder="Search" />
                        </li>
                        <li className="ms-auto">
                            <button type="button" variant="" className="text-white common-button btn-add btn-primary" onClick={() => navigate('/purchase/vendor/add')}> <img src={addIcon} alt="add-icon" />Add</button>
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
                        {error && <p>Error: {error.message}</p>}
                        <Table className="common-table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" /></th>
                                    <th>Vendor</th>
                                    <th>Contact Person</th>
                                    <th>Email ID</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <th>GSTIN</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className='text-center'>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    tableData.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className='text-center'>No data available</td>
                                        </tr>
                                    ) : (
                                        tableData.map((ele, ind) => {
                                            const { _id, vendor_name, vendor_phone, vendor_email, vendor_address, vendor_gst } = ele;
                                            return (
                                                <tr key={_id}>
                                                    <td><input type="checkbox" /></td>
                                                    <td>
                                                        <p className="mb-0 text-dark fw-medium">{vendor_name}</p>
                                                    </td>
                                                    <td>{vendor_email}</td>
                                                    <td>{vendor_email}</td>
                                                    <td>{vendor_phone}</td>
                                                    <td>{vendor_address}</td>
                                                    <td>{vendor_gst}</td>
                                                    <td>
                                                        <CustomDropdown
                                                            options={['Red', 'Green', 'Blue']}
                                                            onSelect={(val) => console.log(val)}
                                                            placeholder={<img src={actionIcon} alt="view-icon" />}
                                                            buttonWidth="150px"
                                                            menuWidth="300px"
                                                        />

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorDetails
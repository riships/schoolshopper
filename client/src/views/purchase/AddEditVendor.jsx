import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useReducer } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { formatOptions } from '../../utils/helper';
import { Country, State, City } from 'country-state-city';
const url = import.meta.env.VITE_API_URL;

const initialState = {
    vendorName: "",
    contactPersonName: "",
    contactNo: "",
    emailId: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    gstin: "",
    accountName: "",
    accountNo: "",
    reEnterAccountNo: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    countries: [],
    states: [],
    cities: [],
    panCard: null,
    aadharCard: null,
    gstCertificate: null
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_VENDOR_NAME':
            return { ...state, vendorName: action.payload };
        case 'UPDATE_CONTACT_PERSON_NAME':
            return { ...state, contactPersonName: action.payload };
        case 'UPDATE_CONTACT_NO':
            return { ...state, contactNo: action.payload };
        case 'UPDATE_EMAIL_ID':
            return { ...state, emailId: action.payload };
        case 'UPDATE_ADDRESS':
            return { ...state, address: action.payload };
        case 'UPDATE_CITY':
            return { ...state, city: action.payload };
        case 'UPDATE_STATE':
            return { ...state, state: action.payload };
        case 'UPDATE_COUNTRY':
            return { ...state, country: action.payload };
        case 'UPDATE_PIN_CODE':
            return { ...state, pinCode: action.payload };
        case 'UPDATE_GSTIN':
            return { ...state, gstin: action.payload };
        case 'UPDATE_ACCOUNT_NAME':
            return { ...state, accountName: action.payload };
        case 'UPDATE_ACCOUNT_NO':
            return { ...state, accountNo: action.payload };
        case 'UPDATE_RE_ENTER_ACCOUNT_NO':
            return { ...state, reEnterAccountNo: action.payload };
        case 'UPDATE_IFSC_CODE':
            return { ...state, ifscCode: action.payload };
        case 'UPDATE_BANK_NAME':
            return { ...state, bankName: action.payload };
        case 'UPDATE_BRANCH_NAME':
            return { ...state, branchName: action.payload };
        case 'UPDATE_PAN_CARD':
            return { ...state, panCard: action.payload };
        case 'UPDATE_AADHAR_CARD':
            return { ...state, aadharCard: action.payload };
        case 'UPDATE_GST_CERTIFICATE':
            return { ...state, gstCertificate: action.payload };
        case 'UPDATE_CITY_OPTIONS':
            return { ...state, cities: action.payload };
        case 'UPDATE_STATE_OPTIONS':
            return { ...state, states: action.payload };
        case 'UPDATE_COUNTRY_OPTIONS':
            return { ...state, countries: action.payload };
        default:
            return state;
    }
}

const AddEditVendor = () => {
    const auth = useAuth();
    const [reducerState, setReducer] = useReducer(reducer, initialState);
    useEffect(() => {
        const getCityStateCountry = async () => {
            try {
                const countryData = await formatOptions(Country.getAllCountries(), 'name', 'isoCode');
                setReducer({ type: 'UPDATE_COUNTRY_OPTIONS', payload: countryData });

                if (!reducerState.country) return;

                const stateData = await formatOptions(
                    State.getStatesOfCountry(reducerState.country),
                    'name',
                    'isoCode'
                );
                setReducer({ type: 'UPDATE_STATE_OPTIONS', payload: stateData });

                if (!reducerState.state) return;

                const cityData = await formatOptions(
                    City.getCitiesOfState(reducerState.country, reducerState.state),
                    'name',
                    'stateCode'
                );
                setReducer({ type: 'UPDATE_CITY_OPTIONS', payload: cityData });
            } catch (error) {
                console.error('Error loading location data:', error);
            }
        };

        getCityStateCountry();
    }, [reducerState.country, reducerState.state]);


    const addVendor = async () => {
        try {
            let response = await axios.post(url + "/api/item/getCategories",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': auth.token || ''
                    },
                    withCredentials: true
                }
            );
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    



    return (
        <>
            <div className='content-wrapper'>
                <ul className="common-breadcrum">
                    <li><a href="#">Items</a></li>
                    <li>Add</li>
                </ul>
                <div className="box">
                    <div className="box-body">


                        <Row className='mx-2 my-3 gx-3'>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Vendor Name <span style={{ 'fontSize': '0.70rem' }}>(Legal Name)</span><span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control'
                                        type="text" placeholder="Enter Item Name"
                                        value={reducerState.vendor_name}
                                        onChange={(e) => setReducer({ type: 'UPDATE_VENDOR_NAME', payload: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Contact Person Name<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Contact Person Name"
                                        value={reducerState.contact_person_name}
                                        onChange={(e) => setReducer({ type: 'UPDATE_CONTACT_PERSON_NAME', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Contact No<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="number" placeholder="Enter Contact No"
                                        value={reducerState.contact_no}
                                        onChange={(e) => setReducer({ type: 'UPDATE_CONTACT_NO', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Email ID</Form.Label>
                                    <Form.Control className='common-control' type="email" placeholder="Enter Email ID"
                                        value={reducerState.email_id}
                                        onChange={(e) => setReducer({ type: 'UPDATE_EMAIL_ID', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Address<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Address"
                                        value={reducerState.address}
                                        onChange={(e) => setReducer({ type: 'UPDATE_ADDRESS', payload: e.target.value })}
                                        isClearable={true}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>City<span className='text-danger'>*</span></Form.Label>
                                    <Select className='custom-selectpicker' classNamePrefix="Select City"
                                        defaultValue={reducerState.city}
                                        options={reducerState.cities}
                                        onChange={(e) => { setReducer({ type: 'UPDATE_CITY', payload: e.value }); }}
                                        isClearable={true}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>State<span className='text-danger'>*</span></Form.Label>
                                    <Select className='custom-selectpicker' classNamePrefix="Select State"
                                        defaultValue={reducerState.state}
                                        options={reducerState.states}
                                        onChange={(e) => {
                                            setReducer({ type: 'UPDATE_STATE', payload: e.value });
                                            setReducer({ type: 'UPDATE_CITY', payload: '' });
                                        }}
                                        isClearable={true}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Country<span className='text-danger'>*</span></Form.Label>
                                    <Select className='custom-selectpicker' classNamePrefix="Select"
                                        defaultValue={reducerState.country}
                                        options={reducerState.countries}
                                        onChange={(e) => {
                                            setReducer({ type: 'UPDATE_COUNTRY', payload: e.value });
                                            setReducer({ type: 'UPDATE_STATE', payload: '' });
                                            setReducer({ type: 'UPDATE_CITY', payload: '' });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>PIN/ZIP Code</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter PIN/ZIP Code"
                                        value={reducerState.pin_code}
                                        onChange={(e) => setReducer({ type: 'UPDATE_PIN_CODE', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>GSTIN</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter GSTIN"
                                        value={reducerState.gstin}
                                        onChange={(e) => setReducer({ type: 'UPDATE_GSTIN', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <ul className="ms-n-16 common-seperator">
                                    <li><span className="seperator-main-heading">Bank Details</span></li>
                                </ul>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Account Name</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Account Name"
                                        value={reducerState.account_name}
                                        onChange={(e) => setReducer({ type: 'UPDATE_ACCOUNT_NAME', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Account No</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Account No"
                                        value={reducerState.account_no}
                                        onChange={(e) => setReducer({ type: 'UPDATE_ACCOUNT_NO', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Re-Enter Account No<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Re-Enter Account No"
                                        value={reducerState.re_enter_account_no}
                                        onChange={(e) => setReducer({ type: 'UPDATE_RE_ENTER_ACCOUNT_NO', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>IFSC Code</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter IFSC Code"
                                        value={reducerState.ifsc_code}
                                        onChange={(e) => setReducer({ type: 'UPDATE_IFSC_CODE', payload: e.target.value })}
                                    />
                                    {/* <span className='find-icon'><img src="/assets/images/find-icon.png" alt="find-icon" /></span> */}
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Bank Name</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Bank Name"
                                        value={reducerState.bank_name}
                                        onChange={(e) => setReducer({ type: 'UPDATE_BANK_NAME', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Branch Name</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Branch Name"
                                        value={reducerState.branch_name}
                                        onChange={(e) => setReducer({ type: 'UPDATE_BRANCH_NAME', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={12}>
                                <ul className="mx-n-16 common-seperator">
                                    <li><span className="seperator-main-heading">Upload Document</span></li>
                                </ul>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>PAN Card</Form.Label>
                                    <Form.Control className='common-control' type="file"
                                        value={reducerState.pan_card}
                                        onChange={(e) => setReducer({ type: 'UPDATE_PAN_CARD', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Aadhar Card</Form.Label>
                                    <Form.Control className='common-control' type="file"
                                        value={reducerState.aadhar_card}
                                        onChange={(e) => setReducer({ type: 'UPDATE_AADHAR_CARD', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>GST Certificate</Form.Label>
                                    <Form.Control className='common-control' type="file"
                                        value={reducerState.gst_certificate}
                                        onChange={(e) => setReducer({ type: 'UPDATE_GST_CERTIFICATE', payload: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            {/* Save and Cancel Button */}
                            <Col md={12} className='d-flex justify-content-end gap-2'>
                                <button variant="secondary" className='common-button'>Cancel</button>
                                <button variant="primary" className='text-white btn-primary common-button' onClick={addVendor}>Save</button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditVendor;
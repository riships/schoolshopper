import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import DatePicker from '../../components/DatePicker';
import { formatOptions } from '../../utils/helper';
import SingleFileUpload from '../../components/SingleFileUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import dateIcon from '../../assets/images/calender-icon.svg';
import timeIcon from '../../assets/images/time-icon.svg';
import addIcon from '../../assets/images/addIcon.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';
const url = import.meta.env.VITE_API_URL;

const AddProduct = () => {
    // const [date, setDate] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [isPublishChecked, setIsPublishChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [tableRow, setTableRow] = useState([{ id: "", name: "" }]);


    // const subCategoryOptions = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    const [selectedSubCategoryOptions, setsubCategoryOptions] = useState(null);


    const taxOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedTaxOptions, setTaxOptions] = useState(null);


    const genderOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedGenderOptions, setGenderOptions] = useState(null);


    const brandOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedBrandOptions, setBrandOptions] = useState(null);

    const materialOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedMaterialOptions, setMaterialOptions] = useState(null);


    const unitOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedUnitOptions, setUnitOptions] = useState(null);

    useEffect(() => {
        getCategory();
    }, [])

    const auth = useAuth();
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [subCategoryFilterOptions, setSubCategoryFilterOptions] = useState([]);

    const getCategory = async () => {
        try {
            let res = await axios.get(url + "/api/item/getCategories",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': auth.token || ''
                    },
                    withCredentials: true
                }
            );
            console.log(res.data);


            let categoryOptionsData = await formatOptions(res.data.categories, 'category_name', '_id');
            setCategoryOptions(categoryOptionsData);
            setSubCategoryOptions(res.data.sub_categories);
            setSubCategoryFilterOptions(res.data.sub_categories);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleCategoryChange(data) {
        setSubCategoryFilterOptions(subCategoryOptions);
        const subCategoryData = subCategoryFilterOptions.filter((subCateg) => subCateg._id === data.value);
        let subOptions = subCategoryData[0]['sub_categories'].map((elem) => ({
            label: elem,
            value: elem
        }));
        setSubCategoryOptions(subOptions);
    }

    const handleAddRow = () => {
        const newRow = { id: Date.now(), name: "" }
        setTableRow([...tableRow, newRow])
    }

    const handleDeleteRow = (id) => {
        setTableRow(tableRow.filter((ele) => {
            return ele.id !== id
        }))
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
                            <Col md={6}>
                                <Row className='gx-3'>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Store<span className='text-danger'>*</span></Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                // defaultValue={categoryOptions[2]}
                                                onChange={handleCategoryChange}
                                                options={categoryOptions}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Item Name<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control className='common-control' type="text" placeholder="Enter Item Name">

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Category<span className='text-danger'>*</span></Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                // defaultValue={categoryOptions[2]}
                                                onChange={handleCategoryChange}
                                                options={categoryOptions}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Sub-Category</Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                defaultValue={selectedSubCategoryOptions}
                                                onChange={setsubCategoryOptions}
                                                options={subCategoryOptions}
                                                isMulti
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Enter SKU<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control className='common-control' type="text" placeholder="Enter SKU">

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>HSN Code<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control className='common-control' type="text" placeholder="Enter HSN Code">

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <ul className="ms-n-16 common-seperator">
                                            <li><span className="seperator-main-heading">Item Specification</span></li>
                                        </ul>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Dimensions (Length X Width X Height)<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control className='common-control' type="text" placeholder="Enter Dimensions (Length X Width X Height)">

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Weight (In kg)<span className='text-danger'>*</span></Form.Label>
                                            <Form.Control className='common-control' type="text" placeholder="Enter Weight (In kg)">

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Gender</Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                defaultValue={selectedGenderOptions}
                                                onChange={setGenderOptions}
                                                options={genderOptions}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Brand</Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                defaultValue={selectedBrandOptions}
                                                onChange={setBrandOptions}
                                                options={brandOptions}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Col>
                            <Col md={6} className=''>
                                <Row className='gx-3'>



                                    <Col md={12}>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Attachment</Form.Label>
                                            <Row className='g-3'>
                                                <Col md={6} className='large-file'>
                                                    <SingleFileUpload customHeight={'268px'} />
                                                </Col>
                                                <Col md={6}>
                                                    <Row className='g-3'>
                                                        <Col md={6}>
                                                            <SingleFileUpload customHeight={'126px'} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <SingleFileUpload customHeight={'126px'} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <SingleFileUpload customHeight={'126px'} />
                                                        </Col>
                                                        <Col md={6}>
                                                            <SingleFileUpload customHeight={'126px'} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={12} className='mt-2'>
                                                    <p className='mb-0 text-dark fs-10'>You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</p>
                                                </Col>

                                                <Col md={6} className='form-gap'>
                                                    <Form.Group className='common-form-group'>
                                                        <Form.Label className='common-label'>Material</Form.Label>
                                                        <Select className='custom-selectpicker' classNamePrefix="select"
                                                            defaultValue={selectedMaterialOptions}
                                                            onChange={setMaterialOptions}
                                                            options={materialOptions}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6} className='form-gap'>
                                                    <Form.Group className='common-form-group'>
                                                        <Form.Label className='common-label'>Unit</Form.Label>
                                                        <Select className='custom-selectpicker' classNamePrefix="select"
                                                            defaultValue={selectedUnitOptions}
                                                            onChange={setUnitOptions}
                                                            options={unitOptions}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>



                                </Row>
                            </Col>




                            <Col md={12}>
                                <ul className="mx-n-16 common-seperator">
                                    <li><span className="seperator-main-heading">Product Information</span></li>
                                </ul>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Product Type<span class="text-danger">*</span></Form.Label>
                                    <div className="btn-radio-group">
                                        <Row className="justify-content-start boxed1 row">
                                            <Col md="6" className="mb-3 input_02_radio">
                                                <input type="radio" id="single_product" name="product" value="single" checked={selectedOption === 'single'} onChange={(e) => setSelectedOption(e.target.value)} />
                                                <label htmlFor="single_product"> Single Product </label>
                                            </Col>

                                            <Col md="6" className="mb-3 input_02_radio">
                                                <input type="radio" id="multi_product" name="product" value="multiple" checked={selectedOption === 'multiple'} onChange={(e) => setSelectedOption(e.target.value)} />
                                                <label htmlFor="multi_product">Multi Product</label>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Tax Preferance<span class="text-danger">*</span></Form.Label>
                                    <Select className='custom-selectpicker' classNamePrefix="select"
                                        defaultValue={selectedUnitOptions}
                                        onChange={setUnitOptions}
                                        options={unitOptions}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Tax Rate</Form.Label>
                                    <Select className='custom-selectpicker' classNamePrefix="select"
                                        defaultValue={selectedUnitOptions}
                                        onChange={setUnitOptions}
                                        options={unitOptions}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Amount With <span class="text-danger">*</span></Form.Label>
                                            <div className="btn-radio-group">
                                                <Row className="justify-content-start boxed1 row">
                                                    <Col md="6" className="mb-3 input_02_radio">
                                                        <input type="radio" id="tax_included" name="product" />
                                                        <label htmlFor="tax_included"> Tax Included </label>
                                                    </Col>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Amount With <span class="text-danger">*</span></Form.Label>
                                    <div className="btn-radio-group">
                                        <Row className="justify-content-start boxed1 row">
                                            <Col md="6" className="mb-3 input_02_radio">
                                                <input type="radio" id="single_product" name="product" />
                                                <label htmlFor="single_product"> Tax Included </label>
                                            </Col>

                                                    <Col md="6" className="mb-3 input_02_radio">
                                                        <input type="radio" id="tax_excluded" name="product" />
                                                        <label htmlFor="tax_excluded">Tax Excluded</label>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                            <Col md="6" className="mb-3 input_02_radio">
                                                <input type="radio" id="multi_product" name="product" />
                                                <label htmlFor="multi_product">Tax Excluded</label>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form.Group>
                            </Col>

                            {selectedOption === 'multiple' && (
                                <>
                                    <Col md={12} className='form-gap'>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tableRow.map((ele, ind) => {
                                                        return (
                                                            <tr key={ele.id}>
                                                                <td><input type="text" className='form-control' value={ele.id} /></td>
                                                                <td> {ind === tableRow.length - 1 ? <button type='button' onClick={handleAddRow}><img src={addIcon} alt="add icon" /></button> : <button type='button' onClick={() => handleDeleteRow(ele.id)}> <img src={deleteIcon} alt="delete icon" /> </button>}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </>
                            )}

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Actual Price</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Amount">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Discount Type</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Weight (In kg)">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Selling Price<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Amount">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Low Stock Alert<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Count">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Opening Stock</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Opening Stock">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Opening Stock Rate Per Unit</Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Amount">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={10} className='form-gap'>
                                <Form.Group className='common-form-group' controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='common-label'>Description</Form.Label>
                                    <Form.Control className='common-control' as="textarea" placeholder='Enter Description' rows={4} />
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Is Best Seller:</Form.Label>
                                    <div className="mt-1 common-checkbox-toggle b2">
                                        <input type="checkbox" className="checkbox-toggle-btn" value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={9} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Is Featured Product</Form.Label>
                                    <div className="mt-1 common-checkbox-toggle b2">
                                        <input type="checkbox" className="checkbox-toggle-btn" value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Do you want to publish it on website:</Form.Label>
                                    <div className="mt-1 common-checkbox-toggle b2">
                                        <input type="checkbox" className="checkbox-toggle-btn" checked={isChecked} onChange={(e => setIsChecked(e.target.checked))} value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>
                            {isChecked && (<>
                                <Col md={3} className='form-gap'>
                                    <Form.Group className='common-form-group'>
                                        <Form.Label className='common-label'>Publish Later:</Form.Label>
                                        <div className="mt-1 common-checkbox-toggle b2">
                                            <input type="checkbox" className="checkbox-toggle-btn" checked={isPublishChecked} onChange={(e => setIsPublishChecked(e.target.checked))} value="appointment" />
                                            <div className="knobs"><span></span></div>
                                            <div className="layer"></div>
                                        </div>
                                    </Form.Group>
                                </Col>
                                {isPublishChecked && (
                                    <>
                                        <Col md={3} className='form-gap'>
                                            <Form.Group className='common-form-group'>
                                                <Form.Label className='common-label'>Date<span className='text-danger'>*</span></Form.Label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker className='picker-control' defaultValue={dayjs('2022-04-17')} />
                                                    <img className='picker-icon' src={dateIcon} />
                                                </LocalizationProvider>
                                            </Form.Group>
                                        </Col>

                                        <Col md={3} className='form-gap'>
                                            <Form.Group className='common-form-group'>
                                                <Form.Label className='common-label'>Time<span className='text-danger'>*</span></Form.Label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileTimePicker className='picker-control' defaultValue={dayjs('2022-04-17T15:30')} />
                                                    <img className='picker-icon' src={timeIcon} />
                                                </LocalizationProvider>

                                            </Form.Group>
                                        </Col>
                                    </>
                                )}
                            </>
                            )}
                            <Col md={12} className='d-flex justify-content-end gap-2 my-4'>
                                <button variant="secondary" className='common-button'>Cancel</button>
                                <button variant="primary" className='text-white btn-primary common-button' >Save</button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
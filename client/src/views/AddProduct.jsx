import { Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import DatePicker from '../components/DatePicker';
const url = import.meta.env.VITE_API_URL;

const AddProduct = () => {
    const [date, setDate] = useState();



    const subCategoryOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
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
    // let [tableData, setTableData] = useState([]);

    const [categoryOptions, setcategoryOptions] = useState([]);

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

             let categoryOptionsData = res.data.categories;
             console.log(res.data);
             
            categoryOptionsData = categoryOptionsData.map((ele) => {
                return {
                'label': ele.category_name,
                'value': ele._id,
                }
            });

            setcategoryOptions(categoryOptionsData);

        } catch (error) {
            console.log(error);
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
                            <Col md={6}>
                                <Row className='gx-3'>
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
                                                // defaultValue={selectedCategoryOptions}
                                                // onChange={setSelectedCategoryOptions}
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
                                                options={selectedSubCategoryOptions}
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
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Tax</Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                defaultValue={selectedTaxOptions}
                                                onChange={setTaxOptions}
                                                options={taxOptions}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <ul className="common-seperator ms-n-16">
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
                            <Col md={6} className='form-gap'>
                                <Row className='gx-3'>
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
                            </Col>

                            <Col md={12}>
                                <ul className="common-seperator mx-n-16">
                                    <li><span className="seperator-main-heading">Product Information</span></li>
                                </ul>
                            </Col>

                            <Col md={12}>
                                <Row>
                                    <Col md={3} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Brand</Form.Label>
                                            <div className="btn-radio-group">
                                                <Row className="boxed1 row justify-content-start">
                                                    <Col md="6" className="input_02_radio mb-3">
                                                        <input type="radio" id="single_product" name="product" />
                                                        <label htmlFor="single_product"> Single Product </label>
                                                    </Col>

                                                    <Col md="6" className="input_02_radio mb-3">
                                                        <input type="radio" id="multi_product" name="product" />
                                                        <label htmlFor="multi_product">Multi Product</label>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Actual Price<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Amount">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Discount Type<span className='text-danger'>*</span></Form.Label>
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
                                    <Form.Label className='common-label'>Opening Stock<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Opening Stock">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Opening Stock Rate Per Unit<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control' type="text" placeholder="Enter Amount">

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col md={9} className='form-gap'>
                                <Form.Group className='common-form-group' controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='common-label'>Description</Form.Label>
                                    <Form.Control className='common-control' as="textarea" placeholder='Enter Description' rows={4} />
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Opening Stock Rate Per Unit<span className='text-danger'>*</span></Form.Label>
                                    <div className="common-checkbox-toggle b2 mt-1">
                                        <input type="checkbox" className="checkbox-toggle-btn" value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Publish Later<span className='text-danger'>*</span></Form.Label>
                                    <div className="common-checkbox-toggle b2 mt-1">
                                        <input type="checkbox" className="checkbox-toggle-btn" value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Publish Later<span className='text-danger'>*</span></Form.Label>
                                    <DatePicker selectedDate={date} setSelectedDate={setDate} />
                                    {/* <Form.Control className='common-control pick-date' type="text" placeholder="Enter Amount">

                                    </Form.Control> */}
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Publish Later<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control className='common-control pick-time' type="text" placeholder="Enter Amount">
                                    </Form.Control>
                                    {/* <DemoItem label="Responsive variant">
  <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
</DemoItem> */}
                                </Form.Group>
                            </Col>

                        </Row>


                    </div>

                </div>
            </div>
        </>
    )
}

export default AddProduct;
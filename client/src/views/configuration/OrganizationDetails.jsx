import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import DatePicker from '../../components/DatePicker';
import { toast } from 'react-toastify';
const url = import.meta.env.VITE_API_URL;

const OrganizationDetails = () => {
    const [date, setDate] = useState();

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

            const categoryOptions = res.data.categories;
            const dd = categoryOptions.map((user) => ({
                'value': user._id,
                'label': user.category_name,
            }));
        } catch (error) {
            toast.error('Error fetching categories');
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
                                                defaultValue={selectedCategoryOptions}
                                                onChange={setCategoryOptions}
                                                options={selectedCategoryOptions}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Sub-Category</Form.Label>
                                            <Select className='custom-selectpicker' classNamePrefix="select"
                                                defaultValue={selectedSubCategoryOptions}
                                                onChange={setsubCategoryOptions}
                                                options={selectedCategoryOptions}
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
                                <ul className="mx-n-16 common-seperator">
                                    <li><span className="seperator-main-heading">Product Information</span></li>
                                </ul>
                            </Col>

                            <Col md={12}>
                                <Row>
                                    <Col md={3} className='form-gap'>
                                        <Form.Group className='common-form-group'>
                                            <Form.Label className='common-label'>Brand</Form.Label>
                                            <div className="btn-radio-group">
                                                <Row className="justify-content-start boxed1 row">
                                                    <Col md="6" className="mb-3 input_02_radio">
                                                        <input type="radio" id="single_product" name="product" />
                                                        <label htmlFor="single_product"> Single Product </label>
                                                    </Col>

                                                    <Col md="6" className="mb-3 input_02_radio">
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
                                    <div className="mt-1 common-checkbox-toggle b2">
                                        <input type="checkbox" className="checkbox-toggle-btn" value="appointment" />
                                        <div className="knobs"><span></span></div>
                                        <div className="layer"></div>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={3} className='form-gap'>
                                <Form.Group className='common-form-group'>
                                    <Form.Label className='common-label'>Publish Later<span className='text-danger'>*</span></Form.Label>
                                    <div className="mt-1 common-checkbox-toggle b2">
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

export default OrganizationDetails;
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import DatePicker from '../../components/DatePicker';
import { toast } from 'react-toastify';
const url = import.meta.env.VITE_API_URL;

const Configuration = () => {
    const [date, setDate] = useState();

    const getConfiguration = async () => {
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
                        Demo
                    </div>
                </div>
            </div>
        </>
    )
}

export default Configuration;
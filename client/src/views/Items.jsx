import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
const url = import.meta.env.VITE_API_URL;

const Items = () => {
    const auth = useAuth();
    let [tableData, setTableData] = useState([]);

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

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tableData.map((ele, ind) => {
                            console.log(ele.item_category);
                            const {_id,item_category, item_name, item_stock} = ele;
                            return (
                                <tr key={_id}>
                                    <td>{item_category}</td>
                                    <td>{item_name}</td>
                                    <td>{item_stock}</td>
                                    <td>Username</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
export default Items;

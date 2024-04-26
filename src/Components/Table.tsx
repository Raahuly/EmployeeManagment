import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BsPencilSquare } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";

type Employee = {
    ID: number;
    NAME: string;
    AGE: number;
    NUMBER: string;
    ADDRESS: string;
};

function Table() {
    const [data, setData] = useState<Employee[]>([]);

    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = async () => {
        try {
            const response = await axios.get<Employee[]>("https://localhost:7186/api/Employee");
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteEmployee = async (id: number) => {
        debugger;
        try {
            await axios.delete(`https://localhost:7186/api/Employee/${id}`);
            setData(prevData => prevData.filter(employee => employee.ID !== id));
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    return (
        <div className="container mx-auto px-4 m-5 rounded-md">
            <div className="overflow-x-auto">
                <table className="table-auto w-full rounded-md">
                    <thead className="bg-gray-900 text-white rounded-md">
                        <tr className='rounded-md'>
                            <th className="px-6 py-6 mb-4 rounded-tl-lg">SRNO.</th>
                            <th className="px-6 py-6 mb-4">NAME</th>
                            <th className="px-6 py-6 mb-4">AGE</th>
                            <th className="px-6 py-6 mb-4">NUMBER</th>
                            <th className="px-6 py-6 mb-4">ADDRESS</th>
                            <th className='px-6 py-6 mb-4 rounded-tr-lg'>Operations</th>
                        </tr>
                    </thead>
                    <tbody className="mt-16 bg-gray-100 px-6">
                        {data && data.map((item, index) => (
                            <tr key={index} className="alert border-b-2 border-gray-200" role="alert">
                                <td>
                                    <div>
                                        <span className='px-16 mt-5'>{index + 1}</span>
                                    </div>
                                </td>
                                <td>{item.NAME}</td>
                                <td>{item.AGE}</td>
                                <td>{item.NUMBER}</td>
                                <td>{item.ADDRESS}</td>
                                <td className="status ps-16">
                                    <div className='flex gap-3'>
                                        <span className="active text-green-600" style={{ fontSize: '20px' }}>
                                            <Link to={`/table/${item.ID}/edit/`}>
                                                <BsPencilSquare />
                                            </Link>
                                        </span>
                                        <span className="active text-green-600" style={{ fontSize: '20px' }}>
                                            <Link to={`/table/${item.ID}/Details/`}>
                                                <BsPencilSquare />
                                            </Link>
                                        </span>
                                        <span className="active text-red-400 text-2xl">
                                            <button type='button' onClick={() => deleteEmployee(item.ID)}>
                                                <VscTrash />
                                            </button>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;

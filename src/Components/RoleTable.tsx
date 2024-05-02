import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsPencilSquare } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";

type Role = {
    RoleId : number;
    RoleName : string;
}

function RoleTable() {
    const [data, setData] = useState<Role[]>([]);
    const [deleteRoleId, setDeleteRoleId] = useState<number | null>(null);

    let ArrayOfRole = [];

    useEffect(() => {
        getAllRole();
    },[]);

    const getAllRole = async () => {
        try {
            const response = await axios.get<Role[]>("https://localhost:7186/api/Role");
            setData(response.data);
            console.log(response.data);
            ArrayOfRole.push(response.data);
            console.log(ArrayOfRole[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteEmployee = async (RoleId: number) => {
        try {
            await axios.delete(`https://localhost:7186/api/Role/${RoleId}`);
            setData(prevData => prevData.filter(role => role.RoleId !== RoleId));
            // Close the modal after deletion
            setDeleteRoleId(null);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    return (
        <div className="container mx-auto px-4 m-5 rounded-md">
            <div className="overflow-x-auto">
                <table className="table-auto w-full rounded-md">
                    <thead className="bg-gray-900 text-white rounded-md">
                        <tr className="rounded-md">
                            <th className="px-6 py-6 mb-4 rounded-tl-lg">SRNO.</th>
                            <th className="px-6 py-6 mb-4">RoleName</th>
                            <th className="px-6 py-6 mb-4 rounded-tr-lg">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="mt-16 bg-gray-100 px-6">
                        {data && data.map((item, index) => (
                            <tr key={index} className="alert border-b-2 border-gray-200" role="alert">
                                <td>
                                    <div>
                                        <span className="px-16 mt-5">{index + 1}</span>
                                    </div>
                                </td>
                                <td>{item.RoleName}</td>
                                <td className="status ps-32">
                                    <div className="flex gap-3">
                                        <span className="active text-green-600" style={{ fontSize: '20px' }}>
                                            <Link to={`/RoleTable/${item.RoleId}/edit/`}>
                                                <BsPencilSquare />
                                            </Link>
                                        </span>
                                        <span className="active text-red-400 text-2xl">
                                            <button type='button' onClick={() => setDeleteRoleId(item.RoleId)}>
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
            {deleteRoleId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p className="mb-4">Are you sure you want to delete this role?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2" onClick={() => deleteEmployee(deleteRoleId)}>Delete</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md" onClick={() => setDeleteRoleId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RoleTable;

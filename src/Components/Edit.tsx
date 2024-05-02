import { useParams } from 'react-router-dom';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare } from "react-icons/bs";

type Employee = {
    ID: number;
    NAME: string;
    AGE: number;
    NUMBER: string;
    ADDRESS: string;
};

const Edit = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<Employee>({
        ID: 0,
        NAME: "",
        AGE: 0,
        NUMBER: "",
        ADDRESS: ""
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                debugger;
                const response = await axios.get<Employee>(`https://localhost:7186/api/Employee/${id}`);
                setEmployee(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
          debugger;
        fetchEmployee();
    }, [id]);

  

    const Update = async () => {
        debugger;
        try {
            const response = await axios.put(`https://localhost:7186/api/Employee/`, employee);
            console.log(response.data);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        debugger;
        e.preventDefault();
        if (!employee.NAME || !employee.AGE || !employee.NUMBER || !employee.ADDRESS) {
            toast.error("Please provide a value for each input field");
        } else {
            await Update();
            // Optionally, you can redirect the user or perform any other action after successful update
            toast.success("Employee updated successfully");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        debugger;
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    return (
        <div>
            <h2>Edit Page for ID: {id}</h2>
            <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Employee Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="NAME" className="block text-gray-700 font-semibold mb-2">NAME</label>
                        <input type="text" id="NAME" name="NAME" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={employee.NAME} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="AGE" className="block text-gray-700 font-semibold mb-2">Age</label>
                        <input type="number" id="AGE" name="AGE" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={employee.AGE} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="NUMBER" className="block text-gray-700 font-semibold mb-2">NUMBER</label>
                        <input type="text" id="NUMBER" name="NUMBER" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={employee.NUMBER} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ADDRESS" className="block text-gray-700 font-semibold mb-2">Address</label>
                        <input type="text" id="ADDRESS" name="ADDRESS" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={employee.ADDRESS} />
                    </div>
                    <div className="mt-4 text-center">
                        <button id="SubmitId" className=" text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const initialState = {
    NAME: "",
    AGE: "",
    NUMBER: "",
    ADDRESS: "",
    RoleId: ""
}

type Role = {
    RoleId : number;
    RoleName : string;
}

function FormTable() {
    const [state, setState] = useState(initialState);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        getAllRoles();
    }, []);

    const getAllRoles = async () => {
        try {
            const response = await axios.get<Role[]>("https://localhost:7186/api/Role");
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }

    const Add = async (data: typeof initialState) => {
        try {
            debugger;
            const response = await axios.post("https://localhost:7186/api/Employee", data);
            console.log(response.data);
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.NAME || !state.AGE || !state.NUMBER || !state.ADDRESS) {
            toast.error("Please provide a value for each input field");
        } else {
            Add(state);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setState({ ...state, [id]: value });
    };

    return (
        <>
            <div>
                <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Employee Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="NAME" className="block text-gray-700 font-semibold mb-2">NAME</label>
                            <input type="text" id="NAME" name="NAME" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.NAME} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="AGE" className="block text-gray-700 font-semibold mb-2">Age</label>
                            <input type="number" id="AGE" name="AGE" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.AGE} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="NUMBER" className="block text-gray-700 font-semibold mb-2">NUMBER</label>
                            <input type="text" id="NUMBER" name="NUMBER" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.NUMBER} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ADDRESS" className="block text-gray-700 font-semibold mb-2">Address</label>
                            <input type="text" id="ADDRESS" name="ADDRESS" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.ADDRESS} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ROLE" className="block text-gray-700 font-semibold mb-2">Role</label>
                            <select id="RoleId" name="RoleId"  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.RoleId}>
                                <option value="">Select Role</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role.RoleId}>{role.RoleName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4 text-center">
                            <button id="SubmitId" className="text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormTable;

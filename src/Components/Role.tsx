import React, { useState, FormEvent, ChangeEvent } from "react"; 
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const initialState = {
    RoleName: ""
}

function AddRoles() {
    const [state, setState] = useState(initialState);
    
    const addRole = async (data: typeof initialState) => {
        try {
            const response = await axios.post("https://localhost:7186/api/Role", data);
            console.log(response.data);
        } catch (error) {
            console.log("Error adding role:", error);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.RoleName) {
            toast.error("Please provide a value for each input field");
        } else {
            addRole(state);
        }
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setState({ ...state, [id]: value });
    };


    return(
        <>
        <div>
            <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Register Role</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="RoleName" className="block text-gray-700 font-semibold mb-2">RoleName</label>
                <input type="text" id="RoleName" name="RoleName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.RoleName} />
            </div>
            <div className="mt-4 text-center">
            <button id="SubmitId" className=" text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Submit
            </button>
            </div>
            </form>
            </div>
        </div>
        </>
    )


}

export default AddRoles;
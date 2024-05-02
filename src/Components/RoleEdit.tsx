import { useParams } from 'react-router-dom';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare } from "react-icons/bs";

type Role = {
    RoleId : number;
    RoleName: string;
}


function RoleEdit(){
    const {id} = useParams();
    const [role, setRole] = useState<Role>({
        RoleId: 0,
        RoleName : ""
    });

    useEffect(() => {
        const fetchRole = async () => {
            try{
                debugger;
                const response = await axios.get<Role>(`https://localhost:7186/api/Role/${id}`);
                setRole(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        debugger;
        fetchRole();
    }, [id]);


    const Update = async () =>{
        debugger;
        try{
            const response = await axios.put(`https://localhost:7186/api/Role/`,role);
            console.log(response.data);
        }
        catch(error){
            console.error("Error updating employee:", error);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!role.RoleName) {
            toast.error("Please provide a value for each input field");
        } else {
            await Update();
            // Optionally, you can redirect the user or perform any other action after successful update
            toast.success("Employee updated successfully");
        }
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRole({ ...role, [id]: value });
    };

    return(
        <>
        <div>
            <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Register Role</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="RoleName" className="block text-gray-700 font-semibold mb-2">RoleName</label>
                <input type="text" id="RoleName" name="RoleName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={role.RoleName} />
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


export default RoleEdit;
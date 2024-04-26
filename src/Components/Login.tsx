import React, { useState, FormEvent, ChangeEvent } from "react"; 
import NavBar from "./NavBar";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter as Router, Routes, Route, redirect  } from 'react-router-dom';
import FormTable from './FormTable.tsx';



const initialState = {
    USER: "",
    PASSWORD: ""
}

function Login(){
    const [state, setState] = useState(initialState);

    const RegisterCan = async(data : typeof initialState) => {
        debugger;
        try{
            debugger;
            // const history = useHistory();
            const response = await axios.post("https://localhost:7186/api/Register/Login", data);
            debugger;
            console.log(response.data);
            let Token = response.data.Token;
            console.log(Token);
            await localStorage.setItem("Token", Token);
            // history.push("/FormTable");
         
            window.location.href = "http://localhost:5173/FormTable";
        }
        catch(error){
            console.log("Error adding contact:", error);
        }
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.PASSWORD || !state.USER) {
            toast.error("Please Provide value into each input field");
        } else {
            RegisterCan(state);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                            <label htmlFor="USER" className="block text-gray-700 font-semibold mb-2">USER</label>
                            <input type="text" id="USER" name="USER" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.USER} />
                        </div>
                       
                        <div className="mb-4">
                            <label htmlFor="PASSWORD" className="block text-gray-700 font-semibold mb-2">PASSWORD</label>
                            <input type="password" id="PASSWORD" name="PASSWORD" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400" onChange={handleInputChange} value={state.PASSWORD} />
                        </div>
                        
                        <div className="mt-4 text-center">
                            <button id="SubmitId" className=" text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Submit
                            </button>
                            <button typeof="reset" id="ResetId" className=" text-red font-bold py-2 px-4 border border-blue-700 rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )


}


export default Login;
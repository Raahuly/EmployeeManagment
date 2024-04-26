import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare } from 'react-icons/bs';

type Employee = {
  ID: number;
  NAME: string;
  AGE: number;
  NUMBER: string;
  ADDRESS: string;
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee>({
    ID: 0,
    NAME: '',
    AGE: 0,
    NUMBER: '',
    ADDRESS: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get<Employee>(
          `https://localhost:7186/api/Employee/${id}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your update logic here
  };

  return (
    <div>
      <h2>Edit Page for ID: {id}</h2>
      <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-3">
            <label htmlFor="NAME" className="block text-gray-700 font-semibold mb-2">
              NAME
            </label><span>:-</span> <h4>{employee.NAME}</h4>
        
          </div>
          <div className="mb-4 flex gap-3">
            <label htmlFor="AGE" className="block text-gray-700 font-semibold mb-2">
              Age
            </label><span>:-</span> <h4>{employee.AGE.toString()}</h4>
           
          </div>
          <div className="mb-4 flex gap-3">
            <label htmlFor="NUMBER" className="block text-gray-700 font-semibold mb-2">
              NUMBER
            </label><span>:-</span> <h4>{employee.NUMBER}</h4>
          
          </div>
          <div className="mb-4 flex gap-3">
            <label htmlFor="ADDRESS" className="block text-gray-700 font-semibold mb-2">
              Address
            </label><span>:-</span> <h4>{employee.ADDRESS}</h4>
           
          </div>
          <div className="mt-4 text-center">
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;



import axios from 'axios';
import React from 'react';
import toast,{Toaster} from 'react-hot-toast';

const DeleteEmployeeForm = ({ setIsDeleteModelClicked, singleEmployee, setSingleEmployee }) => {

    const closeDeleteModelHandler = () => {
        setIsDeleteModelClicked(false);
        setSingleEmployee(null);
    }

    const handleDelete = async () => {
        
        try {
            await axios.delete(`/api/admin/deleteEmployee?id=${singleEmployee._id}`,{
                withCredentials: true
            });
            toast.success("Employee deleted successfully");
            setIsDeleteModelClicked(false);
            setSingleEmployee(null);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

     
    }

    return (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/40 overflow-hidden">
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='bg-white p-8 rounded-md shadow-lg'>
                    <h1 className='text-lg font-semibold'>Are you sure you want to delete {singleEmployee?.name}?</h1>
                    <div className='flex justify-center gap-4 mt-6'>
                        <button 
                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button 
                            className='bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400'
                            onClick={closeDeleteModelHandler}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteEmployeeForm;

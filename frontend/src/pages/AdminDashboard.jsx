import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EditEmployeeForm from "../components/EditEmployeeForm";
import DeleteEmployeeForm from "../components/DeleteEmployeeForm";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [employees, setEmployees] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isAddEmployeeClicked, setIsAddEmployeeClicked] = useState(false);
  const [isEditEmployeeClicked, setIsEditEmployeeClicked] = useState(false);
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [isDeleteModelClicked, setIsDeleteModelClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get(`/api/admin/getEmployees`, {
        withCredentials: true,
        params: {
          sortBy,
        },
      });
      setEmployees(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.checked ? event.target.name + ":-1" : "");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const addEmployeeHandler = (e) => {
    e.preventDefault();
    setIsAddEmployeeClicked(true);
  };

  const editHandler = (employee) => {
    console.log("Edit clicked");
    console.log(employee);
    setIsEditEmployeeClicked(true);
    setSingleEmployee(employee);
  };

  const deleteHandler = (employee) => {
    setIsDeleteModelClicked(true);
    setSingleEmployee(employee);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto px-10">
      <h1 className="text-3xl font-medium">Welcome to Admin Panel</h1>
      <h1 className="text-center text-xl">Employee List</h1>

      <div className="flex items-center gap-5">
        <input
          type="text"
          placeholder="Search by name or email"
          className="outline-none border-2 border-black px-3 py-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="name">Sort by Name</label>
          <input
            type="checkbox"
            name="name"
            onChange={handleSortChange}
            placeholder="Sort by Names"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="createdAt">Sort by Date</label>
          <input
            type="checkbox"
            name="createdAt"
            onChange={handleSortChange}
            placeholder="sort by date"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <label htmlFor="email">Sort by Email</label>
          <input
            type="checkbox"
            name="email"
            onChange={handleSortChange}
            placeholder="sort by email"
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute flex items-end justify-center right-14 -top-1 py-2 gap-5 ">
          <h1>Total Count: {filteredEmployees.length}</h1>
          <button
            onClick={addEmployeeHandler}
            className="bg-green-500 py-1 rounded-md px-3 hover:scale-95 transition-transform"
          >
            Create Employee
          </button>
        </div>
        {filteredEmployees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          <div className="border-2 p-10">
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Employee Id</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Designation</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Create Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="border px-4 py-2">{employee._id}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={employee.image}
                        alt=""
                        className="w-[70px] object-fill rounded-full"
                      />
                    </td>
                    <td className="border px-4 py-2">{employee.name}</td>
                    <td className="border px-4 py-2">{employee.email}</td>
                    <td className="border px-4 py-2">{employee.mobNumber}</td>
                    <td className="border px-4 py-2">{employee.designation}</td>
                    <td className="border px-4 py-2">{employee.gender}</td>
                    <td className="border px-4 py-2">{employee.course}</td>
                    <td className="border px-4 py-2">
                      {formatDate(employee.createdAt)}
                    </td>
                    <td className="border-t px-4 py-3">
                      <button
                        className="bg-[#eeee] p-1 px-3 mr-3"
                        onClick={() => editHandler(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-400 p-1 px-2"
                        onClick={() => deleteHandler(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isAddEmployeeClicked && (
        <AddEmployeeForm setIsAddEmployeeClicked={setIsAddEmployeeClicked} />
      )}
      {isEditEmployeeClicked && (
        <EditEmployeeForm
          setIsEditEmployeeClicked={setIsEditEmployeeClicked}
          singleEmployee={singleEmployee}
          setSingleEmployee={setSingleEmployee}
        />
      )}
      {isDeleteModelClicked && (
        <DeleteEmployeeForm
          setIsDeleteModelClicked={setIsDeleteModelClicked}
          singleEmployee={singleEmployee}
          setSingleEmployee={setSingleEmployee}
        />
      )}

      <Toaster />
    </div>
  );
};

export default AdminDashboard;

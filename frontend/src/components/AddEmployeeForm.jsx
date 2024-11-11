import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddEmployeeForm = ({ setIsAddEmployeeClicked }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isImageUploading, setImageUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    uploadImage(selectedImage);
  };

  const uploadImage = async (file) => {
    if (!file) {
      setError("Please select an image");
      return;
    }

    setImageUploading(true);

    try {
      const newData = new FormData();
      newData.append("file", file);
      newData.append("upload_preset", "campuse-connect");
      newData.append("cloud_name", "dn8vqsuvc");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dn8vqsuvc/image/upload",
        {
          method: "POST",
          body: newData,
        }
      );

      const fileData = await response.json();
      setImage(fileData.url);
      setImageUploading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to upload image");
      setImageUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "api/admin/addEmployee",
        {
          name,
          email,
          mobNumber: mobile,
          designation,
          gender,
          course,
          image,
        },
        { withCredentials: true }
      );

      toast.success("Employee added successfully");
      setIsAddEmployeeClicked(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
        <button
          className="absolute top-4 right-4 text-red-500 text-lg"
          onClick={() => setIsAddEmployeeClicked(false)}
        >
          &times;
        </button>
        <form onSubmit={onSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Add Employee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-opacity-50"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-opacity-50"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium">
                Mobile Number
              </label>
              <input
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-opacity-50"
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium"
              >
                Designation
              </label>
              <select
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-opacity-50"
                required
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <div className="flex gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-1"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-1"
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <div className="flex gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="MCA"
                    checked={course === "MCA"}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mr-1"
                  />
                  MCA
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="BCA"
                    checked={course === "BCA"}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mr-1"
                  />
                  BCA
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="BSC"
                    checked={course === "BSC"}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mr-1"
                  />
                  BSC
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="image"
              onChange={handleFileChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            disabled={isImageUploading}
            className={`w-full py-2 mt-4 text-white rounded-md transition transform ${
              isImageUploading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit"
          >
            {isImageUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddEmployeeForm;
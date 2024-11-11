
import axios from "axios";
import React, { useState } from "react";
import toast,{Toaster} from "react-hot-toast";

const EditEmployeeForm = ({singleEmployee,setIsEditEmployeeClicked,setSingleEmployee}) => {
    const [name, setName] = useState(singleEmployee?.name);
    const [email, setEmail] = useState(singleEmployee?.email);
    const [mobile, setMobile] = useState(singleEmployee?.mobNumber);
    const [designation, setDesignation] = useState(singleEmployee?.designation);
    const [gender, setGender] = useState(singleEmployee?.gender);
    const [course, setCourse] = useState(singleEmployee?.course);
    const [image, setImage] = useState(singleEmployee?.image);
    const [error, setError] = useState("");
    const [isImageUploading, setImageUploading] = useState(false);
  
    const handleFileChange = (e) => {
      setImage(e.target.files[0]);
      uploadImage();
    };
  
    const uploadImage = async () => {
      if (!image) {
        setError("Please select an image");
        return;
      }
  
      setImageUploading(true);
  
      try {
        const newData = new FormData();
        newData.append("file", image);
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
        const res = await axios.put(
          `api/admin/updateEmployee?id=${singleEmployee._id}`,
          {
            name,
            email,
            mobNumber: mobile,
            designation,
            gender,
            course,
            image,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
        toast.success("Employee updated successfully");
        setIsEditEmployeeClicked(false);
        setSingleEmployee(null);
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || "Something went wrong");
      }
    };

    const closeEditModelHandler=(e)=>{
      e.preventDefault();
      setIsEditEmployeeClicked(false);
      setSingleEmployee(null);
    }
  
    return (
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/40 overflow-hidden">
        <button className="bg-red-500 text-2xl absolute top-36 right-[30%] px-3 pb-1 rounded-md flex items-center justify-center" onClick={closeEditModelHandler}>x</button>
        <form
          onSubmit={onSubmit}
          className="w-full h-full flex flex-col items-center justify-center gap-4 mt-10 "
        >
          <div className="bg-white w-[700px] flex flex-col items-center gap-2 justify-center p-6">
            {/* Name */}
            <div className="flex flex-col ">
              <label htmlFor="name" className="text-lg">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 outline-none border border-black rounded-md"
                placeholder="Enter name"
              />
            </div>
  
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 outline-none border border-black rounded-md"
                placeholder="Enter email"
              />
            </div>
  
            {/* Mobile number */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-lg">
                Mobile number
              </label>
              <input
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="px-3 py-2 outline-none border border-black rounded-md"
                placeholder="Enter mobile number"
              />
            </div>
  
            {/* Designation */}
            <div className="flex gap-2">
              <label htmlFor="designation" className="">
                Select Designation
              </label>
              <select
                name="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="border-2 outline-none"
              >
                <option value=""></option>
                <option value="Manager">Manager</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
  
            <div className="flex items-center gap-6">
              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label className="text-lg">Select Gender</label>
                <div>
                  <label htmlFor="male" className="text-lg">
                    Male
                    <input
                      type="radio"
                      id="male"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="female" className="text-lg">
                    Female
                    <input
                      type="radio"
                      id="female"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>
              </div>
  
              {/* Course */}
              <div className="flex flex-col gap-2">
                <label className="text-lg">Select Course</label>
                <div>
                  <label htmlFor="MCA" className="text-lg">
                    MCA
                    <input
                      type="radio"
                      id="MCA"
                      value="MCA"
                      checked={course === "MCA"}
                      onChange={(e) => setCourse(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="BCA" className="text-lg">
                    BCA
                    <input
                      type="radio"
                      id="BCA"
                      value="BCA"
                      checked={course === "BCA"}
                      onChange={(e) => setCourse(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                <label htmlFor="BSC" className="text-lg">
                  BSC
                  <input
                    type="radio"
                    id="BSC"
                    value="BSC"
                    checked={course === "BSC"}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </label>
              </div>
              </div>
            </div>
  
            {/* Image */}
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-lg">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                onChange={handleFileChange}
                className="px-3 py-2 outline-none border border-black rounded-md"
              />
            </div>
  
            {/* Submit button */}
            <button
              disabled={isImageUploading}
              className="bg-green-500 px-9 py-3 rounded-md hover:scale-95 transition-transform"
              type="submit"
            >
              {isImageUploading ? "Image Uploading..." : "Update"}
            </button>
          </div>
        </form>
        <Toaster/>
      </div>
    );
  };

export default EditEmployeeForm
import generateToken from "../config/generateToken.js";
import Admin from "../models/adminSchema.js";

import asyncHandler from "express-async-handler";
import Employee from "../models/employeeSchema.js";

const createAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // console.log("dad");
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists = await Admin.findOne({ username });
  // console.log("hi");
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const admin = await Admin.create({ username, password });
  // console.log(admin);
  if (admin) {
    res.status(201).json({
      _id: admin.id,
      username: admin.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const admin = await Admin.findOne({ username });
  generateToken(res, admin._id);
  if (admin && (await admin.matchPasswords(password))) {
    res.json({
      _id: admin.id,
      username: admin.username,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobNumber, designation, gender, course, image } =
    req.body;
  console.log(req.body);
  if (
    !name ||
    !email ||
    !mobNumber ||
    !designation ||
    !gender ||
    !course ||
    !image
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const employeeExist = await Employee.findOne({ email });
  const phoneExist = await Employee.findOne({ mobNumber });

  console.log(employeeExist);
  // console.log(employeeExist);
  if (employeeExist) {
    res.status(400);
    throw new Error("Employee already exists");
  }
  if (phoneExist) {
    res.status(400);
    throw new Error("Phone number already exists");
  }
  const employee = await Employee.create({
    name,
    email,
    mobNumber,
    designation,
    gender,
    course,
    image,
  });
  if (employee) {
    return res.status(201).json({
      status: "employee added successfully",
      data: employee,
    });
  } else {
    res.status(400);
    throw new Error("Internal Server Error");
  }
});
const getAllEmployees = asyncHandler(async (req, res) => {
  let employees;

  if (req.query.sortBy) {
    const query = req.query.sortBy;
    console.log(query);

    // Convert query string to valid JSON
    const toJSONString = ("{" + query + "}").replace(
      /(\w+:)|(\w+ :)/g,
      (matched) => {
        return '"' + matched.substring(0, matched.length - 1) + '":';
      }
    );

    // Sort by the parsed JSON object
    employees = await Employee.find().sort(JSON.parse(toJSONString));
  } else {
    // No sorting criteria provided, fetch all employees
    employees = await Employee.find();
  }

  if (employees) {
    return res.status(200).json({
      status: "success",
      data: employees,
      count: employees.length,
    });
  } else {
    res.status(400);
    throw new Error("Internal Server Error");
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400);
    throw new Error("Please provide employee id");
  }
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedEmployee) {
    return res.status(200).json({
      status: "employee updated successfully",
      data: updatedEmployee,
    });
  } else {
    res.status(400);
    throw new Error("Internal Server Error");
  }
});
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400);
    throw new Error("Please provide employee id");
  }
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (deletedEmployee) {
    return res.status(200).json({
      status: "employee deleted successfully",
      data: deletedEmployee.name,
    });
  } else {
    res.status(400);
    throw new Error("Internal Server Error");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export {
  createAdmin,
  loginAdmin,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  logoutAdmin,
};

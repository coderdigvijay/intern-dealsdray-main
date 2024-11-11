import express from "express";
import {
  createAdmin,
  loginAdmin,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  logoutAdmin,
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.get("/getEmployees", protect, getAllEmployees);
router.post("/addEmployee", protect, addEmployee);
router.put("/updateEmployee", protect, updateEmployee);
router.delete("/deleteEmployee", protect, deleteEmployee);
router.post("/logout", protect, logoutAdmin);

export default router;

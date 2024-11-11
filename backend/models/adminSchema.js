import mongoose from "mongoose"
import {z} from "zod"
import bcrypt from "bcryptjs"

const adminSchema = z.object({
    username:z.string().min(3).max(20),
    password: z.string().min(6),
})

const AdminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  AdminSchema.pre('save', async function (next) {
    try {
      const validatedAdminData = adminSchema.parse(this.toObject());
      if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
      }
      next(); // Continue with the save operation if validation passes
    } catch (error) {
      // If validation fails, pass the error to the next middleware (error handling middleware)
      next(error); 
    }
  });
  AdminSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Create Mongoose model
  const Admin = mongoose.model('Admin', AdminSchema);
  
 export default Admin
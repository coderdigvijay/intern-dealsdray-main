import mongoose from "mongoose"
import {z} from "zod"

const DesignationEnum = ["Manager", "HR", "Sales"];
const GenderEnum = ["Male", "Female",];
const courseEnum = ["MCA", "BCA", "BSC"]

const employeeSchema = z.object({
    name:z.string().max(20),
    email:z.string().email(),
    mobNumber:z.number()
})

const EmployeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required:[true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required:[true, "Please add an email"],
      trim: true,
      unique: true
    },
    mobNumber:{
        type: Number,
        required:[true, "Please add a mobile number"],
        trim: true,
        unique: true
    },
    designation: {
        type: String,
        enum: DesignationEnum, 
        required: [true, "Please add a designation"],
        trim: true,
    },
    gender: {
        type: String,
        enum: GenderEnum, 
        required: [true, "Please add a gender"],
        trim: true,
    },
    course:{
        type:String,
        enum:courseEnum,
        required:[true, "Please add a course"],
        trim: true
    },
    image:{
        type:String,
        // required:[true, "Please add an image"],
        trim:true
    }
},
{
    timestamps:true
})

EmployeeSchema.pre("save", async function(next){
    try {
        const validatedAdminData = employeeSchema.parse(this.toObject());
        next()
    } catch (error) {
        next(error)
    }
})
const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee
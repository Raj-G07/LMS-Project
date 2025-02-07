import mongoose from "mongoose";

const connectDB = async (params) => {
    try {
       await mongoose.connect(process.env.MONGO_URI) 
       console.log("db connected")
    } catch (error) {
        console.log("error occured" ,error)
    }
}
export default connectDB;
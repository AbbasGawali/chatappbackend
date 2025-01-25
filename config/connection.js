import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async () => {
    try {
        const data = await mongoose.connect(process.env.MONGOURI);
        if (data) {
            console.log("connection success")
        }
    } catch (err) {
        console.log("connection Failed with : " + err)
    }

}
connectDb();
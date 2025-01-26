import express from "express"
import dotenv from "dotenv";
dotenv.config();
const app = express();
import "./config/connection.js"
const port = process.env.PORT || 7000
import UserRoutes from "./routes/UserRoutes.js"
import MessageRoutes from "./routes/MessageRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow credentials like cookies or Authorization headers
}))
app.use(cookieParser());
app.use(express.json())
app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/message", MessageRoutes)


app.get("/", (req, res) => {
    console.log("welcome to backend");
    res.send("backend welcome")
})


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})
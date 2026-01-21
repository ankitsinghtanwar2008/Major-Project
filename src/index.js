import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

// 1. Fix: The path should usually be "./.env" (with a dot)
dotenv.config({
    path: './.env' 
})

connectDB()
.then(() => {
    // 2. Fix: Move the callback inside the app.listen() parentheses
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`⚙️  Server is running at port : ${port}`);
    });
})
.catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
})
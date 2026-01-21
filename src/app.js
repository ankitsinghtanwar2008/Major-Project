import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// 1. CORS configuration - Fixed: wrapped in cors() function
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// 2. Common Middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// 3. Static files - Fixed: changed "Public" to "public" to match your folder
app.use(express.static("public"))

// 4. Cookie Parser
app.use(cookieParser())


// --- Routes Import ---
import userRouter from "./routes/user.routes.js"


// --- Routes Declaration ---
app.use("/api/v1/users", userRouter) 

// Example URL: http://localhost:8000/api/v1/users/register

export { app }
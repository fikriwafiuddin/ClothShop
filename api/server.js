import express from "express"
import cors from "cors"
import connectDB from "./utils/db.js"
import "dotenv/config"
import route from "./router.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
connectDB()
app.use(route)

app.listen(3000, () => console.log("Server running on port 3000"))

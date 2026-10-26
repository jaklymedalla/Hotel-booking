import express from "express"
import  "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

connectDB()

const app = express()
app.use(cors()) //Enable cross-origin resource sharing. Connects to Frontend

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//API to listen to Clerk Webhooks
app.post("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send('API is working fine'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
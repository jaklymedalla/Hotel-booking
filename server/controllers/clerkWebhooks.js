import User from "../models/User.js";
import { Webhook } from "svix";
import connectDB from "../config/db.js"; // Ensure correct path to db.js

const clerkWebhooks = async (req, res) => {
    try {
        // 1. Explicitly await the database connection pool connection check
        await connectDB();

        // 2. Validate standard webhook verification tokens
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        
        await whook.verify(JSON.stringify(req.body), headers);
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || "",
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
        };

        // 3. Complete database modifications synchronously before returning HTTP codes
        switch (type) {
            case "user.created": {
                // Turn off internal mongoose buffering limits for serverless functions
                await User.create(userData, { bufferCommands: false });
                console.log("MongoDB Success: Document added!");
                return res.json({ success: true, message: "User created in Database" });
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData, { new: true, bufferCommands: false });
                console.log("MongoDB Success: Document updated!");
                return res.json({ success: true, message: "User updated in Database" });
            }
            default:
                break;
        }

        return res.json({ success: true, message: "Webhook processed (ignored action type)" });

    } catch (error) {
        console.error("Serverless Webhook Exception Log:", error.message);
        // Fall back gracefully with a failure code block so Clerk can log it
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default clerkWebhooks;

 
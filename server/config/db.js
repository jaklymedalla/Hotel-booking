import mongoose from "mongoose";

// Keep track of connection status globally so Vercel can reuse it
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Reusing existing database connection pool');
        return;
    }

    try {
        mongoose.connection.on('connected', () => {
            console.log('Database Connected');
            isConnected = true;
        });

        // FIXED: Pass MONGODB_URI directly and use dbName option instead of template slash interpolation
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "hotel-booking",
            serverSelectionTimeoutMS: 5000 // If DB goes down, fail fast in 5s instead of hanging for 10s
        });

    } catch (error) {
        console.error("Database connection error:", error.message);
    }
}

export default connectDB;
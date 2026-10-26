import mongoose from "mongoose";

let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI, {
            dbName: "hotel-booking",
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false,
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("Database Connected");
    } catch (err) {
        cached.promise = null; // allow retry on next request
        throw err;             // surface the real error
    }
    return cached.conn;
};

export default connectDB;
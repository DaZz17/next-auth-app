import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

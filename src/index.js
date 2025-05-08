import { connectDB } from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js";

// initialize the database connection and listen for incoming requests
connectDB();
app.listen(PORT);
console.log("Server on port", PORT);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./db/connectdb.js";
import userRouter from "./routes/user.routes.js";
import transportRoute from "./routes/transport.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import path from "path"
import { fileURLToPath } from "url"; // Add this import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables

const App = express();

// Middleware
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// Routers
App.use(userRouter);
App.use(transportRoute);
App.use(bookingRouter);

// Connect to database
connectdb();

App.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);

// Deployment setup
// Serve static files from the frontend build folder
App.use(express.static(path.join(__dirname, "../frontend/dist")));

// All other routes should redirect to the frontend's index.html
App.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


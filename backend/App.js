import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./db/connectdb.js";
import userRouter from "./routes/user.routes.js";
import transportRoute from "./routes/transport.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import path from "path"

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
const dirPath = path.resolve();
if (process.env.NODE_ENV === "PRODUCTION") {
  App.use(express.static(path.join(dirPath, "../frontend/dist")));

  App.get("*", (req, res) => {
    res.sendFile(path.join(dirPath, "../frontend", "dist", "index.html"));
  });
}


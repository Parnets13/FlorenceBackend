import express from "express";
import cors from "cors";
import { connectDb } from "./config/dB.js";
import adminRouter from "./routes/adminRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;

// MongoDb Connection
connectDb();

app.use("/api/v1/admin", adminRouter);

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

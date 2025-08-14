import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

// import notesRoutes from './routes/notesRoutes.js';
import authRoute from './routes/userRoutes.js';
import {connectDB} from "./config/db.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
}))

app.use("/api/auth",authRoute);
 
// app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  });
})



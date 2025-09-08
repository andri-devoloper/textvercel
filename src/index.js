// src\index.js
import express from "express";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express + Prisma + MongoDB on Vercel!" });
});

app.use("/api/items", itemRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;

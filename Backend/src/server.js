require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { connectRedis } = require("./utils/cache");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Connect to Redis
connectRedis();

// Routes
app.use("/api/faqs", faqRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

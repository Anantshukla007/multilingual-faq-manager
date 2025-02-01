const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());  // Parse incoming JSON data
app.use(cors());  // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB...");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Use routes
app.use("/api/faqs", faqRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes");
const { adminJs, adminRouter } = require("./admin");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Use routes
app.use("/api/faqs", faqRoutes);
app.use(adminJs.options.rootPath, adminRouter); // Add AdminJS

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin Panel available at http://localhost:${PORT}/admin`);
});

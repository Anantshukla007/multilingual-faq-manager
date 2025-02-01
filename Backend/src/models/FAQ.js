const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }, // HTML for WYSIWYG support
    translations: {
        hi: { type: String },
        bn: { type: String },
        // Add more languages here as needed
    }
});

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;

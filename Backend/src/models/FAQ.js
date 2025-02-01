const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
        type: Map,
        of: String, // Stores { "hi": "Hindi Question", "bn": "Bengali Question", etc. }
    }
});

// Method to get translated question based on language
faqSchema.methods.getTranslatedQuestion = function (lang) {
    return this.translations.get(lang) || this.question; // Fallback to English if unavailable
};

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;

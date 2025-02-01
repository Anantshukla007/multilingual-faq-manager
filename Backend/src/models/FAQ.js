const mongoose = require("mongoose");
const sanitizeHtml = require("sanitize-html");

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }, // Stores HTML/Text from WYSIWYG editor
    translations: {
        type: Map,
        of: String, // Stores { "hi": "Hindi Question", "bn": "Bengali Question", etc. }
    }
});

// Middleware: Sanitize answer before saving to DB
faqSchema.pre("save", function (next) {
    this.answer = sanitizeHtml(this.answer, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
        allowedAttributes: {
            "*": ["style", "class"],
            "a": ["href", "name", "target"],
            "img": ["src", "alt", "width", "height"],
        },
    });
    next();
});

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;

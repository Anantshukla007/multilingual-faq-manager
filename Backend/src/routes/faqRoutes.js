const express = require("express");
const FAQ = require("../models/FAQ");
const router = express.Router();

// Create FAQ with WYSIWYG-supported answer
router.post("/", async (req, res) => {
    try {
        const { question, answer, translations } = req.body;
        const newFAQ = new FAQ({ question, answer, translations });
        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({ message: "Error saving FAQ", error });
    }
});

module.exports = router;

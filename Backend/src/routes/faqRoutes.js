const express = require("express");
const FAQ = require("../models/FAQ");
const redis = require("redis");

const router = express.Router();
const client = redis.createClient(); // Connect to the local Redis instance

client.on("connect", function() {
    console.log("Connected to Redis...");
});

// CREATE FAQ (POST)
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

// GET all FAQs with language query (GET)
router.get("/", async (req, res) => {
    try {
        const lang = req.query.lang || "en"; // Default to English if no language is provided
        const cacheKey = `faqs_${lang}`;

        // Check cache first
        client.get(cacheKey, async (err, cachedFaqs) => {
            if (cachedFaqs) {
                return res.status(200).json(JSON.parse(cachedFaqs)); // Return cached data
            }

            const faqs = await FAQ.find();
            const translatedFaqs = faqs.map(faq => {
                const translatedQuestion = faq.translations[lang] || faq.question;
                const translatedAnswer = faq.translations[`${lang}_answer`] || faq.answer;
                return {
                    ...faq.toObject(),
                    question: translatedQuestion,
                    answer: translatedAnswer
                };
            });

            // Cache the response for 1 hour
            client.setex(cacheKey, 3600, JSON.stringify(translatedFaqs));
            res.status(200).json(translatedFaqs);
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching FAQs", error });
    }
});

// GET single FAQ by ID with language query (GET)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const lang = req.query.lang || "en"; // Default to English if no language is provided

        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: "FAQ not found" });
        }

        const translatedQuestion = faq.translations[lang] || faq.question;
        const translatedAnswer = faq.translations[`${lang}_answer`] || faq.answer;

        res.status(200).json({
            ...faq.toObject(),
            question: translatedQuestion,
            answer: translatedAnswer
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching FAQ", error });
    }
});

// UPDATE FAQ by ID (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedFAQ) {
            return res.status(404).json({ message: "FAQ not found" });
        }
        res.status(200).json(updatedFAQ);
    } catch (error) {
        res.status(500).json({ message: "Error updating FAQ", error });
    }
});

// DELETE FAQ by ID (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
        if (!deletedFAQ) {
            return res.status(404).json({ message: "FAQ not found" });
        }
        res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting FAQ", error });
    }
});

module.exports = router;

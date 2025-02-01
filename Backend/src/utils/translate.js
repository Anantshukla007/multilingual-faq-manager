const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

const translateText = async (text, targetLanguage) => {
    try {
        const [translatedText] = await translate.translate(text, targetLanguage);
        return translatedText;
    } catch (error) {
        console.error("Translation Error:", error);
        return text; // Return original text if translation fails
    }
};

module.exports = translateText;
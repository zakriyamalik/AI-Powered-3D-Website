import express from 'express';
import * as dotenv from 'dotenv';
// Importing the OpenAI package
import OpenAI from 'openai';

dotenv.config();

// Verify if the API key is loaded
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const router = express.Router();

// Check if the API key is defined before creating an instance


const config = {
    apiKey:'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',
};

const openai = new OpenAI(config);

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
        });

        const image = response.data.data[0].b64_json;
        res.status(200).json({ photo: image });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;

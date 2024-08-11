const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = await response.text();

        console.log('Gemini API Response:', text);

        // Format the response to include HTML tags
        const formattedText = formatResponse(text);

        res.json({ reply: formattedText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function formatResponse(text) {
    // Example function to format the response as HTML
    // This can be customized based on your requirements
    const lines = text.split('\n');
    const formattedLines = lines.map(line => `<p>${line}</p>`);
    return formattedLines.join('');
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

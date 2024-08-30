const axios = require('axios');

const API_KEY = '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';

async function getResponseFromIA(query) {
    try {
        const response = await axios.post('https://api.groqcloud.com/llama3-8b-8192', {
            query: query,
            api_key: API_KEY
        });

        return response.data.answer;
    } catch (error) {
        console.error('Error al consultar la IA:', error);
        return 'Lo siento, no puedo responder en este momento.';
    }
}

module.exports = { getResponseFromIA };
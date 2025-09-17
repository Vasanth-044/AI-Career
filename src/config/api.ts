// API Configuration
// To use the Gemini AI chatbot, you need to:
// 1. Get a Gemini API key from https://makersuite.google.com/app/apikey
// 2. Create a .env file in the root directory
// 3. Add: VITE_GEMINI_API_KEY=your_actual_api_key_here

export const API_CONFIG = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
};

export const isGeminiConfigured = () => {
  return API_CONFIG.GEMINI_API_KEY && API_CONFIG.GEMINI_API_KEY !== '';
};

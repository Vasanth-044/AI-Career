// Gemini AI Service for Vasanth Chatbot
import { API_CONFIG, isGeminiConfigured } from '../config/api';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export async function generateGeminiResponse(userMessage: string): Promise<string> {
  if (!isGeminiConfigured()) {
    return "I'm sorry, but I need a valid Gemini API key to provide AI-powered responses. Please create a .env file in the root directory and add: VITE_GEMINI_API_KEY=your_actual_api_key_here. You can get an API key from https://makersuite.google.com/app/apikey";
  }

  try {
    // Pass the user's message verbatim to Gemini to mirror its output exactly
    const prompt = userMessage;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    console.log('Making request to:', API_CONFIG.GEMINI_API_URL);
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${API_CONFIG.GEMINI_API_URL}?key=${API_CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    console.log('API Response:', data);
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "I'm sorry, I couldn't generate a response at the moment. Please try again.";
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return `I'm experiencing technical difficulties. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`;
  }
}

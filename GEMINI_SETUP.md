# Gemini AI Setup Instructions

To enable the Vasanth AI chatbot functionality, you need to set up a Gemini API key.

## Steps to Setup:

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

2. **Configure the API Key:**
   - Create a `.env` file in the root directory of this project
   - Add the following line to the `.env` file:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with the API key you copied

3. **Restart the Development Server:**
   - Stop the current development server (Ctrl+C)
   - Run `npm run dev` again

## Example .env file:
```
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Troubleshooting:
- Make sure the `.env` file is in the root directory (same level as package.json)
- Ensure the API key starts with `VITE_` prefix
- Restart the development server after adding the API key
- Check the browser console for any error messages
- **If you get a 404 error**: The API is now using `gemini-1.5-flash` model. Make sure your API key has access to this model.

## Current Configuration:
- **Model**: `gemini-1.5-flash` (updated from deprecated `gemini-pro`)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`

Once configured, the Vasanth chatbot will use Gemini AI to provide intelligent career guidance and responses to your questions.

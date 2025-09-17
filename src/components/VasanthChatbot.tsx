import { useState, useRef, useEffect } from 'react';
import { generateGeminiResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface VasanthChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

function VasanthChatbot({ isOpen, onClose }: VasanthChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Vasanth, your career assistant. I'm here to help you with career guidance and answer questions. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  type MessageSegment = { type: 'text'; content: string } | { type: 'code'; content: string; language?: string };

  const parseMessageSegments = (text: string): MessageSegment[] => {
    // Parse triple backtick code fences: ```lang\n...code...\n```
    const segments: MessageSegment[] = [];
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const [full, lang, code] = match;
      const start = match.index;
      if (start > lastIndex) {
        segments.push({ type: 'text', content: text.slice(lastIndex, start) });
      }
      segments.push({ type: 'code', content: code.trimEnd(), language: lang || undefined });
      lastIndex = start + full.length;
    }
    if (lastIndex < text.length) {
      segments.push({ type: 'text', content: text.slice(lastIndex) });
    }
    // If no fenced code found but looks like code (multiple lines with braces or imports), wrap entire text as code
    if (segments.length === 1 && segments[0].type === 'text') {
      const t = segments[0].content;
      const looksLikeCode = /(^|\n)\s*(function |const |let |var |class |#include |import |def |public |private |<\/?[a-zA-Z]+>)/.test(t) && t.split('\n').length >= 3;
      if (looksLikeCode) {
        return [{ type: 'code', content: t.trim() }];
      }
    }
    return segments;
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsTyping(true);

    try {
      // Get AI response from Gemini
      const aiResponse = await generateGeminiResponse(currentInput);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[520px] md:w-[640px] h-[720px] bg-white rounded-2xl shadow-soft-lg border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-white text-gray-800 p-4 rounded-t-2xl flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">V</span>
          </div>
          <div>
            <h3 className="font-semibold">Vasanth</h3>
            <p className="text-xs text-gray-500">Career Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.isUser ? (
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              ) : (
                <div className="space-y-3">
                  {parseMessageSegments(message.text).map((seg, idx) => (
                    seg.type === 'code' ? (
                      <div key={idx} className="relative group">
                        <pre className="text-xs md:text-sm bg-black text-white rounded-lg p-3 overflow-x-auto">
                          <code>
                            {seg.content}
                          </code>
                        </pre>
                        <button
                          onClick={() => handleCopy(seg.content)}
                          className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 p-1.5 rounded-md border border-white/30 text-white"
                          aria-label="Copy code"
                          title="Copy code"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <p key={idx} className="text-sm whitespace-pre-wrap">{seg.content}</p>
                    )
                  ))}
                </div>
              )}
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VasanthChatbot;

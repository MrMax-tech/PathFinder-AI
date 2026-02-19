
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Sparkles } from 'lucide-react';
import { chatWithMentor } from '../geminiService';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const MentorChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello Alex! I'm your PathFinder Mentor. Whether you have a technical question, need career advice, or want to prep for an interview, I'm here to help." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithMentor(userMsg, "User is interested in Full Stack Development and is currently Level 14.");
      setMessages(prev => [...prev, { role: 'bot', text: response || "I'm sorry, I couldn't process that right now." }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">PathFinder AI Mentor</h3>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Online & Ready
            </p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Sparkles size={18} />
           </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-slate-700' : 'bg-indigo-600'}`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'}`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 bg-slate-800 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative flex items-center gap-2 bg-slate-800 border border-slate-700 p-2 pl-4 rounded-2xl focus-within:border-indigo-500 transition-colors">
          <input 
            type="text" 
            placeholder="Ask me anything about your career..." 
            className="flex-1 bg-transparent border-none outline-none text-slate-100 text-sm py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Mic size={18} />
            </button>
            <button 
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChatView;

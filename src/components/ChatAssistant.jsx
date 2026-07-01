import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: '您好，我是 CityAI 應變顧問。請問有什麼需要協助的假設性問題 (What-if) 嗎？' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `根據 SOP 規定，若發生「${input}」的狀況，建議立即啟動 B 級應變機制，並增加周邊號誌綠燈秒數 20%。` 
      }]);
    }, 1000);
  };

  return (
    <div className="chat-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            alignItems: 'flex-start',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{ 
              width: 32, height: 32, borderRadius: '50%', 
              background: msg.role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} color="#06b6d4" />}
            </div>
            <div style={{ 
              background: msg.role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.05)', 
              padding: '0.75rem 1rem', 
              borderRadius: '12px',
              borderTopRightRadius: msg.role === 'user' ? '0' : '12px',
              borderTopLeftRadius: msg.role === 'bot' ? '0' : '12px',
              maxWidth: '80%',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="輸入假設性情境 (例: 若 BL17 人潮超過 4萬人)..." 
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', padding: '0 0.5rem' }}
          />
          <button 
            onClick={handleSend}
            style={{ background: '#3b82f6', border: 'none', width: 32, height: 32, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

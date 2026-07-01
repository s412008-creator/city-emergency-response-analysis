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

    // Mock bot response based on keywords
    setTimeout(() => {
      let reply = `根據分析，對於「${input}」的情境，建議啟動標準巡檢程序，確保周邊交通順暢。`;
      
      if (input.includes('塌陷') || input.includes('車禍') || input.includes('事故')) {
        reply = '依據【SOP 第 2 條：車禍與路障應變】：若發生嚴重路段阻斷，應立即篩選主疏散替代道路，引導車流，並更新 CMS 告示「前方事故封閉，請改道，預計延誤 X 分鐘」。';
      } else if (input.includes('大巨蛋') || input.includes('人潮') || input.includes('散場') || input.includes('BL17')) {
        reply = '依據【SOP 第 4 條與第 3 條】：偵測到大巨蛋人潮峰值異常，系統將自動啟動散場模式。建議北捷「過站不停」、通知公車處調度接駁專車、並引導群眾步行至市政府站。';
      } else if (input.includes('號誌') || input.includes('故障') || input.includes('停電')) {
        reply = '依據【SOP 第 5 條：號誌故障應變】：請立即產出人工指揮派遣建議，每個受影響路口配置 2 名警力，並於 CMS 顯示「號誌故障，請依現場指揮通行」。';
      } else if (input.includes('多國') || input.includes('語言') || input.includes('外籍')) {
        reply = '依據【SOP 第 6 條：數位通報與多語化】：當該區域漫遊用戶 (Roaming_User_Pct) >= 30% 時，推播之簡訊與看板訊息將自動產出多國語言版本。';
      }

      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
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

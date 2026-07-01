import React from 'react';
import { AlertCircle, Zap, Send } from 'lucide-react';

export default function IncidentManager({ systemStatus, setSystemStatus, onShowNotification }) {
  const injectEvent = () => {
    setSystemStatus('alert');
  };

  const resetEvent = () => {
    setSystemStatus('normal');
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      {systemStatus === 'normal' ? (
        <button 
          onClick={injectEvent}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', 
            border: '1px solid rgba(245, 158, 11, 0.3)', 
            padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
            fontWeight: 500, fontSize: '0.875rem'
          }}
        >
          <Zap size={16} />
          注入突發事件 (路面塌陷)
        </button>
      ) : (
        <>
          <button 
            onClick={resetEvent}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
              fontWeight: 500, fontSize: '0.875rem'
            }}
          >
            恢復正常狀態
          </button>
          <button 
            onClick={onShowNotification}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: '#ef4444', color: '#fff', 
              border: 'none', 
              padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer',
              fontWeight: 500, fontSize: '0.875rem'
            }}
          >
            <Send size={16} />
            發布多語化通報
          </button>
        </>
      )}
    </div>
  );
}

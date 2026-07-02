import React from 'react';
import { Activity, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AiAlertLog() {
  const { t } = useLanguage();

  const AI_LOGS = [
    { id: 1, time: 'Just now', type: 'info', msg: t('ai_log_1') },
    { id: 2, time: '2 mins ago', type: 'warning', msg: t('ai_log_2') },
    { id: 3, time: '15 mins ago', type: 'action', msg: t('ai_log_3') },
    { id: 4, time: '1 hour ago', type: 'info', msg: t('ai_log_4') },
  ];

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ padding: '1.25rem' }}>
        <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
          <Activity size={18} color="var(--accent-primary)" />
          {t('dashboard_ai_log')}
        </h2>
      </div>
      
      <div className="panel-content" style={{ padding: '0 1.25rem 1.25rem 1.25rem', flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {AI_LOGS.map((log, index) => (
            <div key={log.id} style={{
              display: 'flex', gap: '0.75rem', 
              opacity: 1 - (index * 0.15), // 越舊的紀錄越暗
            }}>
              <div style={{ marginTop: '0.25rem' }}>
                {log.type === 'warning' && <AlertTriangle size={16} color="var(--warn-yellow)" />}
                {log.type === 'action' && <CheckCircle2 size={16} color="#10b981" />}
                {log.type === 'info' && <Activity size={16} color="var(--text-secondary)" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    {log.type === 'warning' ? t('log_type_warning') : log.type === 'action' ? t('log_type_action') : t('log_type_info')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{log.time}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {log.msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BookOpen, Clock, Activity, Target } from 'lucide-react';

export default function DecisionPanel({ systemStatus }) {
  if (systemStatus.status !== 'alert' || !systemStatus.incident) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', gap: '1rem', minHeight: '300px' }}>
        <Activity size={48} opacity={0.2} />
        <p>目前無突發事件，持續監控 SOP 條件中。</p>
      </div>
    );
  }

  const { incident, alternatives } = systemStatus;
  
  // 計算 ETE (基於 SOP: Critical = 60m + penalty)
  const baseClearance = incident.severity === 'Critical' ? 60 : 40;
  // 假設飽和度為 1.0, 罰則為 (1.0 - 0.5) * 60 = 30
  const penalty = 30;
  const ete = baseClearance + penalty;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', minHeight: '300px' }}>
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ color: '#ef4444', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={18} />
          AI 判定結果：{incident.severity === 'Critical' ? 'A 級重大事件' : 'B 級事件'}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#fff', lineHeight: 1.6 }}>
          偵測到「{incident.location}」{incident.type}。<br/>
          描述：{incident.description}
        </p>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={16} />
          觸發 SOP 條款 (車禍與路障應變)
        </h4>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', borderLeft: '3px solid var(--accent-cyan)' }}>
          <strong>第 2 條主疏散路徑規則：</strong><br/>
          已自動篩選替代道路。建議將車流引導至 <b>{alternatives.join(', ')}</b>。<br/>
          CMS 建議：「{incident.location}封閉，請改道，預計延誤 {ete} 分鐘」
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          ETE 預估恢復時間
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '6px' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{ete} <span style={{fontSize:'1rem'}}>分鐘</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>包含壅塞補償時間計算</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            依據第 7 條公式計算:<br/>
            (基數 {baseClearance}m + 罰則 {penalty}m)
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BookOpen, Clock, Activity, Target } from 'lucide-react';

export default function DecisionPanel({ eventActive }) {
  if (!eventActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', gap: '1rem', minHeight: '300px' }}>
        <Activity size={48} opacity={0.2} />
        <p>目前無突發事件，持續監控 SOP 條件中。</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', minHeight: '300px' }}>
      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ color: '#ef4444', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={18} />
          AI 判定結果：A 級重大事件
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#fff', lineHeight: 1.6 }}>
          偵測到「忠孝東路四段」路面塌陷，導致周邊路段飽和度超過 85%。
        </p>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={16} />
          觸發 SOP 條款
        </h4>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', borderLeft: '3px solid var(--accent-cyan)' }}>
          <strong>第 2 條主疏散路徑規則：</strong><br/>
          當主幹道無法通行時，需引導車流至最近之平行替代道路（如仁愛路），並避免引導至已達 D 級服務水準之路段。
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          ETE 預估恢復時間
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '6px' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>45 <span style={{fontSize:'1rem'}}>分鐘</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>預計於 18:45 恢復正常</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            依據公式計算:<br/>
            (嚴重度 3 × 15m)
          </div>
        </div>
      </div>
    </div>
  );
}

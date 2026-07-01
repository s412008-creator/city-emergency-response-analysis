import React from 'react';
import { AlertCircle, Zap, Send } from 'lucide-react';
import incidentData from '../data/live_incidents.json';
import roadData from '../data/road_network_geometry.json';

export default function IncidentManager({ systemStatus, setSystemStatus, onShowNotification }) {
  const injectEvent = () => {
    // 取得第一個事件
    const incident = incidentData[0];
    // 找出受影響路段的替代道路
    const affectedRoadInfo = roadData.find(r => r.segment_id === incident.affected_segment);
    
    setSystemStatus({
      status: 'alert',
      incident: incident,
      alternatives: affectedRoadInfo ? affectedRoadInfo.alternatives : []
    });
  };

  const resetEvent = () => {
    setSystemStatus({ status: 'normal', incident: null, alternatives: [] });
  };

  const isAlert = systemStatus.status === 'alert';

  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      {!isAlert ? (
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
          注入即時突發事件
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

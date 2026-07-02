import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertOctagon, X } from 'lucide-react';

export default function CellBroadcastSimulator({ systemStatus, onClose }) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (systemStatus.status === 'alert' && systemStatus.incident?.type === 'road_block') {
      setIsVisible(true);
      // Optional: play an alert sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play().catch(e => console.log('Autoplay blocked'));
    } else {
      setIsVisible(false);
    }
  }, [systemStatus]);

  if (!isVisible) return null;

  return (
    <div className="cell-broadcast-container animate-fade-in">
      <div className="iphone-mockup">
        <div className="notch"></div>
        <div className="screen">
          <div className="status-bar">
            <span>CityAI Telecom</span>
            <span>100%</span>
          </div>
          
          <div className="notification-card">
            <div className="notif-header">
              <AlertOctagon size={18} color="#ef4444" />
              <span>{t('cell_broadcast_title')}</span>
            </div>
            <div className="notif-body">
              {t('cell_broadcast_msg')}
            </div>
            <div className="notif-footer">
              CityAI Emergency Operation Center
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={() => { setIsVisible(false); if(onClose) onClose(); }}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

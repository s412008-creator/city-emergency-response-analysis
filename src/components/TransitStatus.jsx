import React from 'react';
import { Train, Bus, ParkingSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TransitStatus() {
  const { t } = useLanguage();
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ padding: '1.25rem' }}>
        <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
          <Train size={18} color="var(--accent-primary)" />
          {t('dashboard_transit')}
        </h2>
        <div className="status-badge"><span className="status-dot"></span>{t('badge_infrastructure')}</div>
      </div>
      
      <div className="panel-content" style={{ padding: '0 1.25rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* MRT Status */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#005599' }}></span>
              {t('transit_mrt')}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--warn-yellow)' }}>65%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '65%', background: 'var(--warn-yellow)', borderRadius: '3px' }}></div>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: 'right' }}>{t('transit_mrt_status')}</div>
        </div>

        {/* Bus Status */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bus size={14} color="var(--text-secondary)" />
              {t('transit_bus')}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#10b981' }}>85%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '85%', background: '#10b981', borderRadius: '3px' }}></div>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: 'right' }}>{t('transit_bus_status')}</div>
        </div>

        {/* Parking Status */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ParkingSquare size={14} color="var(--text-secondary)" />
              {t('transit_parking')}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--alert-red)' }}>95%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '95%', background: 'var(--alert-red)', borderRadius: '3px' }}></div>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: 'right' }}>{t('transit_parking_status')}</div>
        </div>

      </div>
    </div>
  );
}

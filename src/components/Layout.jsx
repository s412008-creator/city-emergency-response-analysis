import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Settings, 
  Activity,
  Bell,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children, headerActions, activeTab, setActiveTab, systemStatus }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const langOptions = [
    { code: 'zh', label: '🇹🇼 中文' },
    { code: 'en', label: '🇺🇸 EN' },
    { code: 'ja', label: '🇯🇵 日本語' },
    { code: 'ko', label: '🇰🇷 한국어' }
  ];
  const currentLang = langOptions.find(l => l.code === language) || langOptions[0];

  const notifications = [
    { id: 1, type: 'info', msg: t('notif_backup_completed') || 'System backup completed successfully.', time: '10 mins ago' },
    { id: 2, type: 'warning', msg: t('notif_high_cpu') || 'High CPU usage on Node-3.', time: '1 hour ago' }
  ];

  if (systemStatus?.status === 'alert') {
    notifications.unshift({
      id: 3,
      type: 'critical',
      msg: t('notif_critical_alert') || `[Emergency] Major incident detected: ${systemStatus.incident?.type}. Rerouting active.`,
      time: 'Just now'
    });
  }

  const unreadCount = systemStatus?.status === 'alert' ? 1 : 0;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Activity className="icon" size={28} />
          <span>CityAI.Ops</span>
        </div>
        <nav className="sidebar-nav">
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            {t('menu_dashboard')}
          </div>
          <div onClick={() => setActiveTab('incident')} className={`nav-item ${activeTab === 'incident' ? 'active' : ''}`}>
            <AlertTriangle size={20} />
            {t('menu_incident')}
          </div>

          <div onClick={() => setActiveTab('settings')} className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <Settings size={20} />
            {t('menu_settings')}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <h1>{t('app_title')}</h1>
          <div className="topbar-actions">
            {headerActions}
            
            <button 
              onClick={toggleTheme}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* 語系切換 (Custom Dropdown) */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                <Globe size={16} color="var(--accent-primary)" />
                {currentLang.label}
              </button>

              {isLangMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'rgba(17, 17, 19, 0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--panel-border)',
                  borderRadius: '8px',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  minWidth: '120px',
                  zIndex: 1000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                  {langOptions.map(option => (
                    <div 
                      key={option.code}
                      onClick={() => {
                        setLanguage(option.code);
                        setIsLangMenuOpen(false);
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: option.code === language ? '#fff' : 'var(--text-secondary)',
                        background: option.code === language ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if(option.code !== language) e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        if(option.code !== language) e.target.style.background = 'transparent';
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="status-badge">
              <span className="status-dot"></span>
              {t('status_monitoring')}
            </div>
            
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#ef4444', color: '#fff', fontSize: '10px',
                    fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {isNotifOpen && (
                <div className="notif-dropdown" style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '12px',
                  background: 'var(--panel-bg)', border: '1px solid var(--panel-border)',
                  borderRadius: '8px', width: '320px', zIndex: 1000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--panel-border)', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {t('notif_title') || 'Notifications'}
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{
                        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', flexDirection: 'column', gap: '4px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <div style={{
                            width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px', flexShrink: 0,
                            background: n.type === 'critical' ? '#ef4444' : (n.type === 'warning' ? '#f59e0b' : '#10b981')
                          }}></div>
                          <span style={{ fontSize: '0.85rem', fontWeight: n.type === 'critical' ? '600' : 'normal', color: 'var(--text-primary)' }}>
                            {n.msg}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '16px' }}>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
      </main>
    </div>
  );
}

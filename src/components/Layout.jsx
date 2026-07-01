import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  MessageSquareWarning, 
  Settings, 
  Activity,
  Car,
  Users,
  Bell
} from 'lucide-react';

export default function Layout({ children, headerActions }) {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Activity className="icon" size={28} />
          <span>CityAI.Ops</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <LayoutDashboard size={20} />
            時序監測儀表板
          </a>
          <a href="#" className="nav-item">
            <AlertTriangle size={20} />
            事件注入管理
          </a>
          <a href="#" className="nav-item">
            <MessageSquareWarning size={20} />
            策略諮詢顧問
          </a>
          <a href="#" className="nav-item">
            <Settings size={20} />
            系統設定
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <h1>交控中心戰情室 (Command Center)</h1>
          <div className="topbar-actions">
            {headerActions}
            <div className="status-badge">
              <span className="status-dot"></span>
              SOP 系統監控中
            </div>
            <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <Bell size={24} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
      </main>
    </div>
  );
}

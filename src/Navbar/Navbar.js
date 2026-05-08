import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ 
  onMenuClick, 
  onLogout, 
  user, 
  onSettingsClick, 
  onProfileClick, 
  onPrivacyClick, 
  onHelpCenterClick, 
  onContactClick,
  healthScore,
  healthAlerts
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isHealthScoreOpen, setIsHealthScoreOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(0);

  // Calculate unread alerts
  useEffect(() => {
    if (healthAlerts) {
      setUnreadAlerts(healthAlerts.length);
    }
  }, [healthAlerts]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isAlertsOpen) setIsAlertsOpen(false);
    if (isHealthScoreOpen) setIsHealthScoreOpen(false);
  };

  const toggleAlerts = () => {
    setIsAlertsOpen(!isAlertsOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
    if (isHealthScoreOpen) setIsHealthScoreOpen(false);
    // Mark alerts as read when opening
    if (!isAlertsOpen) {
      setUnreadAlerts(0);
    }
  };

  const toggleHealthScore = () => {
    setIsHealthScoreOpen(!isHealthScoreOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
    if (isAlertsOpen) setIsAlertsOpen(false);
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    onSettingsClick();
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    onProfileClick();
  };

  const handleHelpCenterClick = () => {
    setIsDropdownOpen(false);
    onHelpCenterClick();
  };

  const handleContactClick = () => {
    setIsDropdownOpen(false);
    onContactClick();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3005";
  };

  // NEW: Emergency button handler
  const handleEmergencyClick = () => {
    // Show emergency modal or redirect to emergency services
    const confirmEmergency = window.confirm(
      "🚨 EMERGENCY ASSISTANCE\n\n" +
      "This will connect you to emergency services. \n" +
      "Are you sure you want to proceed?"
    );
    
    if (confirmEmergency) {
      // Redirect to emergency services or call API
      window.open('tel:911', '_self');
    }
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
      if (isAlertsOpen && !event.target.closest('.alerts-dropdown')) {
        setIsAlertsOpen(false);
      }
      if (isHealthScoreOpen && !event.target.closest('.health-score-dropdown')) {
        setIsHealthScoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isAlertsOpen, isHealthScoreOpen]);

  // Get health score color based on value
  const getHealthScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // Green
    if (score >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  // Get alert severity color
  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Get alert icon based on type and severity
  const getAlertIcon = (alert) => {
    if (alert.type === 'outbreak') return '🦠';
    if (alert.type === 'supply') return '💊';
    if (alert.type === 'prevention') return '🛡️';
    return '🔔';
  };

  // Format time for alerts
  const formatAlertTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // Get health status text
  const getHealthStatus = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  // Get health tips based on score
  const getHealthTips = (score) => {
    if (score >= 80) {
      return "Great job! Maintain your healthy habits and regular checkups.";
    } else if (score >= 60) {
      return "You're doing well. Consider adding more physical activity and balanced nutrition.";
    } else if (score >= 40) {
      return "Schedule a health checkup and focus on improving your lifestyle habits.";
    } else {
      return "Please consult with a healthcare professional for personalized advice.";
    }
  };

  return (
    <nav className="navbar">
      {/* Left - Hamburger and Logo */}
      <div className="navbar-left">
        <button className="hamburger" onClick={onMenuClick}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="navbar-brand">
          <i className="fas fa-hospital-user"></i>
          <span>MediPredict</span>
        </div>
      </div>

      {/* Center - Welcome Message */}
      <div className="navbar-center">
        <span className="welcome-message">
          Welcome, {user?.name || "Patient"}
        </span>
      </div>

      {/* Right - Actions */}
      <div className="navbar-right">
        {/* Health Indicators */}
        <div className="health-indicators">
          {/* Health Score Dropdown */}
          <div className={`health-score-dropdown ${isHealthScoreOpen ? 'open' : ''}`}>
            <button 
              className="health-score-btn" 
              onClick={toggleHealthScore}
              title="Health Score"
            >
              <div className="health-score-circle">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke={getHealthScoreColor(healthScore)}
                    strokeWidth="3"
                    strokeDasharray={`${(healthScore / 100) * 113} 113`}
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                  />
                </svg>
                <span className="health-score-value">{healthScore}</span>
              </div>
            </button>
            
            <div className="health-score-content">
              <div className="score-card">
                <div className="score-header">
                  <h3>Your Health Score</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setIsHealthScoreOpen(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="score-main">
                  <div className="score-circle-large">
                    <div 
                      className="score-progress"
                      style={{
                        background: `conic-gradient(${getHealthScoreColor(healthScore)} 0% ${healthScore}%, #e2e8f0 ${healthScore}% 100%)`
                      }}
                    >
                      <div className="score-inner">
                        <span className="score-value-large">{healthScore}</span>
                        <span className="score-label">/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="score-status">
                    <span className={`status-badge ${getHealthStatus(healthScore).toLowerCase().replace(' ', '-')}`}>
                      {getHealthStatus(healthScore)}
                    </span>
                  </div>
                  
                  <p className="score-description">
                    Based on your recent health data, symptoms, and activity
                  </p>
                </div>
                
                <div className="score-breakdown">
                  <h4>Health Insights</h4>
                  <div className="breakdown-items">
                    <div className="breakdown-item">
                      <div className="breakdown-info">
                        <span className="breakdown-label">Recent Activity</span>
                        <span className="breakdown-value">
                          {healthScore >= 70 ? 'Active' : 'Moderate'}
                        </span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-progress"
                          style={{ width: `${healthScore >= 70 ? 80 : 60}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="breakdown-item">
                      <div className="breakdown-info">
                        <span className="breakdown-label">Symptom Check</span>
                        <span className="breakdown-value">
                          {healthAlerts?.length > 0 ? 'Needs Review' : 'Clear'}
                        </span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-progress"
                          style={{ 
                            width: `${healthAlerts?.length > 0 ? 40 : 90}%`,
                            backgroundColor: healthAlerts?.length > 0 ? '#f59e0b' : '#10b981'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="breakdown-item">
                      <div className="breakdown-info">
                        <span className="breakdown-label">Preventive Care</span>
                        <span className="breakdown-value">
                          {healthScore >= 60 ? 'Good' : 'Can Improve'}
                        </span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-progress"
                          style={{ width: `${healthScore >= 60 ? 75 : 45}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="health-tips">
                  <div className="tips-header">
                    <i className="fas fa-lightbulb"></i>
                    <h4>Health Tips</h4>
                  </div>
                  <p className="tip-text">{getHealthTips(healthScore)}</p>
                </div>
                
                <div className="score-actions">
                  <button className="action-btn primary">
                    <i className="fas fa-chart-line"></i>
                    View Detailed Report
                  </button>
                  <button className="action-btn secondary">
                    <i className="fas fa-calendar-plus"></i>
                    Schedule Checkup
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Health Alerts Dropdown */}
          <div className={`alerts-dropdown ${isAlertsOpen ? 'open' : ''}`}>
            <button 
              className="nav-btn alert-btn" 
              onClick={toggleAlerts}
              title="Health Alerts & Predictions"
            >
              <i className="fas fa-bell"></i>
              {unreadAlerts > 0 && (
                <span className="alert-badge">{unreadAlerts}</span>
              )}
            </button>
            
            <div className="alerts-content">
              <div className="alerts-header">
                <h3>
                  <i className="fas fa-bell"></i>
                  Health Alerts & Predictions
                </h3>
                <span className="alerts-count">
                  {healthAlerts?.length || 0} active
                </span>
              </div>
              
              <div className="alerts-body">
                {healthAlerts && healthAlerts.length > 0 ? (
                  <div className="alerts-list">
                    {healthAlerts.map((alert, index) => (
                      <div 
                        key={alert.id || index} 
                        className={`alert-item ${alert.severity}`}
                        style={{ borderLeftColor: getAlertSeverityColor(alert.severity) }}
                      >
                        <div className="alert-icon">
                          {getAlertIcon(alert)}
                        </div>
                        <div className="alert-content">
                          <h4>{alert.message}</h4>
                          <div className="alert-meta">
                            <span className="alert-location">
                              <i className="fas fa-map-marker-alt"></i>
                              {alert.location}
                            </span>
                            <span className="alert-time">
                              {formatAlertTime(alert.timestamp || new Date())}
                            </span>
                          </div>
                          <p className="alert-prediction">
                            <strong>Prediction:</strong> {alert.predictedSpread}
                          </p>
                          <div className="alert-actions">
                            <button className="action-btn primary">
                              <i className="fas fa-eye"></i>
                              View Details
                            </button>
                            <button className="action-btn secondary">
                              <i className="fas fa-times"></i>
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-alerts">
                    <i className="fas fa-bell-slash"></i>
                    <h4>No Active Alerts</h4>
                    <p>You're all caught up! No health alerts at the moment.</p>
                  </div>
                )}
              </div>
              
              <div className="alerts-footer">
                <button className="view-all-btn">
                  <i className="fas fa-list"></i>
                  View All Alerts
                </button>
                <button className="settings-btn">
                  <i className="fas fa-cog"></i>
                  Alert Settings
                </button>
              </div>
            </div>
          </div>

          {/* NEW: Professional Emergency Button */}
          <button 
            className="emergency-btn" 
            onClick={handleEmergencyClick}
            title="Emergency Assistance - Click for immediate help"
          >
            <div className="emergency-btn-content">
              <i className="fas fa-ambulance"></i>
              <span className="emergency-text">Emergency</span>
            </div>
            <div className="emergency-pulse"></div>
          </button>
        </div>
        
        {/* Settings Button */}
        <button className="nav-btn" onClick={onSettingsClick}>
          <i className="fas fa-cog"></i>
        </button>
        
        {/* User Profile Dropdown */}
        <div className={`user-dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button className="user-profile-btn" onClick={toggleDropdown}>
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <i className="fas fa-user-md"></i>
              )}
            </div>
            <div className="user-info-mini">
              <span className="user-name">{user?.name || "Patient User"}</span>
              <span className="user-role">Patient</span>
            </div>
          </button>
          
          <div className="dropdown-content">
            <div className="dropdown-header">
              <div className="user-avatar-large">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <i className="fas fa-user-md"></i>
                )}
              </div>
              <div className="user-details">
                <h3>{user?.name || "Patient User"}</h3>
                <p>{user?.email || "patient@example.com"}</p>
                {/* Health Score in Dropdown */}
                {healthScore !== undefined && (
                  <div className="dropdown-health-score">
                    <span className="health-label">Health Score</span>
                    <div className="health-score-mini">
                      <span 
                        className="health-score-number"
                        style={{ color: getHealthScoreColor(healthScore) }}
                      >
                        {healthScore}
                      </span>
                      <span className="health-score-max">/100</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-section">
              <h4>Account</h4>
              <button className="dropdown-item" onClick={handleProfileClick}>
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </button>
              <button className="dropdown-item" onClick={handleSettingsClick}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </button>
              <button className="dropdown-item" onClick={onPrivacyClick}>
                <i className="fas fa-shield-alt"></i>
                <span>Privacy & Security</span>
              </button>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-section">
              <h4>Health</h4>
              <button className="dropdown-item">
                <i className="fas fa-heartbeat"></i>
                <span>Health History</span>
              </button>
              <button className="dropdown-item">
                <i className="fas fa-pills"></i>
                <span>Medication Tracker</span>
              </button>
              <button className="dropdown-item">
                <i className="fas fa-chart-line"></i>
                <span>Health Analytics</span>
              </button>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-section">
              <h4>Support</h4>
              <button className="dropdown-item" onClick={onHelpCenterClick}>
                <i className="fas fa-question-circle"></i>
                <span>Help Center</span>
              </button>
              <button className="dropdown-item" onClick={handleContactClick}>
                <i className="fas fa-comments"></i>
                <span>Contact Support</span>
              </button>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-footer">
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for dropdowns when open */}
      {(isDropdownOpen || isAlertsOpen || isHealthScoreOpen) && (
        <div className="dropdown-overlay" onClick={() => {
          setIsDropdownOpen(false);
          setIsAlertsOpen(false);
          setIsHealthScoreOpen(false);
        }}></div>
      )}
    </nav>
  );
}

export default Navbar;
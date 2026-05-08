import React, { useState } from 'react';
import './Privacy.css';

const Privacy = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('data');
  const [privacySettings, setPrivacySettings] = useState({
    data: {
      dataCollection: true,
      personalizedAds: false,
      shareAnonymizedData: false,
      autoDeleteData: false,
      deleteAfterMonths: 6
    },
    security: {
      twoFactorAuth: false,
      activityLogging: true,
      dataEncryption: true,
      biometricAuth: false,
      privacyShield: true
    },
    permissions: {
      locationAccess: false,
      cameraAccess: true,
      microphoneAccess: false,
      notifications: true,
      healthDataAccess: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Privacy settings saved:', privacySettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="privacy-overlay" onClick={onClose}>
      <div className="privacy-modal" onClick={e => e.stopPropagation()}>
        <div className="privacy-header">
          <div className="header-content">
            <i className="fas fa-shield-alt"></i>
            <h2>Privacy & Security</h2>
            <p>Manage your data and security preferences</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close privacy settings">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="privacy-content">
          <div className="privacy-sidebar">
            <div className="sidebar-header">
              <div className="security-badge">
                <i className="fas fa-lock"></i>
                <span>Security Status: Protected</span>
              </div>
            </div>
            
            <div className="sidebar-tabs">
              <button 
                className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                <i className="fas fa-database"></i>
                <span>Data Privacy</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <i className="fas fa-user-shield"></i>
                <span>Security</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`}
                onClick={() => setActiveTab('permissions')}
              >
                <i className="fas fa-key"></i>
                <span>Permissions</span>
              </button>
            </div>

            <div className="sidebar-footer">
              <button className="security-audit-btn">
                <i className="fas fa-search"></i>
                Run Security Audit
              </button>
            </div>
          </div>

          <div className="privacy-main">
            <div className="tab-content">
              {activeTab === 'data' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>Data Privacy</h3>
                    <p>Control how your data is collected and used</p>
                  </div>
                  
                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-database"></i>
                      Data Collection
                    </h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Data Collection</h5>
                          <p>Allow us to collect data to enhance your experience</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.data.dataCollection}
                            onChange={e => handleSettingChange('data', 'dataCollection', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Personalized Ads</h5>
                          <p>Allow tailored advertising based on your preferences</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.data.personalizedAds}
                            onChange={e => handleSettingChange('data', 'personalizedAds', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Share Anonymized Data</h5>
                          <p>Contribute to medical research (anonymously)</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.data.shareAnonymizedData}
                            onChange={e => handleSettingChange('data', 'shareAnonymizedData', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Auto-delete Data</h5>
                          <p>Automatically purge records after specified period</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.data.autoDeleteData}
                            onChange={e => handleSettingChange('data', 'autoDeleteData', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    {privacySettings.data.autoDeleteData && (
                      <div className="form-group">
                        <label>Data Retention Period</label>
                        <select
                          value={privacySettings.data.deleteAfterMonths}
                          onChange={e => handleSettingChange('data', 'deleteAfterMonths', parseInt(e.target.value))}
                          className="form-input"
                        >
                          <option value={3}>3 months</option>
                          <option value={6}>6 months</option>
                          <option value={12}>1 year</option>
                          <option value={24}>2 years</option>
                          <option value={36}>3 years</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-file-export"></i>
                      Data Control
                    </h4>
                    <div className="privacy-actions">
                      <button className="privacy-action-btn">
                        <i className="fas fa-download"></i>
                        Download Data Archive
                      </button>
                      <button className="privacy-action-btn danger">
                        <i className="fas fa-trash-alt"></i>
                        Request Data Deletion
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>Security Settings</h3>
                    <p>Enhance your account security with these options</p>
                  </div>
                  
                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-user-lock"></i>
                      Account Security
                    </h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Two-Factor Authentication</h5>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.security.twoFactorAuth}
                            onChange={e => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Biometric Authentication</h5>
                          <p>Use fingerprint or face recognition for access</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.security.biometricAuth}
                            onChange={e => handleSettingChange('security', 'biometricAuth', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Data Encryption</h5>
                          <p>Encrypt all stored data with military-grade algorithms</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.security.dataEncryption}
                            onChange={e => handleSettingChange('security', 'dataEncryption', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Privacy Shield</h5>
                          <p>Enhanced privacy protection for elite members</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.security.privacyShield}
                            onChange={e => handleSettingChange('security', 'privacyShield', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Activity Logging</h5>
                          <p>Keep a record of all account activities</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.security.activityLogging}
                            onChange={e => handleSettingChange('security', 'activityLogging', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-history"></i>
                      Security History
                    </h4>
                    <div className="security-history">
                      <div className="history-item">
                        <i className="fas fa-check-circle success"></i>
                        <div className="history-details">
                          <h5>Last login</h5>
                          <p>Today at 14:30 from Chrome on Windows</p>
                        </div>
                        <span className="history-time">2 hours ago</span>
                      </div>
                      <div className="history-item">
                        <i className="fas fa-exclamation-triangle warning"></i>
                        <div className="history-details">
                          <h5>Unusual activity detected</h5>
                          <p>Login attempt from new location</p>
                        </div>
                        <span className="history-time">Yesterday</span>
                      </div>
                      <div className="history-item">
                        <i className="fas fa-check-circle success"></i>
                        <div className="history-details">
                          <h5>Password changed</h5>
                          <p>You updated your password</p>
                        </div>
                        <span className="history-time">1 week ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'permissions' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>App Permissions</h3>
                    <p>Manage what information the app can access</p>
                  </div>
                  
                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-mobile-alt"></i>
                      Device Permissions
                    </h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Location Access</h5>
                          <p>Allow app to access your location</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.permissions.locationAccess}
                            onChange={e => handleSettingChange('permissions', 'locationAccess', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Camera Access</h5>
                          <p>Allow app to use your camera</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.permissions.cameraAccess}
                            onChange={e => handleSettingChange('permissions', 'cameraAccess', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Microphone Access</h5>
                          <p>Allow app to use your microphone</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.permissions.microphoneAccess}
                            onChange={e => handleSettingChange('permissions', 'microphoneAccess', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Notifications</h5>
                          <p>Allow app to send you notifications</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.permissions.notifications}
                            onChange={e => handleSettingChange('permissions', 'notifications', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Health Data Access</h5>
                          <p>Allow app to access your health data</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={privacySettings.permissions.healthDataAccess}
                            onChange={e => handleSettingChange('permissions', 'healthDataAccess', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="fas fa-shield-alt"></i>
                      Privacy Report
                    </h4>
                    <div className="privacy-report">
                      <div className="report-item">
                        <div className="report-icon">
                          <i className="fas fa-database"></i>
                        </div>
                        <div className="report-details">
                          <h5>Data Collection</h5>
                          <p>3 of 5 permissions enabled</p>
                        </div>
                        <div className="report-status medium">
                          <i className="fas fa-exclamation-circle"></i>
                          Moderate
                        </div>
                      </div>
                      <div className="report-item">
                        <div className="report-icon">
                          <i className="fas fa-lock"></i>
                        </div>
                        <div className="report-details">
                          <h5>Security</h5>
                          <p>4 of 5 protections active</p>
                        </div>
                        <div className="report-status good">
                          <i className="fas fa-check-circle"></i>
                          Strong
                        </div>
                      </div>
                      <div className="report-item">
                        <div className="report-icon">
                          <i className="fas fa-key"></i>
                        </div>
                        <div className="report-details">
                          <h5>Permissions</h5>
                          <p>2 of 5 permissions granted</p>
                        </div>
                        <div className="report-status good">
                          <i className="fas fa-check-circle"></i>
                          Secure
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="privacy-actions">
              <button className="privacy-btn secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="privacy-btn primary" onClick={handleSave}>
                <i className="fas fa-save"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
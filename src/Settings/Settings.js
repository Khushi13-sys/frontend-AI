import React, { useState } from 'react';
import './Setting.css';

const Settings = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || 'Patient User',
      email: user?.email || 'patient@example.com',
      phone: '',
      dateOfBirth: '',
      gender: '',
      emergencyContact: '',
      bloodType: '',
      allergies: '',
      currentMedications: '',
      primaryPhysician: '',
      insuranceProvider: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      symptomReminders: true,
      medicationReminders: false,
      healthTips: true,
      securityAlerts: true,
      appointmentReminders: true,
      labResultAlerts: true
    },
    privacy: {
      dataCollection: true,
      personalizedAds: false,
      shareAnonymizedData: false,
      autoDeleteData: false,
      deleteAfterMonths: 6,
      twoFactorAuth: false,
      activityLogging: true,
      dataEncryption: true,
      biometricAuth: false,
      privacyShield: true
    },
    appearance: {
      theme: 'classic',
      fontSize: 'medium',
      reduceAnimations: false,
      highContrast: false,
      compactMode: false,
      colorScheme: 'burgundy-gold',
      fontFamily: 'garamond',
      uiDensity: 'comfortable'
    },
    preferences: {
      language: 'english',
      temperatureUnit: 'celsius',
      measurementSystem: 'metric',
      timeFormat: '24h',
      dateFormat: 'DD/MM/YYYY',
      defaultView: 'dashboard',
      currency: 'usd',
      firstDayOfWeek: 'monday'
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      console.log('Settings saved:', settings);
      onClose();
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm('Restore all settings to their original values?')) {
      console.log('Settings reset to default values.');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `medipredict-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal old-money-theme" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <div className="header-content">
            <i className="fas fa-crown"></i>
            <h2>MediPredict Settings</h2>
            <p>Refined preferences for distinguished users</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close settings">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            <div className="sidebar-header">
              <div className="user-badge">
                <i className="fas fa-shield-alt"></i>
                <span>Established 2023</span>
              </div>
            </div>
            
            <div className="sidebar-tabs">
             <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-portrait"></i>
                <span>Profile</span>
              </button> 
              <button 
                className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                <i className="fas fa-lock"></i>
                <span>Privacy & Security</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('appearance')}
              >
                <i className="fas fa-palette"></i>
                <span>Appearance</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <i className="fas fa-cog"></i>
                <span>Preferences</span>
              </button>
            </div>

            <div className="sidebar-footer">
              <button className="sidebar-action-btn" onClick={exportData}>
                <i className="fas fa-scroll"></i>
                Export Data
              </button>
              <button className="sidebar-action-btn danger" onClick={handleReset}>
                <i className="fas fa-history"></i>
                Restore Defaults
              </button>
            </div>
          </div>

          <div className="settings-main">
            <div className="tab-content">
              {activeTab === 'profile' && (
                <div className="tab-pane">
                  <h3>Profile Information</h3>
                  <p className="tab-description">Manage your personal and health information</p>
                  
                  <div className="settings-card">
                    <h4>Personal Details</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={settings.profile.name}
                          onChange={e => handleInputChange('profile', 'name', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={settings.profile.email}
                          onChange={e => handleInputChange('profile', 'email', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={settings.profile.phone}
                          onChange={e => handleInputChange('profile', 'phone', e.target.value)}
                          placeholder="+91"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          value={settings.profile.dateOfBirth}
                          onChange={e => handleInputChange('profile', 'dateOfBirth', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          value={settings.profile.gender}
                          onChange={e => handleInputChange('profile', 'gender', e.target.value)}
                          className="form-input"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Blood Type</label>
                        <select
                          value={settings.profile.bloodType}
                          onChange={e => handleInputChange('profile', 'bloodType', e.target.value)}
                          className="form-input"
                        >
                          <option value="">Select</option>
                          <option value="a+">A+</option>
                          <option value="a-">A-</option>
                          <option value="b+">B+</option>
                          <option value="b-">B-</option>
                          <option value="ab+">AB+</option>
                          <option value="ab-">AB-</option>
                          <option value="o+">O+</option>
                          <option value="o-">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4>Health Information</h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Allergies</label>
                        <input
                          type="text"
                          value={settings.profile.allergies}
                          onChange={e => handleInputChange('profile', 'allergies', e.target.value)}
                          placeholder="List any allergies"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Current Medications</label>
                        <textarea
                          value={settings.profile.currentMedications}
                          onChange={e => handleInputChange('profile', 'currentMedications', e.target.value)}
                          placeholder="List current medications and dosages"
                          className="form-input"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4>Emergency Contact</h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <input
                          type="text"
                          value={settings.profile.emergencyContact}
                          onChange={e => handleInputChange('profile', 'emergencyContact', e.target.value)}
                          placeholder="Name and phone number of emergency contact"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="tab-pane">
                  <h3>Notification Preferences</h3>
                  <p className="tab-description">Manage how and when you receive notifications</p>
                  
                  <div className="settings-card">
                    <h4>Notification Channels</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Email Notifications</h5>
                          <p>Receive important updates via email</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.emailNotifications}
                            onChange={e => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Push Notifications</h5>
                          <p>Receive alerts on your device</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.pushNotifications}
                            onChange={e => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4>Reminders</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Symptom Reminders</h5>
                          <p>Reminders to track your symptoms</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.symptomReminders}
                            onChange={e => handleInputChange('notifications', 'symptomReminders', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Medication Reminders</h5>
                          <p>Reminders to take your medications</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.medicationReminders}
                            onChange={e => handleInputChange('notifications', 'medicationReminders', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Appointment Reminders</h5>
                          <p>Get notified about upcoming appointments</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.appointmentReminders}
                            onChange={e => handleInputChange('notifications', 'appointmentReminders', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4>Alerts</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Health Tips</h5>
                          <p>Receive personalized health recommendations</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.healthTips}
                            onChange={e => handleInputChange('notifications', 'healthTips', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Security Alerts</h5>
                          <p>Get notified about important security events</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.securityAlerts}
                            onChange={e => handleInputChange('notifications', 'securityAlerts', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Lab Result Alerts</h5>
                          <p>Get notified when new lab results are available</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={settings.notifications.labResultAlerts}
                            onChange={e => handleInputChange('notifications', 'labResultAlerts', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Privacy & Security Tab */}
              {activeTab === 'privacy' && (
                <div className="tab-pane">
                  <h3>Privacy & Security</h3>
                  <p className="tab-description">Fortify your digital estate with our premium protection suite</p>
                  
                  <div className="settings-card">
                    <h4><i className="fas fa-database"></i> Data Management</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Data Collection</h5>
                          <p>Allow us to collect data to enhance your experience</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.dataCollection}
                            onChange={e => handleInputChange('privacy', 'dataCollection', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Personalized Ads</h5>
                          <p>Allow tailored advertising based on your preferences</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.personalizedAds}
                            onChange={e => handleInputChange('privacy', 'personalizedAds', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Share Anonymized Data</h5>
                          <p>Contribute to medical research (anonymously)</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.shareAnonymizedData}
                            onChange={e => handleInputChange('privacy', 'shareAnonymizedData', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Auto-delete Data</h5>
                          <p>Automatically purge records after specified period</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.autoDeleteData}
                            onChange={e => handleInputChange('privacy', 'autoDeleteData', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    {settings.privacy.autoDeleteData && (
                      <div className="form-group">
                        <label>Data Retention Period</label>
                        <select
                          value={settings.privacy.deleteAfterMonths}
                          onChange={e => handleInputChange('privacy', 'deleteAfterMonths', parseInt(e.target.value))}
                          className="form-input old-money-select"
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

                  <div className="settings-card">
                    <h4><i className="fas fa-user-shield"></i> Security Protocols</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Two-Factor Authentication</h5>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.twoFactorAuth}
                            onChange={e => handleInputChange('privacy', 'twoFactorAuth', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Biometric Authentication</h5>
                          <p>Use fingerprint or face recognition for access</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.biometricAuth}
                            onChange={e => handleInputChange('privacy', 'biometricAuth', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Data Encryption</h5>
                          <p>Encrypt all stored data with military-grade algorithms</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.dataEncryption}
                            onChange={e => handleInputChange('privacy', 'dataEncryption', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Privacy Shield</h5>
                          <p>Enhanced privacy protection for elite members</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.privacy.privacyShield}
                            onChange={e => handleInputChange('privacy', 'privacyShield', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-file-export"></i> Data Control</h4>
                    <div className="privacy-actions">
                      <button className="old-money-btn outlined">
                        <i className="fas fa-download"></i>
                        Download Data Archive
                      </button>
                      <button className="old-money-btn danger">
                        <i className="fas fa-trash-alt"></i>
                        Request Data Deletion
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="tab-pane">
                  <h3>Appearance</h3>
                  <p className="tab-description">Customize the visual presentation to suit your distinguished taste</p>
                  
                  <div className="settings-card">
                    <h4><i className="fas fa-paint-roller"></i> Theme & Style</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Color Scheme</label>
                        <select
                          value={settings.appearance.colorScheme}
                          onChange={e => handleInputChange('appearance', 'colorScheme', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="burgundy-gold">Burgundy & Gold</option>
                          <option value="navy-silver">Navy & Silver</option>
                          <option value="forest-gold">Forest Green & Gold</option>
                          <option value="charcoal-brass">Charcoal & Brass</option>
                          <option value="classic-monochrome">Classic Monochrome</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Theme</label>
                        <select
                          value={settings.appearance.theme}
                          onChange={e => handleInputChange('appearance', 'theme', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="classic">Classic</option>
                          <option value="dark">Nocturnal</option>
                          <option value="light">Daylight</option>
                          <option value="auto">Automatic</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Font Family</label>
                        <select
                          value={settings.appearance.fontFamily}
                          onChange={e => handleInputChange('appearance', 'fontFamily', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="garamond">Garamond</option>
                          <option value="baskerville">Baskerville</option>
                          <option value="caslon">Caslon</option>
                          <option value="modern">Modern Sans</option>
                          <option value="classic">Classic System</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-text-height"></i> Typography</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Font Size</label>
                        <select
                          value={settings.appearance.fontSize}
                          onChange={e => handleInputChange('appearance', 'fontSize', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="small">Petite</option>
                          <option value="medium">Standard</option>
                          <option value="large">Large</option>
                          <option value="x-large">Executive</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>UI Density</label>
                        <select
                          value={settings.appearance.uiDensity}
                          onChange={e => handleInputChange('appearance', 'uiDensity', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="compact">Compact</option>
                          <option value="comfortable">Comfortable</option>
                          <option value="spacious">Spacious</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-adjust"></i> Accessibility</h4>
                    <div className="toggle-list">
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>High Contrast Mode</h5>
                          <p>Enhanced contrast for improved readability</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.appearance.highContrast}
                            onChange={e => handleInputChange('appearance', 'highContrast', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Reduce Animations</h5>
                          <p>Minimize motion for a more static experience</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.appearance.reduceAnimations}
                            onChange={e => handleInputChange('appearance', 'reduceAnimations', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="toggle-item">
                        <div className="toggle-info">
                          <h5>Compact Mode</h5>
                          <p>Conserve screen space with compact elements</p>
                        </div>
                        <label className="switch old-money-switch">
                          <input
                            type="checkbox"
                            checked={settings.appearance.compactMode}
                            onChange={e => handleInputChange('appearance', 'compactMode', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-eye"></i> Preview</h4>
                    <div className="theme-preview">
                      <div className="preview-window">
                        <div className="preview-header">
                          <span>MediPredict</span>
                          <div className="preview-controls">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <div className="preview-content">
                          <div className="preview-sidebar"></div>
                          <div className="preview-main">
                            <div className="preview-card"></div>
                            <div className="preview-card"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="tab-pane">
                  <h3>Preferences</h3>
                  <p className="tab-description">Tailor the application to your personal standards and conventions</p>
                  
                  <div className="settings-card">
                    <h4><i className="fas fa-globe"></i> Regional Settings</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Language</label>
                        <select
                          value={settings.preferences.language}
                          onChange={e => handleInputChange('preferences', 'language', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="english">English</option>
                          <option value="punjahbi">Punjabi</option>
                          <option value="hindi">Hindi</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="kannada">Kannada</option>
                          <option value="malayalam">Malayalam</option>
                          <option value="bengali">Bengali</option>
                          <option value="marathi">Marathi</option>
                          <option value="gujarati">Gujarati</option>
                          <option value="odia">Odia</option>
                          <option value="assamese">Assamese</option>
                          <option value="urdu">Urdu</option>
                          <option value="nepali">Nepali</option>
                          <option value="sindhi">Sindhi</option>
                          <option value="konkani">Konkani</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Currency</label>
                        <select
                          value={settings.preferences.currency}
                          onChange={e => handleInputChange('preferences', 'currency', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="inr">INR (₹)</option>
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="jpy">JPY (¥)</option>
                          <option value="chf">CHF (Fr)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Date Format</label>
                        <select
                          value={settings.preferences.dateFormat}
                          onChange={e => handleInputChange('preferences', 'dateFormat', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>First Day of Week</label>
                        <select
                          value={settings.preferences.firstDayOfWeek}
                          onChange={e => handleInputChange('preferences', 'firstDayOfWeek', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="monday">Monday</option>
                          <option value="sunday">Sunday</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-ruler"></i> Units & Measurements</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Temperature Unit</label>
                        <div className="radio-group">
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="temperatureUnit"
                              value="celsius"
                              checked={settings.preferences.temperatureUnit === 'celsius'}
                              onChange={e => handleInputChange('preferences', 'temperatureUnit', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            Celsius (°C)
                          </label>
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="temperatureUnit"
                              value="fahrenheit"
                              checked={settings.preferences.temperatureUnit === 'fahrenheit'}
                              onChange={e => handleInputChange('preferences', 'temperatureUnit', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            Fahrenheit (°F)
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Measurement System</label>
                        <div className="radio-group">
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="measurementSystem"
                              value="metric"
                              checked={settings.preferences.measurementSystem === 'metric'}
                              onChange={e => handleInputChange('preferences', 'measurementSystem', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            Metric (kg, cm)
                          </label>
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="measurementSystem"
                              value="imperial"
                              checked={settings.preferences.measurementSystem === 'imperial'}
                              onChange={e => handleInputChange('preferences', 'measurementSystem', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            Imperial (lb, in)
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Time Format</label>
                        <div className="radio-group">
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="timeFormat"
                              value="24h"
                              checked={settings.preferences.timeFormat === '24h'}
                              onChange={e => handleInputChange('preferences', 'timeFormat', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            24-hour format
                          </label>
                          <label className="radio-option old-money-radio">
                            <input
                              type="radio"
                              name="timeFormat"
                              value="12h"
                              checked={settings.preferences.timeFormat === '12h'}
                              onChange={e => handleInputChange('preferences', 'timeFormat', e.target.value)}
                            />
                            <span className="radio-checkmark"></span>
                            12-hour format
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <h4><i className="fas fa-layer-group"></i> Interface Preferences</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Default View</label>
                        <select
                          value={settings.preferences.defaultView}
                          onChange={e => handleInputChange('preferences', 'defaultView', e.target.value)}
                          className="form-input old-money-select"
                        >
                          <option value="dashboard">Dashboard</option>
                          <option value="health">Health Overview</option>
                          <option value="reports">Medical Reports</option>
                          <option value="medications">Medications</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="settings-actions">
              <button className="old-money-btn secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="old-money-btn primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Applying Changes...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i>
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
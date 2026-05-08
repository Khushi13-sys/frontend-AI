import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personal: {
      name: user?.name || 'Patient User',
      email: user?.email || 'patient@example.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1990-01-15',
      gender: 'male',
      address: '123 Medical Lane, Health City',
      bloodType: 'O+',
      height: '175 cm',
      weight: '72 kg'
    },
    health: {
      allergies: 'Penicillin, Pollen',
      conditions: 'Hypertension (controlled)',
      medications: 'Lisinopril 10mg daily, Aspirin 81mg daily',
      surgeries: 'Appendectomy (2010)',
      familyHistory: 'Father: Heart disease; Mother: Diabetes',
      lifestyle: 'Non-smoker, Occasional alcohol, Exercises 3x/week'
    },
    emergency: {
      primaryContact: {
        name: 'Rahul Sharma',
        relationship: 'Brother',
        phone: '+91 98765 12345',
        email: 'rahul@example.com'
      },
      secondaryContact: {
        name: 'Priya Patel',
        relationship: 'Friend',
        phone: '+91 91234 56789',
        email: 'priya@example.com'
      },
      physician: {
        name: 'Dr. Amit Kumar',
        specialty: 'Cardiology',
        phone: '+91 98765 67890',
        hospital: 'City Medical Center'
      }
    }
  });

  const handleInputChange = (category, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
    console.log('Profile saved:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  if (!isOpen) return null;

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <div className="profile-header">
          <div className="header-content">
            <i className="fas fa-user-circle"></i>
            <h2>My Profile</h2>
            <p>Manage your personal and health information</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close profile">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="sidebar-header">
              <div className="user-avatar-large">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <i className="fas fa-user-md"></i>
                )}
                {isEditing && (
                  <button className="avatar-edit-btn">
                    <i className="fas fa-camera"></i>
                  </button>
                )}
              </div>
              <div className="user-details">
                <h3>{profileData.personal.name}</h3>
                <p>{profileData.personal.email}</p>
                <span className="user-badge">
                  <i className="fas fa-shield-alt"></i>
                  Verified Account
                </span>
              </div>
            </div>
            
            <div className="sidebar-tabs">
              <button 
                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <i className="fas fa-user"></i>
                <span>Personal Info</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`}
                onClick={() => setActiveTab('health')}
              >
                <i className="fas fa-heartbeat"></i>
                <span>Health Info</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
                onClick={() => setActiveTab('emergency')}
              >
                <i className="fas fa-phone-alt"></i>
                <span>Emergency Contacts</span>
              </button>
            </div>

            <div className="sidebar-footer">
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  <i className="fas fa-edit"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-main">
            <div className="tab-content">
              {activeTab === 'personal' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>Personal Information</h3>
                    <p>Your basic personal details and demographics</p>
                  </div>
                  
                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-id-card"></i>
                      Identity Information
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={profileData.personal.name}
                          onChange={e => handleInputChange('personal', 'name', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={profileData.personal.email}
                          onChange={e => handleInputChange('personal', 'email', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.personal.phone}
                          onChange={e => handleInputChange('personal', 'phone', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          value={profileData.personal.dateOfBirth}
                          onChange={e => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          value={profileData.personal.gender}
                          onChange={e => handleInputChange('personal', 'gender', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-home"></i>
                      Address Information
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Address</label>
                        <textarea
                          value={profileData.personal.address}
                          onChange={e => handleInputChange('personal', 'address', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-heart"></i>
                      Physical Attributes
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Blood Type</label>
                        <select
                          value={profileData.personal.bloodType}
                          onChange={e => handleInputChange('personal', 'bloodType', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        >
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
                      <div className="form-group">
                        <label>Height</label>
                        <input
                          type="text"
                          value={profileData.personal.height}
                          onChange={e => handleInputChange('personal', 'height', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Weight</label>
                        <input
                          type="text"
                          value={profileData.personal.weight}
                          onChange={e => handleInputChange('personal', 'weight', e.target.value)}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>Health Information</h3>
                    <p>Your medical history and current health status</p>
                  </div>
                  
                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-allergies"></i>
                      Allergies & Sensitivities
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Allergies</label>
                        <textarea
                          value={profileData.health.allergies}
                          onChange={e => handleInputChange('health', 'allergies', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="List any allergies or adverse reactions to medications, foods, or environmental factors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-stethoscope"></i>
                      Medical Conditions
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Current Conditions</label>
                        <textarea
                          value={profileData.health.conditions}
                          onChange={e => handleInputChange('health', 'conditions', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="List any chronic or current medical conditions"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-pills"></i>
                      Medications
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Current Medications</label>
                        <textarea
                          value={profileData.health.medications}
                          onChange={e => handleInputChange('health', 'medications', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="List all medications, supplements, and dosages"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-procedures"></i>
                      Surgical History
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Previous Surgeries</label>
                        <textarea
                          value={profileData.health.surgeries}
                          onChange={e => handleInputChange('health', 'surgeries', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="List any previous surgeries with dates if possible"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-dna"></i>
                      Family History
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Family Medical History</label>
                        <textarea
                          value={profileData.health.familyHistory}
                          onChange={e => handleInputChange('health', 'familyHistory', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="List significant medical conditions in close family members"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-running"></i>
                      Lifestyle
                    </h4>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Lifestyle Information</label>
                        <textarea
                          value={profileData.health.lifestyle}
                          onChange={e => handleInputChange('health', 'lifestyle', e.target.value)}
                          className="form-input"
                          rows="3"
                          disabled={!isEditing}
                          placeholder="Describe your diet, exercise, sleep habits, and any substance use"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'emergency' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <h3>Emergency Contacts</h3>
                    <p>People to contact in case of an emergency</p>
                  </div>
                  
                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-user-plus"></i>
                      Primary Emergency Contact
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={profileData.emergency.primaryContact.name}
                          onChange={e => handleInputChange('emergency', 'primaryContact', {
                            ...profileData.emergency.primaryContact,
                            name: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Relationship</label>
                        <input
                          type="text"
                          value={profileData.emergency.primaryContact.relationship}
                          onChange={e => handleInputChange('emergency', 'primaryContact', {
                            ...profileData.emergency.primaryContact,
                            relationship: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.emergency.primaryContact.phone}
                          onChange={e => handleInputChange('emergency', 'primaryContact', {
                            ...profileData.emergency.primaryContact,
                            phone: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={profileData.emergency.primaryContact.email}
                          onChange={e => handleInputChange('emergery', 'primaryContact', {
                            ...profileData.emergency.primaryContact,
                            email: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-users"></i>
                      Secondary Emergency Contact
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={profileData.emergency.secondaryContact.name}
                          onChange={e => handleInputChange('emergency', 'secondaryContact', {
                            ...profileData.emergency.secondaryContact,
                            name: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Relationship</label>
                        <input
                          type="text"
                          value={profileData.emergency.secondaryContact.relationship}
                          onChange={e => handleInputChange('emergency', 'secondaryContact', {
                            ...profileData.emergency.secondaryContact,
                            relationship: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.emergency.secondaryContact.phone}
                          onChange={e => handleInputChange('emergency', 'secondaryContact', {
                            ...profileData.emergency.secondaryContact,
                            phone: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={profileData.emergency.secondaryContact.email}
                          onChange={e => handleInputChange('emergency', 'secondaryContact', {
                            ...profileData.emergency.secondaryContact,
                            email: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-card">
                    <h4>
                      <i className="fas fa-user-md"></i>
                      Primary Physician
                    </h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Doctor's Name</label>
                        <input
                          type="text"
                          value={profileData.emergency.physician.name}
                          onChange={e => handleInputChange('emergency', 'physician', {
                            ...profileData.emergency.physician,
                            name: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Specialty</label>
                        <input
                          type="text"
                          value={profileData.emergency.physician.specialty}
                          onChange={e => handleInputChange('emergency', 'physician', {
                            ...profileData.emergency.physician,
                            specialty: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.emergency.physician.phone}
                          onChange={e => handleInputChange('emergency', 'physician', {
                            ...profileData.emergency.physician,
                            phone: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hospital/Clinic</label>
                        <input
                          type="text"
                          value={profileData.emergency.physician.hospital}
                          onChange={e => handleInputChange('emergency', 'physician', {
                            ...profileData.emergency.physician,
                            hospital: e.target.value
                          })}
                          className="form-input"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
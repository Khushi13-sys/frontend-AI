import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Your message has been sent. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()}>
        <div className="contact-header">
          <div className="header-content">
            <i className="fas fa-headset"></i>
            <h2>Contact & Support</h2>
            <p>We're here to help you with any questions or concerns</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close contact">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="contact-content">
          <div className="contact-sidebar">
            <div className="sidebar-header">
              <div className="support-badge">
                <i className="fas fa-hands-helping"></i>
                <span>24/7 Support</span>
              </div>
            </div>
            
            <div className="sidebar-tabs">
              <button 
                className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <i className="fas fa-envelope"></i>
                <span>Contact Us</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                <i className="fas fa-question-circle"></i>
                <span>FAQ</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <i className="fas fa-book"></i>
                <span>Resources</span>
              </button>
            </div>

            <div className="sidebar-footer">
              <div className="emergency-contact">
                <h4>Emergency Contact</h4>
                <p>For urgent medical concerns, please contact:</p>
                <div className="emergency-info">
                  <i className="fas fa-phone-alt"></i>
                  <span>+1-800-MED-HELP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-main">
            <div className="tab-content">
              {activeTab === 'contact' && (
                <div className="tab-pane">
                  <h3>Get in Touch</h3>
                  <p className="tab-description">Send us a message and we'll respond as soon as possible</p>
                  
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="feedback">Feedback</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-input"
                          rows="5"
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="contact-btn primary">
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </button>
                    </div>
                  </form>
                  
                  <div className="contact-methods">
                    <h4>Other Ways to Reach Us</h4>
                    <div className="method-cards">
                      <div className="method-card">
                        <div className="method-icon">
                          <i className="fas fa-envelope"></i>
                        </div>
                        <h5>Email</h5>
                        <p>support@medipredict.com</p>
                      </div>
                      <div className="method-card">
                        <div className="method-icon">
                          <i className="fas fa-phone"></i>
                        </div>
                        <h5>Phone</h5>
                        <p>+1 (800) 123-4567</p>
                      </div>
                      <div className="method-card">
                        <div className="method-icon">
                          <i className="fas fa-comments"></i>
                        </div>
                        <h5>Live Chat</h5>
                        <p>Available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'faq' && (
                <div className="tab-pane">
                  <h3>Frequently Asked Questions</h3>
                  <p className="tab-description">Find answers to common questions about MediPredict</p>
                  
                  <div className="faq-list">
                    <div className="faq-item">
                      <div className="faq-question">
                        <h4>How does MediPredict analyze my symptoms?</h4>
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <div className="faq-answer">
                        <p>MediPredict uses advanced AI algorithms trained on millions of medical data points to analyze your symptoms and provide potential insights. However, it's important to note that our tool is for informational purposes only and not a substitute for professional medical advice.</p>
                      </div>
                    </div>
                    
                    <div className="faq-item">
                      <div className="faq-question">
                        <h4>Is my health data secure with MediPredict?</h4>
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <div className="faq-answer">
                        <p>Yes, we take your privacy seriously. All health data is encrypted and stored securely. We comply with HIPAA regulations and never share your personal health information with third parties without your explicit consent.</p>
                      </div>
                    </div>
                    
                    <div className="faq-item">
                      <div className="faq-question">
                        <h4>How accurate are the predictions?</h4>
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <div className="faq-answer">
                        <p>Our AI model has an accuracy rate of over 92% for common conditions, but it's important to remember that it's not a replacement for a professional medical diagnosis. Always consult with a healthcare provider for proper medical advice.</p>
                      </div>
                    </div>
                    
                    <div className="faq-item">
                      <div className="faq-question">
                        <h4>Can I use MediPredict for emergencies?</h4>
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <div className="faq-answer">
                        <p>No, MediPredict is not designed for emergency medical situations. If you're experiencing a medical emergency, please call your local emergency number immediately.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="tab-pane">
                  <h3>Helpful Resources</h3>
                  <p className="tab-description">Educational materials and additional support resources</p>
                  
                  <div className="resources-grid">
                    <div className="resource-card">
                      <div className="resource-icon">
                        <i className="fas fa-book-medical"></i>
                      </div>
                      <h4>Medical Knowledge Base</h4>
                      <p>Comprehensive information about various health conditions, symptoms, and treatments.</p>
                      <button className="resource-btn">
                        <span>Explore</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <i className="fas fa-video"></i>
                      </div>
                      <h4>Video Tutorials</h4>
                      <p>Step-by-step guides on how to use all features of MediPredict effectively.</p>
                      <button className="resource-btn">
                        <span>Watch</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <i className="fas fa-file-pdf"></i>
                      </div>
                      <h4>Documentation</h4>
                      <p>Detailed documentation and user manuals for advanced features and troubleshooting.</p>
                      <button className="resource-btn">
                        <span>Download</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <h4>Community Forum</h4>
                      <p>Connect with other users, share experiences, and get advice from our community.</p>
                      <button className="resource-btn">
                        <span>Join</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
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

export default Contact;
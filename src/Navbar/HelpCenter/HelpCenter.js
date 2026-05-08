// HelpCenter.js
import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const faqData = {
    'getting-started': [
      {
        question: 'How do I create an account?',
        answer:
          'To create an account, click on the "Sign Up" button on the top right corner. Fill in your details including name, email, and password. You will receive a confirmation email to verify your account.',
      },
      {
        question: 'How do I update my profile information?',
        answer:
          'You can update your profile by navigating to the Settings page from the user dropdown menu. Click on the "Profile" tab to edit your personal information.',
      },
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer:
          'If you forgot your password, click on the "Forgot Password" link on the login page. Enter your email address and we will send you a password reset link.',
      },
      {
        question: 'How do I change my email address?',
        answer:
          'To change your email address, go to Settings > Account. Enter your new email address and current password to confirm the change.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'To delete your account, go to Settings > Account and select "Delete Account". Follow the confirmation steps carefully.',
      },
    ],
    privacy: [
      {
        question: 'How is my health data protected?',
        answer:
          'We use industry-standard encryption to protect your health data. All data is stored securely and we comply with HIPAA regulations to ensure your privacy.',
      },
      {
        question: 'Who can access my medical information?',
        answer:
          'Only you and healthcare professionals you explicitly authorize can access your medical information. You have full control over your data sharing preferences.',
      },
    ],
    billing: [
      {
        question: 'What payment methods are accepted?',
        answer:
          'We accept credit/debit cards, UPI, and PayPal for secure payments.',
      },
      {
        question: 'Can I get a refund?',
        answer:
          'Yes, refunds are available within 14 days of purchase. Please contact support for assistance.',
      },
      {
        question: 'How do I update my billing information?',
        answer:
          'Go to Settings > Billing & Payments and update your card or payment method details securely.',
      },
    ],
    troubleshooting: [
      {
        question: 'I am not receiving email notifications. What should I do?',
        answer:
          'Check your spam/junk folder first. If the emails are not there, go to Settings > Notifications and ensure email alerts are enabled.',
      },
      {
        question: 'The app is crashing on startup. How can I fix this?',
        answer:
          'Try clearing the app cache or reinstalling the application. If the issue persists, contact support with your device details.',
      },
      {
        question: 'Why can’t I log in to my account?',
        answer:
          'Ensure your username and password are correct. If you forgot your password, use the "Forgot Password" option to reset it.',
      },
    ],
  };

  const articles = [
    {
      title: 'Understanding Your Health Dashboard',
      category: 'getting-started',
      content:
        'Your health dashboard provides an overview of your recent health metrics, upcoming appointments, and medication reminders...',
    },
    {
      title: 'Setting Up Medication Reminders',
      category: 'account',
      content:
        'You can set up medication reminders by going to the Medications section and clicking "Add Reminder". Specify the medication, dosage, and schedule...',
    },
    {
      title: 'Exporting Your Health Data',
      category: 'privacy',
      content:
        'To export your health data, navigate to Settings > Privacy & Security. Click on "Export Data" and select the format you prefer...',
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = (faqData[activeTab] || []).filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="helpcenter-overlay" onClick={onClose}>
      <div className="helpcenter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="helpcenter-header">
          <div className="header-content">
            <i className="fas fa-life-ring"></i>
            <h2>Help Center</h2>
            <p>Find answers to common questions and get support</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="helpcenter-content">
          <div className="helpcenter-sidebar">
            <div className="sidebar-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sidebar-tabs">
              <button
                className={`tab-btn ${
                  activeTab === 'getting-started' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('getting-started')}
              >
                <i className="fas fa-rocket"></i>
                <span>Getting Started</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <i className="fas fa-user-circle"></i>
                <span>Account & Profile</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                <i className="fas fa-shield-alt"></i>
                <span>Privacy & Security</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveTab('billing')}
              >
                <i className="fas fa-credit-card"></i>
                <span>Billing & Payments</span>
              </button>
              <button
                className={`tab-btn ${
                  activeTab === 'troubleshooting' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('troubleshooting')}
              >
                <i className="fas fa-tools"></i>
                <span>Troubleshooting</span>
              </button>
            </div>

            <div className="sidebar-footer">
              <button className="sidebar-action-btn">
                <i className="fas fa-headset"></i>
                Contact Support
              </button>
              <button className="sidebar-action-btn">
                <i className="fas fa-comments"></i>
                Live Chat
              </button>
            </div>
          </div>

          <div className="helpcenter-main">
            <div className="tab-content">
              <h3>
                {activeTab === 'getting-started' && 'Getting Started'}
                {activeTab === 'account' && 'Account & Profile'}
                {activeTab === 'privacy' && 'Privacy & Security'}
                {activeTab === 'billing' && 'Billing & Payments'}
                {activeTab === 'troubleshooting' && 'Troubleshooting'}
              </h3>

              {searchTerm ? (
                <div className="search-results">
                  <h4>Search Results for "{searchTerm}"</h4>
                  {filteredArticles.length > 0 ? (
                    <div className="articles-list">
                      {filteredArticles.map((article, index) => (
                        <div key={index} className="article-card">
                          <h5>{article.title}</h5>
                          <p>{article.content}</p>
                          <button className="read-more-btn">Read More</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-results">
                      No articles found matching your search.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="popular-articles">
                    <h4>Popular Articles</h4>
                    <div className="articles-list">
                      {articles
                        .filter((a) => a.category === activeTab)
                        .map((article, index) => (
                          <div key={index} className="article-card">
                            <h5>{article.title}</h5>
                            <p>{article.content}</p>
                            <button className="read-more-btn">Read More</button>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="faq-section">
                    <h4>Frequently Asked Questions</h4>
                    <div className="faq-list">
                      {(faqData[activeTab] || []).map((faq, index) => (
                        <div key={index} className="faq-item">
                          <button className="faq-question">
                            {faq.question}
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                      {faqData[activeTab]?.length === 0 && (
                        <p className="no-results">No FAQs available for this section.</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="helpcenter-actions">
              <button className="helpcenter-btn secondary">
                <i className="fas fa-download"></i>
                Download User Guide
              </button>
              <button className="helpcenter-btn primary">
                <i className="fas fa-envelope"></i>
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

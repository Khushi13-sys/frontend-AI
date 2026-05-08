import React from 'react';
import './Dashboard.css';

function Dashboard({ isOpen, onClose, conversations, onNewChat }) {
  return (
    <div className={`dashboard ${isOpen ? 'open' : ''}`}>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <i className="fas fa-chart-line"></i>
          <h2>Health History</h2>
        </div>
        <div className="dashboard-actions">
          <button className="new-chat-btn" onClick={onNewChat} title="Start New Chat">
            <i className="fas fa-plus"></i>
          </button>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="summary-details">
              <span className="summary-count">{conversations.length}</span>
              <span className="summary-label">Total Conversations</span>
            </div>
          </div>
        </div>
        
        <div className="reports-section">
          <h3 className="section-title">Recent Health Conversations</h3>
          
          {conversations.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>No conversations yet</p>
              <span>Your health conversations will appear here</span>
            </div>
          ) : (
            <div className="reports-list">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="report-card">
                  <div className="report-header">
                    <div className="report-type">
                      <i className="fas fa-comment-medical"></i>
                      <span>Health Conversation</span>
                    </div>
                    <span className="report-date">
                      {conversation.date}
                    </span>
                  </div>
                  
                  <div className="report-content">
                    <div className="symptoms-preview">
                      <p className="query-preview">{conversation.title}</p>
                    </div>
                    
                    <div className="report-details">
                      <div className="detail-item">
                        <span className="detail-label">Messages</span>
                        <p className="detail-value">{conversation.messages.length} messages</p>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Last Message</span>
                        <p className="detail-value">
                          {conversation.messages[conversation.messages.length - 1].content.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="report-actions">
                    <button className="action-btn view-btn">
                      <i className="fas fa-eye"></i>
                      View Conversation
                    </button>
                    <button className="action-btn share-btn">
                      <i className="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
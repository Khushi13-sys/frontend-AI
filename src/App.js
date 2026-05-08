import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SymptomChecker from "./Symptom/SymptomChecker";
import Settings from "./Settings/Settings";
import Profile from "./Navbar/Profile/Profile";
import Privacy from "./Navbar/PrivacySecuirity/Privacy";
import HelpCenter from './Navbar/HelpCenter/HelpCenter';
import Contact from "./Navbar/Contact&Support/Contact";
import VideoCall from "./VideoCall/VideoCall";

function App() {
  const [query, setQuery] = useState("");
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [listening, setListening] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [user] = useState({ 
    name: "User", 
    email: "user@example.com",
    age: 35,
    location: "Punjab"
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Health-related states
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoAnalysisResult, setVideoAnalysisResult] = useState(null);
  const [healthAlerts, setHealthAlerts] = useState([]);
  const [healthScore, setHealthScore] = useState(85);
  const [outbreakData, setOutbreakData] = useState([]);
  const [medicineDemand, setMedicineDemand] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  const textareaRef = useRef(null);
  const optionsRef = useRef(null);
  const optionsBtnRef = useRef(null);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const micButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Supported languages with proper language codes
  const languages = [
    { code: "en-US", name: "English", flag: "🇺🇸", script: "Latin" },
    { code: "bn-BD", name: "Bengali", flag: "🇧🇩", script: "Bengali" },
    { code: "bn-IN", name: "Bengali", flag: "🇮🇳", script: "Bengali" },
    { code: "hi-IN", name: "Hindi", flag: "🇮🇳", script: "Devanagari" },
    { code: "pa-IN", name: "Punjabi", flag: "🇮🇳", script: "Gurmukhi" },
    { code: "ta-IN", name: "Tamil", flag: "🇮🇳", script: "Tamil" },
    { code: "te-IN", name: "Telugu", flag: "🇮🇳", script: "Telugu" },
    { code: "mr-IN", name: "Marathi", flag: "🇮🇳", script: "Devanagari" },
    { code: "ur-PK", name: "Urdu", flag: "🇵🇰", script: "Arabic" },
    { code: "gu-IN", name: "Gujarati", flag: "🇮🇳", script: "Gujarati" },
    { code: "kn-IN", name: "Kannada", flag: "🇮🇳", script: "Kannada" },
  ];

  // Health monitoring and outbreak detection
  useEffect(() => {
    const monitorHealthData = async () => {
      try {
        // Fetch outbreak alerts
        const outbreakResponse = await axios.get(`${API_BASE_URL}/api/outbreak-alerts`);
        if (outbreakResponse.data.outbreaks) {
          setOutbreakData(outbreakResponse.data.outbreaks);
          
          // Convert outbreaks to health alerts
          const newAlerts = outbreakResponse.data.outbreaks.map(outbreak => ({
            id: Date.now() + Math.random(),
            type: 'outbreak',
            severity: outbreak.severity,
            message: `Potential ${outbreak.disease} outbreak in ${outbreak.location}`,
            location: outbreak.location,
            predictedSpread: outbreak.predicted_spread,
            action: outbreak.recommended_actions?.[0] || 'Monitor situation',
            timestamp: new Date().toISOString()
          }));
          
          setHealthAlerts(newAlerts);
        }

        // Fetch medicine demand predictions
        const demandResponse = await axios.post(`${API_BASE_URL}/api/medicine-demand`, {
          location: "Punjab",
          time_frame: "weekly"
        });
        setMedicineDemand(demandResponse.data);

        // Update health score based on recent activity
        updateHealthScore();

      } catch (error) {
        console.error("Health monitoring error:", error);
        // Fallback: Create sample alerts for demo
        const sampleAlerts = [
          {
            id: 1,
            type: 'outbreak',
            severity: 'high',
            message: 'Potential dengue outbreak detected in Village A. 15+ cases reported.',
            location: 'Village A',
            predictedSpread: 'High risk to Village B in 2 weeks',
            action: 'Deploy preventive measures and medical supplies',
            timestamp: new Date().toISOString()
          },
          {
            id: 2,
            type: 'supply',
            severity: 'medium',
            message: 'Increased demand predicted for fever medications in Region X',
            location: 'Region X',
            predictedSpread: '30% increase expected in next week',
            action: 'Stock additional paracetamol and ibuprofen',
            timestamp: new Date().toISOString()
          }
        ];
        setHealthAlerts(sampleAlerts);
      }
    };

    monitorHealthData();
    const interval = setInterval(monitorHealthData, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [API_BASE_URL]);

  // Update health score based on user activity and alerts
  const updateHealthScore = () => {
    let newScore = 85; // Base score
    
    // Deduct points for health alerts
    if (healthAlerts.length > 0) {
      newScore -= healthAlerts.length * 2;
    }
    
    // Deduct points for recent symptoms
    if (selectedSymptoms.length > 0) {
      newScore -= selectedSymptoms.length * 3;
    }
    
    // Add points for using preventive features
    if (currentConversation.length > 5) {
      newScore += 5; // Active user
    }
    
    setHealthScore(Math.max(0, Math.min(100, newScore)));
  };

  // Handle video analysis completion
  const handleVideoAnalysisComplete = (analysis) => {
    setVideoAnalysisResult(analysis);
    
    // Report symptoms to backend for outbreak detection
    if (analysis.detected_objects && analysis.detected_objects.length > 0) {
      reportSymptomsToBackend(analysis.detected_objects);
    }
    
    // Add to conversation
    const assistantMessage = {
      type: 'assistant',
      content: `I've completed the ${analysis.condition} analysis. ${analysis.findings}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      analysis: analysis
    };
    
    setCurrentConversation(prev => [...prev, assistantMessage]);
    
    // Update health score based on analysis severity
    if (analysis.severity === 'moderate') {
      setHealthScore(prev => Math.max(prev - 5, 0));
    } else if (analysis.severity === 'severe') {
      setHealthScore(prev => Math.max(prev - 10, 0));
    }
  };

  // Report symptoms for outbreak detection
  const reportSymptomsToBackend = async (detectedObjects) => {
    try {
      await axios.post(`${API_BASE_URL}/api/report-symptoms`, {
        user_id: `user_${Date.now()}`, // Anonymized
        symptoms: detectedObjects,
        location: user.location,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to report symptoms:", error);
    }
  };

  // Rest of existing useEffect hooks and functions
  useEffect(() => {
    // Setup SpeechRecognition for browser fallback
    const handleMessage = (event) => {
      if (event.origin === 'http://localhost:3000') {
        setSelectedLanguage(event.data.language);
      }
    };

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = selectedLanguage;

      recog.onstart = () => setListening(true);
      recog.onend = () => setListening(false);

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(prev => prev + (prev ? ' ' : '') + transcript);
      };

      recog.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
        alert(`Speech recognition error: ${event.error}`);
      };

      recognitionRef.current = recog;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
    
    // Close options when clicking outside
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target) &&
          micButtonRef.current && !micButtonRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedLanguage]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to format response text with point-wise styling
  const formatResponse = (text) => {
    if (!text) return text;
    
    // Check if the response is already formatted with markdown-like structure
    if (text.includes('**') || text.includes('•') || text.includes('-')) {
      // Split by double line breaks to get sections
      const sections = text.split(/\n\n+/);
      
      return sections.map((section, sectionIndex) => {
        // Check if this is a header section (contains **)
        if (section.includes('**')) {
          // Extract header text
          const headerMatch = section.match(/\*\*(.*?)\*\*/);
          if (headerMatch) {
            const headerText = headerMatch[1];
            const content = section.replace(headerMatch[0], '').trim();
            
            return (
              <div key={sectionIndex} className="response-section">
                <h4 className="response-header">{headerText}</h4>
                {formatPoints(content)}
              </div>
            );
          }
        }
        
        // Regular section with points
        return formatPoints(section, sectionIndex);
      });
    }
    
    // For plain text, just return it as is
    return text;
  };

  // Helper function to format points in a section
  const formatPoints = (text, key) => {
    // Split by lines that start with numbers, bullets, or dashes
    const points = text.split(/\n(?=\d+\.|•|-)/);
    
    if (points.length > 1) {
      return (
        <ul key={key} className="response-points">
          {points.map((point, pointIndex) => {
            if (point.trim()) {
              // Remove numbering if present
              const cleanPoint = point.replace(/^\d+\.\s*/, '').trim();
              return <li key={pointIndex}>{cleanPoint}</li>;
            }
            return null;
          })}
        </ul>
      );
    }
    
    // If no points found, return the text as a paragraph
    return <p key={key}>{text}</p>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { 
      type: 'user', 
      content: query, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    // Add user message immediately
    const updatedConversation = [...currentConversation, userMessage];
    setCurrentConversation(updatedConversation);
    setQuery("");
    setIsLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "60px";

    try {
      // Call the multilingual chat API
         const response = await axios.post(`${API_BASE_URL}/api/chat`, {
  message: query,
  language: selectedLanguage
});

console.log("AI RESPONSE:", response.data); // debug

const assistantResponse = {
  type: 'assistant',
  content:
    response.data.response ||
    response.data.reply ||
    "No response from server",
  medicines: response.data.medicines || [],
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};
      // const response = await axios.post(`${API_BASE_URL}/api/chat`, {
      //   message: query,
      //   language: selectedLanguage
      // });

      // const assistantResponse = { 
      //   type: 'assistant', 
      //   content: response.data.response,
      //   medicines: response.data.medicines || [],
      //   timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      // };

      // Add assistant response to conversation
      setCurrentConversation(prev => [...prev, assistantResponse]);
    } catch (error) {
      console.error("Chat API error:", error);
      
      // Fallback response
      const assistantResponse = { 
        type: 'assistant', 
        content: `I've received your query about "${query}". I'm currently unable to provide a detailed response. Please try again or consult a healthcare professional.`,
        medicines: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      
      setCurrentConversation(prev => [...prev, assistantResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    if (currentConversation.length > 0) {
      // Save current conversation to history
      const newConversation = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        title: currentConversation[0].content.substring(0, 30) + (currentConversation[0].content.length > 30 ? '...' : ''),
        messages: [...currentConversation]
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation([]);
    }
  };

  const adjustTextareaHeight = (e) => {
    setQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const toggleOptions = () => {
    if (optionsBtnRef.current) {
      const rect = optionsBtnRef.current.getBoundingClientRect();
      const desiredTop = rect.top - 180;
      const safeTop = Math.max(8, desiredTop);
      const safeLeft = Math.max(
        8,
        Math.min(window.innerWidth - 170, rect.left)
      );
      setMenuPosition({ top: safeTop, left: safeLeft });
    }
    setShowOptions((v) => !v);
  };

  // Enhanced camera functionality
  const onCameraClick = () => {
    setIsVideoCallOpen(true);
    setShowOptions(false);
  };

  const onSymptomClick = () => {
    setIsSymptomModalOpen(true);
    setShowOptions(false);
  };

  const handleCloseModal = () => {
    setIsSymptomModalOpen(false);
  };

  const handleSelectSymptom = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  // Enhanced voice input with language support
  const handleVoiceInput = async () => {
    if (listening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setListening(false);
      return;
    }

    try {
      setListening(true);
      const response = await axios.post(`${API_BASE_URL}/api/speech-to-text`, {
        language: selectedLanguage
      });
      
      if (response.data && response.data.text) {
        // Update the query with the transcribed text
        setQuery(response.data.text);
        
        // Show detected language to user
        if (response.data.detected_language) {
          showLanguageNotification(`Detected: ${response.data.detected_language}`);
        }
      }
      setListening(false);
    } catch (error) {
      console.error("Enhanced speech recognition failed:", error);
      
      // Fallback to browser's speech recognition if available
      if (recognitionRef.current) {
        try {
          // Update language for browser recognition
          recognitionRef.current.lang = selectedLanguage;
          recognitionRef.current.start();
        } catch (err) {
          console.error("Browser speech recognition failed:", err);
          alert("Speech recognition is not available. Please check your microphone permissions.");
          setListening(false);
        }
      } else {
        alert("Speech Recognition not supported in this browser.");
        setListening(false);
      }
    }
  };

  // Show language notification
  const showLanguageNotification = (message) => {
    const langNotification = document.createElement('div');
    langNotification.className = 'lang-notification';
    langNotification.innerHTML = message;
    langNotification.style.position = 'fixed';
    langNotification.style.bottom = '70px';
    langNotification.style.right = '20px';
    langNotification.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
    langNotification.style.color = 'white';
    langNotification.style.padding = '8px 12px';
    langNotification.style.borderRadius = '4px';
    langNotification.style.fontSize = '14px';
    langNotification.style.zIndex = '1000';
    langNotification.style.transition = 'opacity 0.5s';
    
    document.body.appendChild(langNotification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      langNotification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(langNotification)) {
          document.body.removeChild(langNotification);
        }
      }, 500);
    }, 3000);
  };

  // Handle holding the microphone button
  const handleMicMouseDown = () => {
    if (!listening) {
      handleVoiceInput();
    }
  };

  const handleMicMouseUp = () => {
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setShowLanguageDropdown(false);
    
    // Show notification about selected language
    const selectedLang = languages.find(lang => lang.code === languageCode);
    if (selectedLang) {
      showLanguageNotification(`Language set to: ${selectedLang.name}`);
    }
    
    // Update recognition language if available
    if (recognitionRef.current) {
      recognitionRef.current.lang = languageCode;
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handlePrivacyClick = () => {
    setIsPrivacyOpen(true); 
  };

  const handleHelpCenterClick = () => {
    setIsHelpCenterOpen(true); 
  };

  const handleContactClick = () => {
    setIsContactOpen(true); 
  };

  const clearHistory = () => {
    setHistory([]);
    setShowConfirmation(false);
  };

  // Dismiss health alert
  const dismissHealthAlert = (alertId) => {
    setHealthAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="App">
      <Navbar 
        onMenuClick={() => setIsDashboardOpen(true)}
        onSettingsClick={handleSettingsClick}
        onProfileClick={handleProfileClick}
        onPrivacyClick={handlePrivacyClick}
        onHelpCenterClick={handleHelpCenterClick}
        onContactClick={handleContactClick}
        user={user}
        healthScore={healthScore}
        healthAlerts={healthAlerts}
      />

      {isDashboardOpen && (
        <div className="overlay" onClick={() => setIsDashboardOpen(false)} />
      )}

      <Dashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        conversations={conversations}
        onNewChat={startNewChat}
        healthScore={healthScore}
        healthAlerts={healthAlerts}
      />
      
      {/* Video Call Modal */}
      {isVideoCallOpen && (
        <VideoCall 
          onClose={() => setIsVideoCallOpen(false)}
          onAnalysisComplete={handleVideoAnalysisComplete}
          user={user}
          API_BASE_URL={API_BASE_URL}
        />
      )}
      
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h3>Start New Chat?</h3>
            <p>This will clear your current conversation history. Are you sure?</p>
            <div className="confirmation-buttons">
              <button className="confirm-btn" onClick={clearHistory}>
                Yes, Clear Chat
              </button>
              <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <Settings 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          user={user}
        />
      )}

      {isProfileOpen && (
        <Profile 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)}
          user={user}
        />
      )}

      {isSymptomModalOpen && (
        <SymptomChecker 
          onClose={handleCloseModal}
          onSelectSymptom={handleSelectSymptom}
          selectedSymptoms={selectedSymptoms}
        />
      )}

      {isPrivacyOpen && (
        <Privacy 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)}
          user={user}
        />
      )}
      
      {isHelpCenterOpen && (
        <HelpCenter 
          isOpen={isHelpCenterOpen} 
          onClose={() => setIsHelpCenterOpen(false)}
          user={user}
        />
      )}
      
      {isContactOpen && (
        <Contact 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      )}
      
      <header className={`App-header ${currentConversation.length > 0 ? 'has-messages' : ''}`}>
        {currentConversation.length === 0 && (
          <div className="hero-section">
            <h1 className="hero-title">Your Personal Health Assistant</h1>
            <p className="hero-subtitle">
              Get AI-powered health insights and guidance in seconds
            </p>
            
            {/* REMOVED: Health Score Display and Quick Actions */}
          </div>
        )}
        
        <div className="messages-on-body">
          {currentConversation.map((message, idx) => (
            <div key={idx} className={`message ${message.type}-message`}>
              <div className="message-avatar">
                <i className={message.type === 'user' ? "fas fa-user" : "fas fa-robot"}></i>
              </div>
              <div className="message-content">
                {message.type === 'assistant' && (
                  <div className="message-header">
                    <h3>Health Assistant</h3>
                    <span className="language-badge">
                      {languages.find(lang => lang.code === selectedLanguage)?.name}
                    </span>
                  </div>
                )}
                <div className="message-text">
                  {message.type === 'assistant' ? formatResponse(message.content) : message.content}
                </div>
                
                {/* Show video analysis results if available */}
                {message.analysis && (
                  <div className="video-analysis-result">
                    <h4>📹 Video Analysis Result</h4>
                    <div className={`analysis-card ${message.analysis.severity}`}>
                      <h5>{message.analysis.condition}</h5>
                      <p className="analysis-confidence">Confidence: {message.analysis.confidence}%</p>
                      <p className="analysis-findings">{message.analysis.findings}</p>
                      <div className="detected-objects">
                        <strong>Detected:</strong>
                        <div className="object-tags">
                          {message.analysis.detected_objects?.map((obj, index) => (
                            <span key={index} className="object-tag">{obj}</span>
                          ))}
                        </div>
                      </div>
                      <div className="analysis-recommendations">
                        <h6>Recommendations:</h6>
                        <ul>
                          {message.analysis.recommendations?.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Medicine Recommendations */}
                {message.type === 'assistant' && message.medicines && message.medicines.length > 0 && (
                  <div className="medicine-recommendations">
                    <h4>Recommended Medicines:</h4>
                    <div className="medicine-cards">
                      {message.medicines.map((medicine, index) => (
                        <div key={index} className="medicine-card">
                          <h5>{medicine.name}</h5>
                          <p className="medicine-uses">Uses: {medicine.uses.join(", ")}</p>
                          <p className="medicine-price">{medicine.price}</p>
                          <a href={medicine.buy_link} target="_blank" rel="noopener noreferrer" className="buy-button">
                            <i className="fas fa-shopping-cart"></i> Buy Now
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {message.type === 'assistant' && (
                  <div className="message-actions">
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => navigator.clipboard.writeText(message.content)}
                    >
                      <i className="fas fa-copy"></i> Copy
                    </button>
                    <button className="action-btn">
                      <i className="fas fa-share"></i> Share
                    </button>
                  </div>
                )}
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant-message">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="message-header">
                  <h3>Health Assistant</h3>
                  <span className="language-badge">
                    {languages.find(lang => lang.code === selectedLanguage)?.name}
                  </span>
                </div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area-fixed">
          {selectedSymptoms.length > 0 && (
            <div className="selected-symptoms-preview">
              <h3>Selected Symptoms:</h3>
              <div className="symptoms-tags">
                {selectedSymptoms.map(symptom => (
                  <span key={symptom} className="symptom-tag">
                    {symptom}
                    <button 
                      onClick={() => handleSelectSymptom(symptom)}
                      className="tag-remove"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <form className="chat-input-container" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <div className="options-container" ref={optionsRef}>
                <button
                  type="button"
                  className="options-btn"
                  ref={optionsBtnRef}
                  onClick={toggleOptions}
                >
                  <i className="fas fa-plus"></i>
                </button>

                {showOptions && (
                  <div
                    className="options-menu"
                    style={{
                      top: `${menuPosition.top}px`,
                      left: `${menuPosition.left}px`,
                    }}
                  >
                    <label className="option-item" title="Upload File">
                      <i className="fas fa-paperclip"></i>
                      <span>Upload File</span>
                      <input type="file" hidden />
                    </label>
                    
                    {/* Enhanced Camera Button */}
                    <button 
                      type="button" 
                      className="option-item" 
                      title="AI Health Camera" 
                      onClick={onCameraClick}
                    >
                      <i className="fas fa-camera"></i>
                      <span>Camera</span>
                    </button>
                    
                    <button 
                      type="button" 
                      className="option-item" 
                      title="Symptoms Checker" 
                      onClick={onSymptomClick}
                    >
                      <i className="fas fa-stethoscope"></i>
                      <span>Symptoms</span>
                    </button>
                  </div>
                )}
              </div>

              <textarea
                ref={textareaRef}
                rows="1"
                placeholder="Describe your symptoms or health questions..."
                value={query}
                onChange={adjustTextareaHeight}
                className="chat-textarea"
                style={{ height: "60px" }}
                disabled={isLoading}
              />

              <div className="input-actions">
                {query && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => {
                      setQuery("");
                      if (textareaRef.current) {
                        textareaRef.current.style.height = "60px";
                      }
                    }}
                    disabled={isLoading}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
                
                {/* Language selector and microphone button */}
                <div className="voice-input-container">
                  <div 
                    className="language-selector"
                    onClick={() => !isLoading && setShowLanguageDropdown(!showLanguageDropdown)}
                  >
                    <span className="current-language">
                      {languages.find(lang => lang.code === selectedLanguage)?.flag || '🌐'}
                    </span>
                    
                    {showLanguageDropdown && (
                      <div className="language-dropdown" ref={languageDropdownRef}>
                        {languages.map(language => (
                          <div
                            key={language.code}
                            className={`language-option ${selectedLanguage === language.code ? 'selected' : ''}`}
                            onClick={() => handleLanguageSelect(language.code)}
                          >
                            <span className="language-flag">{language.flag}</span>
                            <span className="language-name">{language.name}</span>
                            <span className="language-script">({language.script})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    ref={micButtonRef}
                    type="button"
                    title={`Voice Input - Hold to speak in ${languages.find(lang => lang.code === selectedLanguage)?.name || 'selected language'}`}
                    onMouseDown={handleMicMouseDown}
                    onMouseUp={handleMicMouseUp}
                    onTouchStart={handleMicMouseDown}
                    onTouchEnd={handleMicMouseUp}
                    className={`voice-btn ${listening ? "listening" : ""}`}
                    disabled={isLoading}
                  >
                    <i className={`fas ${listening ? "fa-stop" : "fa-microphone"}`}></i>
                    {listening && (
                      <span className="listening-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    )}
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="send-btn"
                  disabled={!query.trim() || isLoading}
                  title="Send message"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
            
            <p className="privacy-notice">
              <i className="fas fa-shield-alt"></i>
              Your health data is private and encrypted. We never share your information.
            </p>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;

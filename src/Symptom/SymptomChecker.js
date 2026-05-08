import React, { useState } from 'react';
import "./Symptom.css";

const SymptomChecker = ({ onClose, onSelectSymptom, selectedSymptoms }) => {
  const [selectedCategory, setSelectedCategory] = useState('common');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample symptoms data
  const symptomsByCategory = {
    common: ['Headache', 'Fever', 'Cough', 'Fatigue', 'Sore throat', 'Nausea'],
    respiratory: ['Shortness of breath', 'Wheezing', 'Chest congestion', 'Runny nose'],
    digestive: ['Stomach pain', 'Diarrhea', 'Constipation', 'Bloating', 'Heartburn'],
    musculoskeletal: ['Joint pain', 'Back pain', 'Muscle aches', 'Neck stiffness'],
    neurological: ['Dizziness', 'Headache', 'Numbness', 'Vision changes']
  };

  const filteredSymptoms = symptomsByCategory[selectedCategory].filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="symptom-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Symptom Checker</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-tabs">
            {Object.keys(symptomsByCategory).map(category => (
              <button
                key={category}
                className={`tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="symptoms-list">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom, index) => (
                <button
                  key={index}
                  className={`symptom-item ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                  onClick={() => onSelectSymptom(symptom)}
                >
                  {symptom}
                  <i className={`fas ${selectedSymptoms.includes(symptom) ? 'fa-check-circle' : 'fa-chevron-right'}`}></i>
                </button>
              ))
            ) : (
              <p className="no-results">No symptoms found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LearningContext = createContext();

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider = ({ children }) => {
  const [selectedNavItem, setSelectedNavItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState("chat");
  const [selectedHistory, setSelectedHistory] = useState("");

  const handleNavItemClick = (key) => {
    setSelectedNavItem(key);
    setSelectedSection("");
    setSelectedHistory("");
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedNavItem(null);
  };

  const handleHistorySelect = (section, historyItem) => {
    setSelectedSection(section);
    setSelectedHistory(historyItem);
    setSelectedNavItem(null);
  };

  const value = {
    selectedNavItem,
    selectedSection,
    selectedHistory,
    handleNavItemClick,
    handleSectionSelect,
    handleHistorySelect,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

LearningProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 
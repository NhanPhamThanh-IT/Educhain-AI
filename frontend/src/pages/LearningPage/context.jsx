import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const { navItem } = useParams(); // Get navItem from URL

  const [selectedNavItem, setSelectedNavItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState("chat");
  const [selectedHistory, setSelectedHistory] = useState("");

  useEffect(() => {
    const validNavItems = ['market', 'missions', 'leaderboard', 'exchange', 'courses'];
    if (navItem && validNavItems.includes(navItem)) {
      setSelectedNavItem(navItem);
    } else if (location.pathname === '/learning' || location.pathname === '/learning/' || location.pathname === '/learning/courses') {
      // If the path is /learning or /learning/courses, default to showing the 'courses' content.
      setSelectedNavItem('courses');
    } else {
      // Fallback for other non-matching /learning subpaths or if navItem is invalid
      // Consider what the default should be - perhaps 'courses' or null
      // Setting to 'courses' to ensure Content component shows by default for /learning base path
      setSelectedNavItem('courses');
    }
  }, [navItem, location.pathname]);

  const handleNavItemClick = (key) => {
    navigate(`/learning/${key}`); // This will trigger the useEffect to set the selectedNavItem
    setSelectedSection("");
    setSelectedHistory("");
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    // When a section (part of main content) is selected, ensure URL reflects the main content area.
    if (selectedNavItem !== 'courses') {
      navigate('/learning/courses'); // This will also trigger useEffect
    }
    // setSelectedNavItem('courses'); // Let useEffect handle this based on navigation
  };

  const handleHistorySelect = (section, historyItem) => {
    setSelectedSection(section);
    setSelectedHistory(historyItem);
    // When history (part of main content) is selected, ensure URL reflects the main content area.
    if (selectedNavItem !== 'courses') {
      navigate('/learning/courses'); // This will also trigger useEffect
    }
    // setSelectedNavItem('courses'); // Let useEffect handle this based on navigation
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
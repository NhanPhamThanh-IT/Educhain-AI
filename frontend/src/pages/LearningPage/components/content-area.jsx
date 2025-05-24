import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography,
  IconButton,
  Chip,
  Button,
  Divider,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CardActionArea, Stack } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloudUpload, Link } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useLearning } from '../context';
import MarketSection from '../../../sections/LearningPage/MarketSection';
import MissionSection from '../../../sections/LearningPage/MissionSection';
import LeaderboardSection from '../../../sections/LearningPage/LeaderboardSection';
import ExchangeSection from '../../../sections/LearningPage/ExchangeSection';
import ProfileSetup from "../../../sections/LearningPage/ProfileSetup";

const options = [
  {
    icon: <CloudUpload fontSize="large" color="primary" />,
    color: "#1976d2",
    title: "Upload",
    subtitle: "PDF, PPT, DOC, TXT",
  },
  {
    icon: <Link fontSize="large" color="secondary" />,
    color: "#9c27b0",
    title: "Paste",
    subtitle: "YouTube, Website",
  },
];

const Content = ({ sections, selectedSection, selectedHistory }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const currentSectionDetails = sections.find(sec => sec.key === selectedSection);

  if (currentSectionDetails) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom component="div">
          Current Focus: <Box component="span" color="primary.main" fontWeight="bold">{selectedSection}</Box>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          (Utilizing `selectedSection` prop)
        </Typography>

        {currentSectionDetails.history && currentSectionDetails.history.length > 0 && (
          <Box mt={2} mb={2}>
            <Typography variant="h6">Section-Specific History:</Typography>
            <List>
              {currentSectionDetails.history.map((item, index) => (
                <ListItem key={index} sx={{ justifyContent: 'center', py: 0.5 }}>
                  <ListItemText primary={item} primaryTypographyProps={{ textAlign: 'center' }} />
                </ListItem>
              ))}
            </List>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              (Utilizing `history` from `sections` prop)
            </Typography>
          </Box>
        )}

        {selectedHistory && (
          <Box mt={2} mb={2}>
            <Typography variant="h6">General Learning Progress:</Typography>
            <Typography variant="body1">{selectedHistory}</Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              (Utilizing `selectedHistory` prop)
            </Typography>
          </Box>
        )}

        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 3, mr: 1 }}
        // onClick={() => { /* Define action, e.g., navigate to edit section or clear selection */ }}
        >
          Explore Other Options
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          onClick={() => navigate("/learning/createcourse")} // Or other relevant action
        >
          Add to Learning
        </Button>
      </Box>
    );
  } else {
    return (
      <>
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          sx={{
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 4,
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }
          }}
        >
          What do you want to <Box component="span" color="primary.main">learn</Box> now?
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          gap={3}
          mb={4}
          flexWrap="wrap"
        >
          {options.map(({ icon, title, subtitle, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  position: "relative",
                  transition: "all 0.3s ease",
                  borderRadius: 3,
                  minWidth: 200,
                  boxShadow: theme.shadows[3],
                  border: `1.75px dashed ${color}`,
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                    borderColor: color,
                  },
                }}
              >
                {index === 0 && (
                  <Chip
                    label="Popular"
                    sx={{
                      position: "absolute",
                      backgroundImage: "linear-gradient(45deg, #56ab2f, #a8e063)",
                      color: "white",
                      width: 500,
                      top: 10,
                      right: -74,
                      transform: "rotate(45deg)",
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  />
                )}

                <CardActionArea sx={{ p: 2 }} onClick={() => {
                  // Placeholder for click action
                  console.log(`${title} option clicked`);
                }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      }
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label={title}
                      sx={{
                        color: color, // Changed to use the specific color for the icon
                        p: 2,
                        mb: 1,
                        backgroundColor: alpha(color, 0.1),
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: alpha(color, 0.2),
                          transform: "scale(1.1)",
                        }
                      }}
                    >
                      {icon}
                    </IconButton>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      textAlign="center"
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: color,
                        }
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {subtitle}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Divider
            sx={{
              width: "30%",
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: 20,
                height: 2,
                backgroundColor: theme.palette.divider,
              },
              '&::before': {
                left: -30,
              },
              '&::after': {
                right: -30,
              }
            }}
          >
            Or
          </Divider>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[8],
              }
            }}
            onClick={() => navigate("/learning/createcourse")}
          >
            Create course
          </Button>
        </Box>
      </>
    );
  }
};

const ContentArea = ({ sections, selectedSection, selectedHistory }) => {
  const { selectedNavItem } = useLearning();
  const theme = useTheme();

  const renderNavContent = () => {
    switch (selectedNavItem) {
      case 'market':
        return <MarketSection />;
      case 'missions':
        return <MissionSection />;
      case 'leaderboard':
        return <LeaderboardSection />;
      case 'exchange':
        return <ExchangeSection />;
      case 'profile':
        return <ProfileSetup />;
      default:
        return <Content sections={sections} selectedSection={selectedNavItem} selectedHistory={selectedHistory} />;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 4, md: 6 },
        flexGrow: 1,
        overflow: "auto",
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        mt: 4,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNavItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderNavContent()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

ContentArea.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  selectedSection: PropTypes.string.isRequired,
  selectedHistory: PropTypes.string.isRequired,
};

export default ContentArea;

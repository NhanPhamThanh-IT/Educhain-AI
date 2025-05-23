import { Box, Button, Divider, Typography, Paper, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { 
  RiBookOpenLine,
  RiVideoLine,
  RiGameLine,
  RiQuestionLine,
  RiMessage2Line
} from "react-icons/ri";

import { chatSuggestions } from "../constants";

const MotionBox = motion(Box);

export const InitialChatMessage = ({ setMessage }) => {
  const theme = useTheme();

  const options = [
    {
      icon: <RiBookOpenLine size={32} />,
      title: "Study Guide",
      color: theme.palette.primary.main,
      link: "/learning/course?section=studyGuides&historyItem=overview"
    },
    {
      icon: <RiQuestionLine size={32} />,
      title: "Quiz",
      color: theme.palette.error.main,
      link: "/learning/course?section=quizzes&historyItem=overview"
    },
    {
      icon: <RiVideoLine size={32} />,
      title: "Video",
      color: theme.palette.warning.main,
      link: "/learning/course?section=learningByVideo&historyItem=video2"
    },
    {
      icon: <RiGameLine size={32} />,
      title: "Games",
      color: theme.palette.error.light,
      disabled: true
    }
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        p: 4,
        height: "100%"
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Welcome to Educhain AI
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Your AI learning assistant. Ask questions, create study materials, or start a new learning journey.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          width: "100%",
          maxWidth: 800,
          mb: 4
        }}
      >
        {options.map((option, index) => (
          <MotionBox
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Paper
              onClick={() => !option.disabled && (window.location.href = option.link)}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                cursor: option.disabled ? "default" : "pointer",
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: "blur(8px)",
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: "all 0.2s ease",
                opacity: option.disabled ? 0.5 : 1,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[4],
                  borderColor: alpha(option.color, 0.3),
                  backgroundColor: alpha(option.color, 0.05),
                }
              }}
            >
              <Box sx={{ color: option.color }}>{option.icon}</Box>
              <Typography variant="h6" fontWeight={600}>{option.title}</Typography>
            </Paper>
          </MotionBox>
        ))}
      </Box>

      <Divider sx={{ width: "100%", maxWidth: 800 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: 800
        }}
      >
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Quick Actions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center"
          }}
        >
          {chatSuggestions.map((suggestion, index) => (
            <MotionBox
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => setMessage(suggestion)}
                startIcon={<RiMessage2Line />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                {suggestion}
              </Button>
            </MotionBox>
          ))}
        </Box>
      </Box>
    </MotionBox>
  );
};

InitialChatMessage.propTypes = {
  setMessage: PropTypes.func.isRequired
};
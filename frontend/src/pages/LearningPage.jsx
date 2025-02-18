import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Assignment";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import BookIcon from "@mui/icons-material/MenuBook";
import StorageIcon from "@mui/icons-material/Storage";
import ChatSection from "../sections/ChatSection";
import QuizSection from "../sections/QuizSection";
import StudyGuidesSection from "../sections/StudyGuidesSection";
import VideoSection from "../sections/VideoSection";
import MaterialsSection from "../sections/MaterialsSection";
const sections = [
  { key: "chat", label: "Chat", icon: <ChatIcon />, content: <ChatSection /> },
  {
    key: "quizzes",
    label: "Quizzes",
    icon: <QuizIcon />,
    content: <QuizSection />,
  },
  {
    key: "studyGuides",
    label: "Study Guides",
    icon: <BookIcon />,
    content: <StudyGuidesSection />,
  },
  {
    key: "learningByVideo",
    label: "Learning by Video",
    icon: <VideoIcon />,
    content: <VideoSection />,
  },
  {
    key: "learningMaterials",
    label: "Learning Materials",
    icon: <StorageIcon />,
    content: <MaterialsSection />,
  },
];




export default function EduchainApp() {
  const [selectedSection, setSelectedSection] = useState("chat");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
      }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            padding: 2,
          },
        }}
      >
        <Toolbar />
        <List>
          {sections.map((item) => (
            <ListItem
              button
              key={item.key}
              onClick={() => setSelectedSection(item.key)}
              sx={{
                borderRadius: 2,
                margin: 1,
                backgroundColor:
                  selectedSection === item.key ? "#ddd" : "transparent",
              }}
            >
              {item.icon}
              <ListItemText
                primary={item.label}
                sx={{ textAlign: "left", marginLeft: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 6,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          m: 4,
          mt: 10,
        }}
      >
        {sections.find((s) => s.key === selectedSection)?.content}
      </Box>
    </Box>
  );
}

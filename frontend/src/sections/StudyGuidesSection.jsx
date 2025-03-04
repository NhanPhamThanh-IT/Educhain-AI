import React, { useState, useRef  } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Paper,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  Divider
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AutoStories } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
const files = [
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Comparing SIS Platforms",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
    ],
    progress: 40,
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Current Status and Development Needs",
      "Practical Needs of SIS",
      "Moodle vs SHub",
    ],
    progress: 70,
  },
  {
    name: "22127442-10.pdf",
    error: true,
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Comparing SIS Platforms",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
    ],
    progress: 40,
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Current Status and Development Needs",
      "Practical Needs of SIS",
      "Moodle vs SHub",
    ],
    progress: 70,
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Comparing SIS Platforms",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
    ],
    progress: 40,
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Current Status and Development Needs",
      "Practical Needs of SIS",
      "Moodle vs SHub",
    ],
    progress: 70,
  },
  {
    name: "22127442-10.pdf",
    error: true,
  },
];
const studyData = {
  title: "Comparing SIS Platforms",
  progress: 0,
  sections: [
    {
      title: "Overview of Moodle",
      content: (
        <>
          <Typography variant="body1">
            <strong>Moodle</strong> is a widely used learning management system that facilitates the creation and management of courses.  
            Here are some key features:
          </Typography>
          <ul>
            <li><Typography variant="body2"><strong>Website:</strong> <a href="#">Moodle</a></Typography></li>
            <li><Typography variant="body2"><strong>Course Management:</strong> Allows educators to create and manage courses.</Typography></li>
            <li><Typography variant="body2"><strong>User Management:</strong> Supports management of teachers, students, and groups.</Typography></li>
            <li><Typography variant="body2"><strong>Notifications:</strong> Enables the creation of announcements.</Typography></li>
            <li><Typography variant="body2"><strong>Scheduling:</strong> Helps students keep track of assignments and deadlines.</Typography></li>
            <li><Typography variant="body2"><strong>Communication Tools:</strong> Messaging and feedback tools for interaction.</Typography></li>
            <li><Typography variant="body2"><strong>Accessibility:</strong> Allows easy access to course materials and class announcements.</Typography></li>
          </ul>
        </>
      ),
    },
    {
      title: "Overview of SHub",
      content: (
        <Typography variant="body1">
          <strong>SHub</strong> is another SIS platform that provides a more streamlined approach to course management.
        </Typography>
      ),
    },
    {
      title: "Comparison of Features",
      content: (
        <Typography variant="body1">
          Moodle offers more extensive features, while SHub is simpler and more user-friendly.
        </Typography>
      ),
    },
  ],
};
export default function StudyGuides() {
  const sectionRefs = useRef(studyData.sections.map(() => null));

  const handleScrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const [searchParams] = useSearchParams();
  const history = searchParams.get("historyItem");
  return history === "overview" ? (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        maxHeight: "80vh",
      }}
    >
      <AutoStories color="primary" sx={{ fontSize: 80 }} />
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Study Guides
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Comprehensive walkthroughs of each of your course files.
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        {files.map((file, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              boxShadow: 3,
              border: "2px solid transparent",
              transition: "all 0.3s",
              "&:hover": { borderColor: "#2196f3" },
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {file.name}
              </Typography>
              {file.error ? (
                <>
                  <Typography
                    color="error"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mt={1}
                  >
                    <ErrorOutlineIcon fontSize="small" /> Failed to generate
                    topics
                  </Typography>
                  <Button variant="outlined" color="error" sx={{ mt: 1 }}>
                    Retry
                  </Button>
                </>
              ) : (
                <>
                  {file.topics.slice(0, 3).map((topic, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      textAlign={"left"}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      • {topic}
                    </Typography>
                  ))}
                  {file.topics.length > 3 && (
                    <Typography variant="body2" color="text.secondary">
                      + {file.topics.length - 3} more...
                    </Typography>
                  )}
                </>
              )}
            </CardContent>

            {/* Phần Thanh Tiến Trình Luôn Dưới Cùng */}
            {!file.error && (
              <Box
                sx={{
                  mt: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  sx={{ flexGrow: 1, height: 6, borderRadius: 5 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minWidth: 30 }}
                >
                  {file.progress}%
                </Typography>
              </Box>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  ) : (   <Box sx={{ display: "flex", height: "80vh", p: 2, gap: 2, overflowY: "auto", flexDirection: "column", "&::-webkit-scrollbar": { display: "none" } }}>
    {/* Sidebar */}
    <Paper sx={{ p: 2, minWidth: 300, maxHeight: "100%" }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Section Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Compare and contrast different Student Information Systems.
      </Typography>
      <Grid container spacing={1}>
        {studyData.sections.map((section, index) => (
          <Grid item xs={6} key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleScrollToSection(index)}>
                <ListItemText primary={`${index + 1}. ${section.title}`} />
              </ListItemButton>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Paper>

    {/* Content Area */}
    <Box sx={{ flex: 1, p: 2 }}>
      <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
        {studyData.title}
      </Typography>
      <LinearProgress variant="determinate" value={studyData.progress} sx={{ mb: 2 }} />
      
      {studyData.sections.map((section, index) => (
        <Box
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          sx={{ mb: 3, p: 2, border: "2px solid lightgray", borderRadius: 2, backgroundColor: "white" }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {section.title}
          <Divider />
          </Typography>
          {section.content}
        </Box>
      ))}
    </Box>
  </Box>);
}

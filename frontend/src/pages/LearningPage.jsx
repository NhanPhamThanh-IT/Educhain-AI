import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Collapse,
  Divider,
  Paper,
  Button,
  Input,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { CloudUpload, Link, YouTube } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate, useSearchParams } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarComponent from "../components/Partials/Header/Index";
// import { data } from "../components/constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const getColoredLabel = (text, color) => (
  <Typography sx={{ color, fontWeight: "medium" }}>{text}</Typography>
);
const data = {
  logo: {
    src: "/logo.png",
    link: "/homepage",
    title: "Educhain",
  },
};
const sections = [
  {
    key: "chat",
    label: getColoredLabel("Chat", "#63B3ED"),
    icon: <ChatIcon sx={{ color: "#63B3ED" }} />,
    content: <ChatSection />,
    history: ["overview", "chat2", "chat3"],
  },
  {
    key: "quizzes",
    label: getColoredLabel("Quizzes", "#FC8181"),
    icon: <QuizIcon sx={{ color: "#FC8181" }} />,
    content: <QuizSection />,
    history: ["overview", "quiz1", "quiz2", "quiz3"],
  },
  {
    key: "studyGuides",
    label: getColoredLabel("Study Guides", "#48BB78"),
    icon: <BookIcon sx={{ color: "#48BB78" }} />,
    content: <StudyGuidesSection />,
    history: ["overview", "study2", "study3"],
  },
  {
    key: "learningByVideo",
    label: getColoredLabel("Learning by Video", "#FB923C"),
    icon: <VideoIcon sx={{ color: "#FB923C" }} />,
    content: <VideoSection />,
    history: ["video1", "video2", "video3"],
  }, // Chuyển sang màu cam
  {
    key: "learningMaterials",
    label: getColoredLabel("Learning Materials", "#9F7AEA"),
    icon: <StorageIcon sx={{ color: "#9F7AEA" }} />,
    content: <MaterialsSection />,
    history: ["mat1", "mat2", "mat3"],
  },
];

export default function EduchainApp() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedHistory, setSelectedHistory] = useState(
    searchParams.get("historyItem") || ""
  );
  const [selectedSection, setSelectedSection] = useState(
    searchParams.get("section") || "chat"
  );
  const [openSection, setOpenSection] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 200 * 1024 * 1024, // 200MB
    accept: {
      "application/pdf": [], // PDF
      "image/png": [], // PNG
      "image/jpeg": [], // JPG/JPEG
      "image/webp": [], // WEBP
    },
  });

  const toggleSection = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const handleHistorySelect = (sectionKey, historyItem) => {
    navigate(
      `?section=${sectionKey}&historyItem=${encodeURIComponent(historyItem)}`
    );
    setSelectedHistory(historyItem);
    setSelectedSection(sectionKey);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        overflow: "hidden",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <CssBaseline />

      {/* Tabs sections */}
      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarOpen ? 300 : 60,
          flexShrink: 0,
          transition: "width 0.3s ease",
          [`& .MuiDrawer-paper`]: {
            width: isSidebarOpen ? 300 : 60,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            padding: isSidebarOpen ? 2 : 0,
            overflow: "hidden",
          },
          overflow: "hidden",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {isSidebarOpen && (
            <Box
              role="button"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <Box
                component="img"
                src={data.logo.src}
                alt="Logo"
                sx={{ width: 40 }}
              />
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  ml: 0.5,
                  display: { xs: "none", md: "block" },
                  fontWeight: "bold",
                }}
              >
                {data.logo.title}
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={toggleSidebar}
            sx={{ margin: 1, alignSelf: "flex-end" }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        {!isSidebarOpen && (
          <>
            <Stack
              direction="column"
              spacing={3}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Tooltip title="Upload File" placement="right">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  {...getRootProps()}
                >
                  <CloudUpload color="primary" />
                  <input {...getInputProps()} />
                </Box>
              </Tooltip>

              <Tooltip title="YouTube Import" placement="right">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <YouTubeIcon
                    color="primary"
                    onClick={() => toggleSidebar()}
                  />
                </Box>
              </Tooltip>
            </Stack>

            <Divider sx={{ mx: 1, my: 3 }} />

            {/* Mini Section Icons */}
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              sx={{ px: 1 }}
            >
              {sections.map((item) => (
                <Tooltip key={item.key} title={item.label} placement="right">
                  <IconButton
                    onClick={() => {
                      toggleSidebar();
                      toggleSection(item.key);
                    }}
                    sx={{
                      borderRadius: 2,
                      backgroundColor:
                        openSection === item.key ? "#f5f5f5" : "transparent",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </>
        )}
        {isSidebarOpen && (
          <>
            <Box
              sx={{
                maxWidth: 500,
                mx: "auto",
                textAlign: "center",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                }}
                {...getRootProps()}
              >
                <CloudUpload color="disabled" fontSize="large" />
                <Stack direction="column">
                  <Typography variant="body1" fontWeight="bold">
                    Drag and drop file here
                  </Typography>
                  <Typography variant="caption" color="gray">
                    (max 200MB)
                  </Typography>
                </Stack>
                <input {...getInputProps()} />
              </Paper>

              <Typography my={2} color="gray">
                Or
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 2,
                }}
              >
                <Link color="disabled" />
                <Input
                  fullWidth
                  placeholder="Paste youtube link"
                  disableUnderline
                />
                <Button variant="contained">Analyze</Button>
              </Paper>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              {sections.map((item) => (
                <div key={item.key}>
                  <ListItem
                    button
                    onClick={() => toggleSection(item.key)}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {item.icon}
                    <ListItemText primary={item.label} sx={{ marginLeft: 2 }} />

                    {item.key === "chat" && (
                      <Tooltip title="New Chat">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          sx={{ marginLeft: "auto" }}
                        >
                          <OpenInNewIcon
                            sx={{ color: "gray", width: 20, height: 20 }}
                            onClick={() =>
                              (window.location.href =
                                "/learning/course?section=chat&historyItem=overview")
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    {openSection === item.key ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>

                  {/* Dropdown Content */}
                  <Collapse
                    in={openSection === item.key}
                    timeout="auto"
                    unmountOnExit
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <List
                        component="div"
                        disablePadding
                        sx={{
                          ml: 2,
                          mt: 1,
                          mb: 2,
                          borderLeft: "2px solid #e0e0e0",
                          borderRadius: 0,
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: -2,
                            width: 10,
                            height: 2,
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        {item.history.map((historyItem, index) => (
                          <ListItem
                            button
                            key={historyItem}
                            onClick={() =>
                              handleHistorySelect(item.key, historyItem)
                            }
                            sx={{
                              pl: 3,
                              py: 1,
                              mb: 0.5,
                              transition: "all 0.2s ease",
                              backgroundColor:
                                selectedHistory === historyItem
                                  ? "#f0f7ff"
                                  : "transparent",
                              borderRadius: 1,
                              position: "relative",
                              "&:hover": {
                                backgroundColor:
                                  selectedHistory === historyItem
                                    ? "#e6f2ff"
                                    : "#f5f5f5",
                              },
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "50%",
                                left: -2,
                                width: 6,
                                height: 6,
                                backgroundColor:
                                  selectedHistory === historyItem
                                    ? "#1976d2"
                                    : "#9e9e9e",
                                transform: "translateY(-50%) translateX(-2px)",
                                borderRadius: "50%",
                              },
                            }}
                          >
                            <ListItemText
                              primary={historyItem}
                              primaryTypographyProps={{
                                fontSize: "0.9rem",
                                fontWeight:
                                  selectedHistory === historyItem ? 500 : 400,
                                color:
                                  selectedHistory === historyItem
                                    ? "#1976d2"
                                    : "inherit",
                              }}
                            />
                            {selectedHistory === historyItem && (
                              <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
                                <CheckCircleOutlineIcon
                                  fontSize="small"
                                  color="primary"
                                />
                              </IconButton>
                            )}
                          </ListItem>
                        ))}
                        {item.history.length === 0 && (
                          <ListItem sx={{ pl: 3, py: 1 }}>
                            <ListItemText
                              primary="No items yet"
                              primaryTypographyProps={{
                                fontSize: "0.85rem",
                                fontStyle: "italic",
                                color: "text.secondary",
                              }}
                            />
                          </ListItem>
                        )}
                      </List>
                    </motion.div>
                  </Collapse>
                </div>
              ))}
            </List>
          </>
        )}
      </Drawer>

      {/* Nội Dung Chính */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#fff",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Prevents scrolling within this container
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            px: 3,
            py: 2,
            backgroundColor: "#fafafa",
            position: "fixed",
            width: isSidebarOpen ? "calc(100% - 300px)" : "calc(100% - 60px)",
            height: "10vh",
            top: 0
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Section icon */}
            {
              sections.find(
                (s) =>
                  s.key === selectedSection &&
                  s.history?.includes(selectedHistory)
              )?.icon
            }

            <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
              {selectedHistory || selectedSection || "Dashboard"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refresh">
              <IconButton size="small">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="More options">
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content Area with fixed height */}
        <Box
          sx={{
            p: 6,
            flexGrow: 1,
            overflow: "auto", // Makes only this inner content scrollable if needed
            position: "relative",
          }}
        >
          {sections.find(
            (s) =>
              s.key === selectedSection && s.history?.includes(selectedHistory)
          )?.content || (
            <Box sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
              <Typography variant="body1">
                Select a section from the sidebar
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

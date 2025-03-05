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
import { CloudUpload, Link } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
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

const getColoredLabel = (text, color) => (
  <Typography sx={{ color, fontWeight: "medium" }}>{text}</Typography>
);

const sections = [
  { key: "chat", label: getColoredLabel("Chat", "#63B3ED"), icon: <ChatIcon sx={{ color: "#63B3ED" }} />, content: <ChatSection />, history: ["overview", "chat2", "chat3"] },
  { key: "quizzes", label: getColoredLabel("Quizzes", "#FC8181"), icon: <QuizIcon sx={{ color: "#FC8181" }} />, content: <QuizSection />, history: ["overview", "quiz1", "quiz2", "quiz3"] },
  { key: "studyGuides", label: getColoredLabel("Study Guides", "#48BB78"), icon: <BookIcon sx={{ color: "#48BB78" }} />, content: <StudyGuidesSection />, history: ["overview", "study2", "study3"] },
  { key: "learningByVideo", label: getColoredLabel("Learning by Video", "#FB923C"), icon: <VideoIcon sx={{ color: "#FB923C" }} />, content: <VideoSection />, history: ["video1", "video2", "video3"] }, // Chuyển sang màu cam
  { key: "learningMaterials", label: getColoredLabel("Learning Materials", "#9F7AEA"), icon: <StorageIcon sx={{ color: "#9F7AEA" }} />, content: <MaterialsSection />, history: ["mat1", "mat2", "mat3"] },
];

export default function EduchainApp() {
  const navigate = useNavigate();
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openNavbar, setOpenNavbar] = useState(false);

  const handleOpenNavbar = () => setOpenNavbar(true);
  const handleCloseNavbar = () => setOpenNavbar(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 300,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            padding: 2,
            z: -100,
          },
          overflow: "hidden",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            textAlign: "center",
            mt: 4,
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
            <Input fullWidth placeholder="Paste video link" disableUnderline />
            <Button variant="contained">Add</Button>
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
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ borderLeft: "1px solid #B0B3B8", borderRadius: 1 }}
                  >
                    {item.history.map((historyItem) => (
                      <ListItem
                        button
                        key={historyItem}
                        onClick={() =>
                          handleHistorySelect(item.key, historyItem)
                        }
                        sx={{
                          pl: 4,
                          transition: "all 0.2s ease",
                          backgroundColor:
                            selectedHistory === historyItem
                              ? "#f5f5f5"
                              : "transparent",
                          borderRadius: 2,
                        }}
                      >
                        <ListItemText primary={historyItem} />
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          p: 3,
        }}
      >
        {/* Button Icon */}
        {!openNavbar && (
          <IconButton
            onClick={handleOpenNavbar}
            sx={{
              position: "relative",
              top: 0,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: "50%",
              mb: "-15px",
              zIndex: 10,
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 30, color: "#1976D2" }} />
          </IconButton>
        )}

        {/* Navbar Hiển Thị Ngang */}
        {openNavbar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                background: "linear-gradient(135deg, #1976D2, #42A5F5)",
                borderRadius: 3,
                boxShadow: 3,
                m: 4,
                p: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {/* Nút Đóng Navbar */}
              <IconButton
                onClick={handleCloseNavbar}
                sx={{
                  backgroundColor: "white",
                  boxShadow: 3,
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <CloseIcon sx={{ color: "#1976D2" }} />
              </IconButton>

              {/* Menu Items */}
              {["Intro", "My Learning", "Market", "Mission", "Leaderboard"].map(
                (item) => (
                  <MenuItem
                    key={item}
                    onClick={() => alert(item)}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <Typography variant="subtitle1">{item}</Typography>
                  </MenuItem>
                )
              )}
            </Box>
          </motion.div>
        )}

        {/* Nội Dung Chính */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 6,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            m: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {sections.find(
            (s) => s.key === selectedSection && s.history?.includes(selectedHistory)
          )?.content || ""}
        </Box>
      </Box>

    </Box>
  );
}

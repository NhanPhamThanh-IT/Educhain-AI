import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Drawer, List, ListItem, ListItemText, Box, CssBaseline, Collapse, Divider, Paper, Button, Input, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import { CloudUpload, Link } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ExpandMore from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useSearchParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { data, topics, settings, sections } from "./constants";

import TopBar from "./components/top-bar";
import ContentArea from "./components/content-area";

export default function EduchainApp() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedHistory, setSelectedHistory] = useState(
    searchParams.get("historyItem") || ""
  );
  const [selectedSection, setSelectedSection] = useState(
    searchParams.get("section") || "Dashboard"
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
          backgroundColor: "#e0e0e0",
          background: "linear-gradient(to bottom, #f0f0f0, #d9d9d9)",
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
                    {item.key === "quizzes" && (
                      <Tooltip title="New quizzes">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          sx={{ marginLeft: "auto" }}
                        >
                          <AssignmentIcon
                            sx={{ color: "gray", width: 20, height: 20 }}
                            onClick={() =>
                            (window.location.href =
                              "/learning/course?section=quizzes&historyItem=create-quiz")
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    {item.key === "studyGuides" && (
                      <Tooltip title="New study guides">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          sx={{ marginLeft: "auto" }}
                        >
                          <AddIcon
                            sx={{ color: "gray", width: 20, height: 20 }}
                            onClick={() =>
                            (window.location.href =
                              "/learning/course?section=studyGuides&historyItem=create-guide")
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
        <TopBar isSidebarOpen={isSidebarOpen} sections={sections} selectedSection={selectedSection} selectedHistory={selectedHistory} />

        {/* Content Area with fixed height */}
        <ContentArea sections={sections} selectedSection={selectedSection} selectedHistory={selectedHistory} />
      </Box>
    </Box>
  );
}

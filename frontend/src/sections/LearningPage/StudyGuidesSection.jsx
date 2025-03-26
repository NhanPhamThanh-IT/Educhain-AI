import { useRef, useState } from "react";
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AutoStories } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { WarningAmber } from "@mui/icons-material";
const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => (
  <Dialog
  open={open}
  onClose={onClose}
  sx={{
    "& .MuiDialog-paper": { borderRadius: 4, padding: 2, minWidth: 350 }
  }}
>
  <Box display="flex" alignItems="center" gap={1} px={2} pt={2}>
    <WarningAmber sx={{ fontSize: 30, color: "warning.main" }} />
    <DialogTitle sx={{ padding: 0, fontWeight: 600 }}>{title}</DialogTitle>
  </Box>
  <DialogContent>
    <Typography variant="body1" color="text.secondary">{content}</Typography>
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button onClick={onClose} variant="outlined" color="primary">
      Cancel
    </Button>
    <Button onClick={onConfirm} variant="contained" color="error">
      Confirm
    </Button>
  </DialogActions>
</Dialog>
);
const files = [
  {
    name: "visual retrieval.pdf",
    topics: [
      "Comparing SIS Platforms",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
      "Importance of SIS in Education",
      "Features of InfoStudia SIS",
    ],
    progress: 40,
    relatedQuizQuestions: [
      {
        id: 1,
        question: "What is the capital of France?",
        type: "General Knowledge"
      }
    ],
    learningTechniques: [
      "Comparative Analysis",
      "Platform Evaluation",
      "Educational Technology Assessment"
    ],
    aiEnhancementPotential: {
      semanticSearch: true,
      ocrCapability: true,
      multimodalLearning: true
    }
  },
  {
    name: "2-PhatBieuBaiToan.pdf",
    topics: [
      "Current Status and Development Needs",
      "Practical Needs of SIS",
      "Moodle vs SHub",
    ],
    progress: 70,
    relatedQuizQuestions: [
      {
        id: 7,
        question: "Which technique improves query accuracy by understanding natural language intent?",
        answer: "Semantic Search"
      }
    ],
    platformComparison: {
      models: ["Moodle", "SHub"],
      comparisonCriteria: [
        "Feature Complexity",
        "User Management",
        "Scalability"
      ]
    },
    aiToolsForAnalysis: {
      queryEnhancement: "Semantic Search",
      textEmbedding: "CLIP Model",
      naturalLanguageProcessing: "GPT-4o"
    }
  },
  {
    name: "paper IUKM2025.pdf",
    error: true,
    errorHandling: {
      possibleReasons: [
        "Corrupted File",
        "Incompatible Format",
        "Access Restrictions"
      ],
      recommendedActions: [
        "Verify File Integrity",
        "Check File Permissions",
        "Attempt Alternative Conversion Methods"
      ]
    },
    recoveryPotential: {
      ocrRecovery: true,
      aiTextExtraction: {
        model: "PaddleOCR",
        capability: "Text Extraction from Images"
      }
    }
  }
];
const studyData = {
  title: "Advanced Model Integration and Multimodal Data Retrieval",
  course_id: "5ad4cd46-eeec-4a8a-bd4f-5873c8e1491c",
  category: "AI & Data Science",
  price: 99.99,
  introduction: "An in-depth study on integrating AI models in data retrieval",
  description: "This course covers multimodal intelligence, query enhancement techniques, and system optimization for large-scale data retrieval",
  progress: 60,
  sections: [
    {
      title: "Introduction to AI Models",
      content: (
        <>
          <Typography variant="h6">Multimodal AI Models Overview</Typography>
          <Typography variant="body1">
            Exploring cutting-edge AI models that can process and generate multiple types of data.
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <strong>CLIP:</strong> Cross-modal model for generating embeddings across text and images
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>GPT-4o:</strong> Enhanced natural language processing and query retrieval
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Whisper:</strong> Advanced Automatic Speech Recognition (ASR) model
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>PaddleOCR:</strong> Specialized Optical Character Recognition model
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>DALL-E:</strong> Text-to-image generation using advanced generative techniques
              </Typography>
            </li>
          </ul>
        </>
      )
    },
    {
      title: "Query Enhancement Techniques",
      content: (
        <>
          <Typography variant="h6">Advanced Search and Retrieval Methods</Typography>
          <Typography variant="body1">
            Techniques to improve accuracy and contextual understanding in AI-powered searches.
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <strong>Semantic Search:</strong> Understanding user intent beyond keyword matching
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Multimodal Embedding:</strong> Cross-referencing text and image data for precise retrieval
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>OCR-Based Querying:</strong> Extracting and searching text within images
              </Typography>
            </li>
          </ul>
        </>
      )
    },
    {
      title: "Model-Specific Applications",
      content: (
        <>
          <Typography variant="h6">Specialized AI Model Capabilities</Typography>
          <Typography variant="body1">
            Detailed exploration of unique functionalities across different AI models.
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <strong>CLIP:</strong> Generating embeddings for cross-modal data analysis
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Whisper:</strong> Converting spoken language to text with high accuracy
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>PaddleOCR:</strong> Text extraction from various image sources
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>DALL-E:</strong> Creating unique images from textual descriptions
              </Typography>
            </li>
          </ul>
        </>
      )
    }
  ],
  assessments: {
    quizzes: {
      total: 12,
      topics: [
        "AI Model Identification",
        "Multimodal Intelligence",
        "Search Techniques"
      ]
    },
    exams: {
      total: 5,
      focus: [
        "Theoretical Understanding",
        "Practical Applications",
        "Model Comparison"
      ]
    }
  },
  resources: {
    studyGuides: 1,
    documents: 1,
    additionalMaterials: [
      "PDF Lecture Notes",
      "Practical Implementation Guides"
    ]
  }
};

export default function StudyGuides() {
  const sectionRefs = useRef(studyData.sections.map(() => null));
  const [openDialog, setOpenDialog] = useState(false);
  const handleScrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const [searchParams] = useSearchParams();
  const history = searchParams.get("historyItem");
  if (history === "create-guide") {
    return (
      <Box
        sx={{
          margin: "auto",
          textAlign: "center",
          p: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            textAlign: "left",
            p: 4,
            maxWidth: "900px",
            borderRadius: 3,
            border: "1px solid lightgray",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f8f8",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Study guide Payment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Related Knowledge"
                placeholder="Achieve knowledge from any aspect"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quiz Type"
                placeholder="Multiple answers or Yes/No question"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 3 },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Total
          </Typography>
          <Stack sx={{ width: "40%" }}>
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography>1 study guide</Typography>
              <Typography fontWeight={600}>
              400 <img src="/Partials/Ecoin.png" height={30} width={30} style={{ verticalAlign: "middle" }}/>
            </Typography>

            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={600}>Total</Typography>
              <Typography fontWeight={600}>
              400 <img src="/Partials/Ecoin.png" height={30} width={30} style={{ verticalAlign: "middle" }}/>
            </Typography>
            </Stack>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
            onClick={() => setOpenDialog(true)}
          >
            Create
          </Button>
          <ConfirmDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              onConfirm={() => {
                console.log("Confirmed!");
                setOpenDialog(false);
              }}
              title="Confirm Payment"
              content="Are you sure you want to proceed with the payment? This action cannot be undone."
            />
        </Card>
      </Box>
    );
  }
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
            onClick={() => {
              if (!file.error) {
                window.location.href =
                  "/learning/course?section=studyGuides&historyItem=visual retrieval";
              }
            }}
            sx={{
              width: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              boxShadow: 3,
              border: "2px solid transparent",
              transition: "all 0.3s",
              cursor: file.error ? "default" : "pointer",
              "&:hover": {
                borderColor: file.error ? "red" : "#2196f3",
                cursor: file.error ? "default" : "pointer",
              },
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
  ) : (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        p: 2,
        gap: 2,
        overflowY: "auto",
        flexDirection: "column",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
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
        <LinearProgress
          variant="determinate"
          value={studyData.progress}
          sx={{ mb: 2 }}
        />

        {studyData.sections.map((section, index) => (
          <Box
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            sx={{
              mb: 3,
              p: 2,
              border: "2px solid lightgray",
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {section.title}
              <Divider />
            </Typography>
            {section.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

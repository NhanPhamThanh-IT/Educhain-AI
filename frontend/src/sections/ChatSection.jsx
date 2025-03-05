import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import PauseIcon from "@mui/icons-material/Pause";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VideocamIcon from "@mui/icons-material/Videocam";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export default function ChatSection() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const historyItem = params.get("historyItem");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const chatSuggestions = [
    "What is the top themes of this article?",
    "Enhance the model's performance!",
    "What is the conclusion?",
  ];

  const updateIsPaused = (value) => {
    isPausedRef.current = value;
    setIsPaused(value);
  };

  const typingIntervalRef = useRef(null);
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Xử lý gửi tin nhắn

  const time = [ 1, 5, 10, 15, 30, 60];

  const handleSend = () => {
    if (message.trim()) {
      const newMessages = [
        ...messages,
        { type: "text", content: message, sender: "user" },
      ];
      setMessages(newMessages);
      setBotTyping(true);
      updateIsPaused(false);
      const botResponse = message.length < 6 ? "Hello! How can EduChain assist you on your learning journey today?" : 'Here\'s a concise summary of the article "An Interactive System For Visual Data Retrieval From Multimodal Input"\nOverview:\nThe paper presents a multimodal retrieval system designed for the AI Challenge 2024, which focuses on event-based image retrieval from video datasets.The system integrates CLIP, GPT-4o, Whisper, and PaddleOCR for text, voice, and image-based searches.\nFeatures include semantic search, OCR-based and voice queries, AI-generated image search, and query enhancement.Achieved 81.54% accuracy in retrieving correct results and reduced irrelevant data by 21%.\nKey Components:\nData Preprocessing:Keyframe extraction using TransnetV2.\nFiltering blurry (17.33%) and redundant (6.67%) images.\nFeature extraction with CLIP ViT-L/14 & FAISS indexing.OCR-based text extraction (PaddleOCR) & Speech-to-text conversion (Whisper).\nRetrieval Processing:Multimodal inputs: text, voice, image.\nQuery enhancement using GPT-4o to refine user inputs.Semantic search using CLIP & FAISS for ranking relevant images.\nOCR-based search with Jaro-Winkler similarity.Visual similarity search allows image-based re-ranking.Generative AI image-based search using DALL-E 3 for abstract queries.Results & PerformanceEnhanced queries (GPT-4o refined) improved accuracy from 27.69% → 36.92% @R1.Final round results: Accuracy increased as more hints were provided (@R1: 22.13% → 51.45% with Hint 4).GUI developed with Flask (backend), ReactJS, and Tailwind CSS for an intuitive interface\nConclusion:\nThe system enhances multimodal image retrieval with AI-powered query refinement and multimodal search. Future improvements: faster response time, better handling of ambiguous queries, and cloud scalability. Let me know if you need an even shorter version! 🚀';      let typedMessage = "";
      let index = 0;
      setMessage("");

      typingIntervalRef.current = setInterval(() => {
        if (!isPausedRef.current && index < botResponse.length) {
          typedMessage += botResponse[index];
          setMessages([
            ...newMessages,
            { type: "text", content: typedMessage, sender: "bot" },
          ]);
          index++;
        } else {
          clearInterval(typingIntervalRef.current);
          setBotTyping(false);
        }
      }, time[Math.floor(Math.random() * time.length)] / 10);
    }
  };
  const handlePause = () => {
    clearInterval(typingIntervalRef.current);
    setBotTyping(false);
    setIsPaused(true);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = (file.size / 1024).toFixed(2) + " KB";
      const newMessages = [
        ...messages,
        {
          type: "file",
          content: {
            name: file.name,
            size: fileSize,
            url: URL.createObjectURL(file),
          },
          sender: "user",
        },
      ];
      setMessages(newMessages);
      setBotTyping(true);

      setTimeout(() => {
        setMessages([
          ...newMessages,
          { type: "text", content: "Tôi có thể giúp gì bạn?", sender: "bot" },
        ]);
        setBotTyping(false);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {historyItem || "New chat"}
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          maxHeight: "100%",
          overflowY: "auto",
          p: 2,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {messages.length === 0 && (
          <>
            <Box sx={{ textAlign: "center", mb: 1 }}>
              <Typography color="black">
                What do you have to do today?
              </Typography>
              <Typography color="gray">
                Get answers with citations to your relevant files.
              </Typography>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", fontWeight: "bold", my: 10 }}
            >
              Create a ...
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => window.location.href = "/learning/course?section=quizzes&historyItem=overview"}
                startIcon={<QuizIcon sx={{ color: "green" }} />}
                sx={{
                  color: "green",
                  borderColor: "green",
                  flexBasis: "20%",
                  minWidth: "120px",
                }}
              >
                Quiz
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.href = "/learning/course?section=studyGuides&historyItem=overview"}
                startIcon={<MenuBookIcon sx={{ color: "blue" }} />}
                sx={{
                  color: "blue",
                  borderColor: "blue",
                  flexBasis: "20%",
                  minWidth: "120px",
                }}
              >
                Study Guide
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.href = "/learning/course?section=learningByVideo&historyItem=video2"}
                startIcon={<VideocamIcon sx={{ color: "orange" }} />}
                sx={{
                  color: "orange",
                  borderColor: "orange",
                  flexBasis: "20%",
                  minWidth: "120px",
                }}
              >
                Video
              </Button>
              <Button
                variant="outlined"
                disabled
                startIcon={<SportsEsportsIcon sx={{ color: "red" }} />}
                sx={{
                  color: "red",
                  borderColor: "red",
                  flexBasis: "20%",
                  minWidth: "120px",
                  minHeight: "60px",
                }}
              >
                Games
              </Button>
            </Box>

            <Divider sx={{ mx: 10 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                {chatSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    color="black"
                    onClick={() => setMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Box>
            </Box>
          </>
        )}

        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: "75%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" && "#C0C0C0",
              color: "#000",
              p: 1.5,
              m: 1,
              borderRadius: "15px",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.type === "text" ? (
              <Typography>{msg.content}</Typography>
            ) : (
              <Box>
                <Typography>{msg.content.name}</Typography>
                <Typography variant="caption">{msg.content.size}</Typography>
                <IconButton
                  component="a"
                  href={msg.content.url}
                  download={msg.content.name}
                  sx={{
                    color: msg.sender === "user" ? "white" : "black",
                    ml: 1,
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
        <div ref={messageRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          backgroundColor: "#fff",
          borderRadius: 3,
          mt: 2,
        }}
      >
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileUpload}
          disabled={botTyping}
        />
        <IconButton component="label" htmlFor="file-upload">
          <AttachFileIcon />
        </IconButton>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileUpload}
          disabled={botTyping}
        />
        <IconButton component="label" htmlFor="image-upload">
          <ImageIcon />
        </IconButton>

        <TextField
          fullWidth
          placeholder="Ask something..."
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          sx={{ ml: 2 }}
          disabled={botTyping}
        />

        <IconButton
          onClick={botTyping ? handlePause : handleSend}
          disabled={!message.trim() && !botTyping}
        >
          {botTyping ? <PauseIcon /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}

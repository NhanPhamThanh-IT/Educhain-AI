import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button, Divider, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import PauseIcon from "@mui/icons-material/Pause";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VideocamIcon from "@mui/icons-material/Videocam";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MicIcon from "@mui/icons-material/Mic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const botMessages = [
  "Hello Im Soft-AI bot, how can I help you with visual retrieval course ?",
  `## What is CLIP Model and How to Use it with FAISS
  CLIP (Contrastive Language-Image Pretraining) is an AI model by OpenAI that understands images and text together. It converts both into a shared embedding space, allowing similarity searches between text and images.
### Using CLIP with FAISS for Image Search
1. **Load CLIP model** (from \`openai/CLIP\` or \`sentence-transformers\`):
   \`\`\`python
   from sentence_transformers import SentenceTransformer
   model = SentenceTransformer("clip-ViT-B-32")
   \`\`\`
2. **Extract embeddings**:
   \`\`\`python
   image_embedding = model.encode(["image_path"])
   text_embedding = model.encode(["search query"])
   \`\`\`
3. **Index embeddings with FAISS**:
   \`\`\`python
   import faiss
   index = faiss.IndexFlatL2(512)  # 512D for CLIP ViT-B/32
   index.add(image_embedding)
   \`\`\`
4. **Search**:
   \`\`\`python
   _, indices = index.search(text_embedding, k=5)  # Get top 5 matches
   \`\`\`
This enables fast image retrieval using CLIP and FAISS. 🚀`,
];

export default function ChatSection() {

  const [message, setMessage] = useState("");
  const [index3, setIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
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
    if (autoScroll) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (!chatContainer) return;

      const isNearBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 50;

      setAutoScroll(isNearBottom);
    };

    chatContainer?.addEventListener("scroll", handleScroll);
    return () => chatContainer?.removeEventListener("scroll", handleScroll);
  }, []);


  const handleSend = () => {
    if (message.trim()) {
      const newMessages = [
        ...messages,
        { type: "text", content: message, sender: "user" },
      ];
      setMessages(newMessages);
      setBotTyping(true);
      updateIsPaused(false);
      const botResponse = botMessages[index3];
      setIndex((index3 + 1) );

      let typedMessage = "";
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
      }, 5);
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
        height: '80vh', 
        mt: 5,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* <Box>
        <Typography variant="h6" fontWeight="bold">
          {historyItem || "New chat"}
        </Typography>
      </Box> */}
      <Box
      ref={chatContainerRef}
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
                onClick={() =>
                  (window.location.href =
                    "/learning/course?section=quizzes&historyItem=overview")
                }
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
                onClick={() =>
                  (window.location.href =
                    "/learning/course?section=studyGuides&historyItem=overview")
                }
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
                onClick={() =>
                  (window.location.href =
                    "/learning/course?section=learningByVideo&historyItem=video2")
                }
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
              backgroundColor: msg.sender === "user" ? "#C0C0C0" : "#F5F5F5",
              color: "#000",
              p: 1.5,
              m: 1,
              borderRadius: "15px",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.type === "text" ? (
              msg.sender === "bot" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}  components={{
                  p: ({ ...props }) => <span {...props} />,
                }}
                sx={{
                  "& p": { margin: 0, padding: 0, lineHeight: 1 },
                  "& pre": { margin: 0, padding: 0, lineHeight: 1 },
                  "& li": { marginBottom: 0 },
                }}>
                {msg.content}
              </ReactMarkdown>
              ) : (
                <Typography>{msg.content}</Typography>
              )
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
          border: "1px solid #ccc",
        }}
      >
        <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            placeholder="Upload file, add image or type a question..."
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{
              ml: 5,
              "& .MuiInput-underline:before": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "none !important",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "none !important",
              },
              "& .MuiInputBase-root": { boxShadow: "none" },
            }}
            disabled={botTyping}
          />

          <Stack direction="row" sx={{ width: "100%" }}>
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
            <IconButton
              component="label"
              htmlFor="image-upload"
              
            >
              <ImageIcon/>
            </IconButton>
            <IconButton sx={{ mr: "auto" }}>
              <MicIcon />
            </IconButton>
            <IconButton
              onClick={botTyping ? handlePause : handleSend}
              disabled={!message.trim() && !botTyping}
            >
              {botTyping ? <PauseIcon /> : <SendIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
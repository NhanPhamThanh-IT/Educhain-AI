import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Stack, Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import PauseIcon from "@mui/icons-material/Pause";
import MicIcon from "@mui/icons-material/Mic";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { InitialChatMessage } from "./initial-chat-message";
import { botMessages } from "../constants";

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

  const updateIsPaused = (value) => {
    isPausedRef.current = value;
    setIsPaused(value);
  };

  const typingIntervalRef = useRef(null);
  const scrollToBottom = () => {
    if (autoScroll) messageRef.current?.scrollIntoView({ behavior: "smooth" });
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
      // Gửi tin nhắn của người dùng
      const userMsg = { type: "text", content: message, sender: "user" };
      setMessages((prev) => [...prev, userMsg]);
      setMessage("");

      // Lấy phản hồi của bot và tăng index
      const botResponse = botMessages[index3];
      setIndex(index3 + 1);

      // Với tin nhắn bot đầu tiên thì hiển thị hiệu ứng gõ chữ ngay lập tức
      if (index3 === 0) {
        setBotTyping(true);
        updateIsPaused(false);

        // Thêm tin nhắn trống để làm khung cho hiệu ứng gõ chữ
        const typingMsg = { type: "text", content: "", sender: "bot" };
        setMessages((prev) => [...prev, typingMsg]);

        let typedMessage = "";
        let indexChar = 0;
        const interval = setInterval(() => {
          if (!isPausedRef.current && indexChar < botResponse.length) {
            typedMessage += botResponse[indexChar];
            // Cập nhật tin nhắn cuối (tin nhắn trống sẽ được thay thế)
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { type: "text", content: typedMessage, sender: "bot" };
              return newMessages;
            });
            indexChar++;
          } else if (indexChar >= botResponse.length) {
            clearInterval(interval);
            setBotTyping(false);
          }
        }, 5); // Thay đổi khoảng delay nếu cần
        typingIntervalRef.current = interval;
      } else {
        // Với các tin nhắn bot sau thì hiển thị "Thinking..." trước khi bắt đầu hiệu ứng gõ chữ
        setBotTyping(true);
        updateIsPaused(false);

        const thinkingMsg = { type: "text", content: "Thinking...", sender: "bot" };
        setMessages((prev) => [...prev, thinkingMsg]);

        setTimeout(() => {
          let typedMessage = "";
          let indexChar = 0;
          const interval = setInterval(() => {
            if (!isPausedRef.current && indexChar < botResponse.length) {
              typedMessage += botResponse[indexChar];
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { type: "text", content: typedMessage, sender: "bot" };
                return newMessages;
              });
              indexChar++;
            } else if (indexChar >= botResponse.length) {
              clearInterval(interval);
              setBotTyping(false);
            }
          }, 5); // Thay đổi khoảng delay nếu cần
          typingIntervalRef.current = interval;
        }, 2000); // Delay 2 giây hiển thị "Thinking..."
      }
    }
  };

  const handlePause = () => {
    clearInterval(typingIntervalRef.current);
    setBotTyping(false);
    setIsPaused(true);
  };

  return (
    <Box sx={{ height: "80vh", mt: 5, display: "flex", flexDirection: "column", width: "100%" }}>
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
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.length === 0 && <InitialChatMessage setMessage={setMessage} />}
        {messages.map((msg, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            sx={{
              alignItems: "flex-start",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.sender === "bot" && (
              <Avatar sx={{ bgcolor: "#F5F5F5", color: "#000" }}>
                <SmartToyIcon />
              </Avatar>
            )}
            <Box
              sx={{
                maxWidth: "75%",
                backgroundColor: msg.sender === "user" ? "#C0C0C0" : "#F5F5F5",
                color: "#000",
                py: 1,
                px: 2,
                m: 1,
                borderRadius: "15px",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.type === "text" ? (
                msg.sender === "bot" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      p: ({ node, ...props }) => <p {...props} style={{ margin: 0, padding: 0 }} />,
                      pre: ({ node, ...props }) => <pre {...props} style={{ margin: 0, padding: 0 }} />,
                      h2: ({ node, ...props }) => <h2 {...props} style={{ margin: 1, padding: 0 }} />,
                      strong: ({ node, ...props }) => <strong {...props} style={{ margin: 0, padding: 0 }} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <Typography>{msg.content}</Typography>
                )
              ) : (
                <Box>
                  <Typography>{msg.content.name}</Typography>
                  <Typography variant="caption">{msg.content.size}</Typography>
                  <IconButton component="a" href={msg.content.url} download={msg.content.name}>
                    <DownloadIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
            {msg.sender === "user" && (
              <Avatar sx={{ bgcolor: "#C0C0C0", color: "#000" }}>
                <PersonIcon />
              </Avatar>
            )}
          </Stack>
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
            disabled={botTyping}
          />
          <Stack direction="row" sx={{ width: "100%" }}>
            <IconButton component="label" htmlFor="file-upload">
              <AttachFileIcon />
            </IconButton>
            <IconButton component="label" htmlFor="image-upload">
              <ImageIcon />
            </IconButton>
            <IconButton sx={{ mr: "auto" }}>
              <MicIcon />
            </IconButton>
            <IconButton onClick={botTyping ? handlePause : handleSend} disabled={!message.trim() && !botTyping}>
              {botTyping ? <PauseIcon /> : <SendIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

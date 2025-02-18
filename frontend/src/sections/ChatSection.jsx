import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";


export default function ChatSection() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);
  
    const scrollToBottom = () => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    // Xử lý gửi tin nhắn
    const handleSend = () => {
      if (message.trim()) {
        const newMessages = [
          ...messages,
          { type: "text", content: message, sender: "user" },
          { type: "text", content: "Tôi có thể giúp gì bạn?", sender: "bot" },
        ];
        setMessages(newMessages);
        setMessage("");
      }
    };
  
    // Xử lý khi chọn file
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
          { type: "text", content: "Tôi có thể giúp gì bạn?", sender: "bot" },
        ];
        setMessages(newMessages);
      }
    };
  
    return (
      <Box
        sx={{
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 3,
          height: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Khung tin nhắn */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              display: "none", // Ẩn trên Chrome, Safari
            },
          }}
        >
          {messages.length === 0 && (
            <Typography align="center" color="gray">
              Ask something...
            </Typography>
          )}
  
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: "75%",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#2196f3" : "#fff",
                color: msg.sender === "user" ? "#fff" : "#000",
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
  
        {/* Input chat */}
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
          />
  
          <IconButton onClick={handleSend} disabled={!message.trim()}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
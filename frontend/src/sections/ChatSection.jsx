import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import PauseIcon from "@mui/icons-material/Pause";

export default function ChatSection() {
  const [params] = useSearchParams();
  const historyItem = params.get("historyItem");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);
  const chatSuggestions = [
    "Compare Moodle and Shub?",
    "LLM and LNP?",
    "AI?",
    "Những rủi ro của AI là gì?",
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
  const handleSend = (msg = "") => {
    if (msg.trim()) {
      const newMessages = [
        ...messages,
        { type: "text", content: msg, sender: "user" },
      ];
      setMessages(newMessages);
      setMessage("");
      setBotTyping(true);
      updateIsPaused(false);
      let botResponse =
        "Trong thời đại công nghệ phát triển mạnh mẽ như hiện nay, trí tuệ nhân tạo (AI) đang dần thay đổi cách con người sống và làm việc.\n AI không chỉ được ứng dụng trong các lĩnh vực như y tế, tài chính, giáo dục, mà còn xuất hiện trong đời sống hằng ngày, từ trợ lý ảo cho đến hệ thống gợi ý nội dung trên các nền tảng mạng xã hội. Một trong những ứng dụng phổ biến nhất của AI là chatbot – các chương trình có khả năng giao tiếp với con người một cách tự nhiên. Nhờ vào các thuật toán xử lý ngôn ngữ tự nhiên (NLP), chatbot ngày càng thông minh hơn, có thể hiểu và phản hồi các câu hỏi phức tạp. Điều này giúp giảm tải công việc cho con người, đặc biệt trong lĩnh vực chăm sóc khách hàng.Tuy nhiên, bên cạnh những lợi ích rõ ràng, AI cũng đặt ra nhiều thách thức. Vấn đề đạo đức trong việc sử dụng dữ liệu cá nhân, nguy cơ mất việc làm do tự động hóa, hay sự phụ thuộc quá mức vào công nghệ là những điều cần được quan tâm. Vì vậy, việc phát triển AI một cách có trách nhiệm và cân bằng là vô cùng quan trọng để đảm bảo công nghệ này phục v";
      let typedMessage = "";
      let index = 0;

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
      }, 15);
    } else if (message.trim()) {
      const newMessages = [
        ...messages,
        { type: "text", content: message, sender: "user" },
      ];
      setMessages(newMessages);
      setMessage("");
      setBotTyping(true);
      updateIsPaused(false);
      let botResponse =
        "Trong thời đại công nghệ phát triển mạnh mẽ như hiện nay, trí tuệ nhân tạo (AI) đang dần thay đổi cách con người sống và làm việc.\n AI không chỉ được ứng dụng trong các lĩnh vực như y tế, tài chính, giáo dục, mà còn xuất hiện trong đời sống hằng ngày, từ trợ lý ảo cho đến hệ thống gợi ý nội dung trên các nền tảng mạng xã hội. Một trong những ứng dụng phổ biến nhất của AI là chatbot – các chương trình có khả năng giao tiếp với con người một cách tự nhiên. Nhờ vào các thuật toán xử lý ngôn ngữ tự nhiên (NLP), chatbot ngày càng thông minh hơn, có thể hiểu và phản hồi các câu hỏi phức tạp. Điều này giúp giảm tải công việc cho con người, đặc biệt trong lĩnh vực chăm sóc khách hàng.Tuy nhiên, bên cạnh những lợi ích rõ ràng, AI cũng đặt ra nhiều thách thức. Vấn đề đạo đức trong việc sử dụng dữ liệu cá nhân, nguy cơ mất việc làm do tự động hóa, hay sự phụ thuộc quá mức vào công nghệ là những điều cần được quan tâm. Vì vậy, việc phát triển AI một cách có trách nhiệm và cân bằng là vô cùng quan trọng để đảm bảo công nghệ này phục vụ lợi ích của con người một cách tối ưu.";
      let typedMessage = "";
      let index = 0;

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
      }, 15);
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
                    onClick={() => handleSend(suggestion)}
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

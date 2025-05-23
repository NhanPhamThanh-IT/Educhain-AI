import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Stack, Avatar, useTheme, alpha } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { 
  RiSendPlaneFill, 
  RiAttachment2, 
  RiImageAddLine,
  RiMicLine,
  RiPauseFill,
  RiDownload2Line,
  RiRobot2Line,
  RiUser3Line
} from "react-icons/ri";
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
  const theme = useTheme();

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
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "flex-start",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                {msg.sender === "bot" && (
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <RiRobot2Line size={24} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "75%",
                    backgroundColor: msg.sender === "user" 
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: "blur(8px)",
                    color: theme.palette.text.primary,
                    py: 1.5,
                    px: 2.5,
                    borderRadius: "15px",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    boxShadow: theme.shadows[1],
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[2],
                    },
                    "& pre": {
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: "blur(8px)",
                      borderRadius: "8px",
                      padding: "12px",
                      margin: "8px 0",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": {
                        height: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: alpha(theme.palette.background.paper, 0.1),
                        borderRadius: "3px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: alpha(theme.palette.primary.main, 0.2),
                        borderRadius: "3px",
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.3),
                        },
                      },
                    },
                    "& code": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontSize: "0.9em",
                    },
                    "& p": {
                      margin: "8px 0",
                      lineHeight: 1.6,
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      margin: "16px 0 8px",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                    "& ul, & ol": {
                      margin: "8px 0",
                      paddingLeft: "20px",
                    },
                    "& li": {
                      margin: "4px 0",
                    },
                    "& blockquote": {
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      margin: "8px 0",
                      padding: "8px 16px",
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: "4px",
                    },
                    "& a": {
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                    "& table": {
                      borderCollapse: "collapse",
                      width: "100%",
                      margin: "8px 0",
                      "& th, & td": {
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        padding: "8px",
                        textAlign: "left",
                      },
                      "& th": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        fontWeight: 600,
                      },
                      "& tr:nth-of-type(even)": {
                        backgroundColor: alpha(theme.palette.background.paper, 0.4),
                      },
                    },
                    "& img": {
                      maxWidth: "100%",
                      borderRadius: "8px",
                      margin: "8px 0",
                    },
                  }}
                >
                  {msg.type === "text" ? (
                    msg.sender === "bot" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          p: ({ ...props }) => <p {...props} style={{ margin: 0, padding: 0 }} />,
                          pre: ({ ...props }) => <pre {...props} style={{ margin: 0, padding: 0 }} />,
                          h2: ({ ...props }) => <h2 {...props} style={{ margin: 1, padding: 0 }} />,
                          strong: ({ ...props }) => <strong {...props} style={{ margin: 0, padding: 0 }} />,
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
                      <IconButton 
                        component="a" 
                        href={msg.content.url} 
                        download={msg.content.name}
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          }
                        }}
                      >
                        <RiDownload2Line size={24} />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                {msg.sender === "user" && (
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <RiUser3Line size={24} />
                  </Avatar>
                )}
              </Stack>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messageRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(8px)",
          borderRadius: 3,
          mt: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: theme.shadows[1],
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: theme.shadows[2],
            borderColor: alpha(theme.palette.primary.main, 0.2),
          },
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
            sx={{
              "& .MuiInputBase-root": {
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              },
            }}
          />
          <Stack direction="row" sx={{ width: "100%" }}>
            <IconButton 
              component="label" 
              htmlFor="file-upload"
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <RiAttachment2 size={24} />
            </IconButton>
            <IconButton 
              component="label" 
              htmlFor="image-upload"
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <RiImageAddLine size={24} />
            </IconButton>
            <IconButton 
              sx={{ 
                mr: "auto",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              <RiMicLine size={24} />
            </IconButton>
            <IconButton 
              onClick={botTyping ? handlePause : handleSend} 
              disabled={!message.trim() && !botTyping}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }
              }}
            >
              {botTyping ? <RiPauseFill size={24} /> : <RiSendPlaneFill size={24} />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

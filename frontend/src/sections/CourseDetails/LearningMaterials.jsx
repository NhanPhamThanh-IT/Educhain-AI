// Desc: This file contains the LearningMaterialsSection component that displays categorized learning materials in an expandable list format.

// Importing react components
import React, { useState } from "react";

// Importing Material-UI components
import {
    Box,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Button,
} from "@mui/material";

// Importing lucide icons
import {
    ChevronDown,
    FileText,
    BookOpen,
    CheckCircle,
    PlayCircle,
    MoreHorizontal,
    ChevronUp
} from "lucide-react";

// Importing framer-motion
import { motion } from "framer-motion";

// Component to display categorized learning materials
const LearningMaterialsSection = ({ list_documents = [], list_lessons = [], list_quizzes = [], list_videos = [] }) => {
    // Define categories with corresponding icons and data
    const categories = [
        { name: "Documents", data: list_documents, icon: <FileText size={22} strokeWidth={1.5} color="#365ACA" /> },
        { name: "Lessons", data: list_lessons, icon: <BookOpen size={22} strokeWidth={1.5} color="#4CAF50" /> },
        { name: "Quizzes", data: list_quizzes, icon: <CheckCircle size={22} strokeWidth={1.5} color="#FF9800" /> },
        { name: "Videos", data: list_videos, icon: <PlayCircle size={22} strokeWidth={1.5} color="#E91E63" /> },
    ];

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#365ACA", mb: 2 }}>
                Learning Materials
            </Typography>
            {categories.map(({ name, data, icon }) => (
                <ExpandableList key={name} name={name} data={data} icon={icon} />
            ))}
        </Box>
    );
};

// Component for an expandable list of learning materials
const ExpandableList = ({ name, data, icon }) => {
    const [expanded, setExpanded] = useState(false);

    // Toggle expansion state
    const handleToggleExpand = () => setExpanded(!expanded);

    return (
        <Accordion
            sx={{
                bgcolor: "#f8f8f8",
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                mb: 1,
                "&::before": { display: "none" }, // Remove default shadow border of Accordion
                "&:first-of-type": { borderTopLeftRadius: "12px", borderTopRightRadius: "12px" },
                "&:last-of-type": { borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }
            }}
        >
            <AccordionSummary
                expandIcon={<ChevronDown size={20} strokeWidth={1.5} />}
                sx={{
                    borderBottom: "none", // Remove border between summary & details
                    "& .MuiAccordionSummary-content": { my: 1 }, // Adjust spacing for better alignment
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {icon}
                    <Typography fontWeight="bold">{name}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ borderTop: "none", p: 2, borderRadius: "0 0 12px 12px" }}> {/* Remove top border */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <List>
                        {/* Display first two items by default */}
                        {data.slice(0, 2).map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ variant: "body1" }} />
                                </ListItem>
                                {index < data.length - 1 && <Divider sx={{ my: 1, borderColor: "#E0E0E0" }} />}
                            </React.Fragment>
                        ))}

                        {/* Show expandable content if more than two items exist */}
                        {data.length > 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {expanded ? (
                                    <>
                                        {/* Display remaining items when expanded */}
                                        {data.slice(2).map((item, index) => (
                                            <ListItem key={index + 2}>
                                                <ListItemIcon>{icon}</ListItemIcon>
                                                <ListItemText primary={item} primaryTypographyProps={{ variant: "body1" }} />
                                            </ListItem>
                                        ))}
                                        <Button
                                            onClick={handleToggleExpand}
                                            startIcon={<ChevronUp size={18} />}
                                            sx={{
                                                color: "#FF5733",
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                mx: "auto",
                                                display: "flex",
                                                mt: 1,
                                            }}
                                        >
                                            Show Less
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={handleToggleExpand}
                                        startIcon={<MoreHorizontal size={18} />}
                                        sx={{
                                            color: "#365ACA",
                                            fontWeight: "bold",
                                            textTransform: "none",
                                            mx: "auto",
                                            display: "flex",
                                            mt: 1,
                                        }}
                                    >
                                        Show More
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </List>
                </motion.div>
            </AccordionDetails>
        </Accordion>
    );
};

export default LearningMaterialsSection;

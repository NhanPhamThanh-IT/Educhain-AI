// Import React & MUI
import React, { useState, useCallback, useEffect } from "react";
import {
    List, ListItem, ListItemIcon, ListItemText, Button, Typography, IconButton,
    Dialog, DialogContent, DialogTitle, TextField, Box
} from "@mui/material";
import { File, Video, Eye, Trash2, Upload, X, MoreVertical } from "lucide-react";

const MAX_FILES_DISPLAY = 2;

const CourseMaterials = ({ learningMaterials, setCourseData }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [urlInput, setUrlInput] = useState("");
    const [openModal, setOpenModal] = useState(false);

    // Handle File Upload
    const handleFileUpload = useCallback((event) => {
        if (urlInput.trim()) return;
        const files = Array.from(event.target.files);

        const newMaterials = files.map((file) => ({
            name: file.name,
            type: file.type.includes("video") ? "Video" : "PDF",
            url: URL.createObjectURL(file),
        }));

        setCourseData("learningMaterials", [...learningMaterials, ...newMaterials]);
    }, [urlInput, learningMaterials, setCourseData]);

    // Cleanup created URLs
    useEffect(() => {
        return () => {
            learningMaterials.forEach(material => {
                if (material.url.startsWith("blob:")) {
                    URL.revokeObjectURL(material.url);
                }
            });
        };
    }, [learningMaterials]);

    // Handle Add URL
    const handleAddUrl = useCallback(() => {
        if (!urlInput.trim()) return;

        const isVideo = urlInput.match(/\.(mp4|webm|ogg)$/i) || urlInput.includes("youtube.com") || urlInput.includes("vimeo.com");
        setCourseData("learningMaterials", [...learningMaterials, { name: urlInput, type: isVideo ? "Video" : "PDF", url: urlInput }]);
        setUrlInput("");
    }, [urlInput, learningMaterials, setCourseData]);

    // Handle Delete Material
    const handleDeleteMaterial = useCallback((index) => {
        setCourseData("learningMaterials", learningMaterials.filter((_, i) => i !== index));
    }, [learningMaterials, setCourseData]);

    // Handle File Preview
    const handlePreviewFile = useCallback((file) => setPreviewFile(file), []);
    const handleClosePreview = useCallback(() => setPreviewFile(null), []);

    // Render Material Item
    const renderMaterialItem = (material, index) => (
        <ListItem key={index} secondaryAction={
            <>
                <IconButton onClick={() => handlePreviewFile(material)} title="Preview">
                    <Eye size={20} color="#1976d2" />
                </IconButton>
                <IconButton onClick={() => handleDeleteMaterial(index)} title="Delete">
                    <Trash2 size={20} color="#e53935" />
                </IconButton>
            </>
        }>
            <ListItemIcon>
                {material.type === "PDF" ? <File size={20} color="#1976d2" /> : <Video size={20} color="#1976d2" />}
            </ListItemIcon>
            <ListItemText primary={material.name} secondary={material.type} />
        </ListItem>
    );

    return (
        <>
            {/* Title */}
            <Typography sx={styles.title}>
                Learning Materials ({learningMaterials.length} files)
            </Typography>

            {/* Materials List */}
            <List>
                {learningMaterials.slice(0, MAX_FILES_DISPLAY).map(renderMaterialItem)}
            </List>

            {/* View More Button */}
            {learningMaterials.length > MAX_FILES_DISPLAY && (
                <Button
                    startIcon={<MoreVertical size={20} />}
                    onClick={() => setOpenModal(true)}
                    sx={styles.viewAllButton}
                >
                    View All Materials
                </Button>
            )}

            {/* Upload & URL Input */}
            <Box display="flex" gap={1}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Paste URL or Upload File"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    sx={styles.textField}
                />
                <Button variant="contained" sx={styles.addButton} onClick={handleAddUrl} disabled={!urlInput.trim()}>
                    Add
                </Button>
                <Button variant="contained" sx={styles.uploadButton} component="label">
                    <Upload size={20} />
                    <input type="file" accept=".pdf,video/*" hidden onChange={handleFileUpload} disabled={urlInput.trim().length > 0} />
                </Button>
            </Box>

            {/* Dialog: View All Materials */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Materials List ({learningMaterials.length} files)
                    <IconButton onClick={() => setOpenModal(false)} sx={styles.closeButton}>
                        <X size={20} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <List>
                        {learningMaterials.map(renderMaterialItem)}
                    </List>
                </DialogContent>
            </Dialog>

            {/* Dialog: File Preview */}
            <Dialog open={Boolean(previewFile)} onClose={handleClosePreview} maxWidth="md" fullWidth>
                <DialogContent>
                    <IconButton onClick={handleClosePreview} sx={styles.closeButton}>
                        <X size={20} />
                    </IconButton>
                    {previewFile?.url ? (
                        previewFile.type === "PDF" ? (
                            <iframe src={previewFile.url} width="100%" height="500px" title="PDF Preview"></iframe>
                        ) : (
                            <video controls width="100%">
                                <source src={previewFile.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )
                    ) : (
                        <Typography textAlign="center">No preview available</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

// Styles Object
const styles = {
    title: { fontWeight: 600, color: "rgba(54, 90, 202, 1)" },
    viewAllButton: { mb: 1, color: "rgba(54, 90, 202, 1)", textTransform: "capitalize" },
    textField: {},
    addButton: { bgcolor: "rgba(54, 90, 202, 1)", fontWeight: "bold" },
    uploadButton: { bgcolor: "rgba(54, 90, 202, 1)", minWidth: 50 },
    closeButton: { position: "absolute", top: 10, right: 10 },
};

export default CourseMaterials;
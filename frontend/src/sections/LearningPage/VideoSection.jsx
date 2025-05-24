import { Typography } from "@mui/material";

function VideoSection() {
  return (
    <>
      <Typography variant="h6">Learning by Video</Typography>
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default VideoSection;
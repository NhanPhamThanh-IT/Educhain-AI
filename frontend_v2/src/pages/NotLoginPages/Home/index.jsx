import { useRef, lazy } from "react";
import { Box, Container } from "@mui/material";
import LazyLoadWrapper from "@components/ui/LazyLoadWrapper";

// Lazy load components with code splitting
const Introduction = lazy(() => import("./sections/Introduction"));
const VideoDemo = lazy(() => import("./sections/VideoDemo.jsx"));
const Features = lazy(() => import("./sections/Features.jsx"));
const Usecases = lazy(() => import("./sections/Usecases.jsx"));
const LastSection = lazy(() => import("./sections/LastSection.jsx"));

const HomePage = () => {
  const featuresRef = useRef(null);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} bgcolor={"rgb(245,245,245)"} pt={7} pb={15}>
      <LazyLoadWrapper height={300}>
        <Introduction />
      </LazyLoadWrapper>
      <LazyLoadWrapper height={400}>
        <VideoDemo />
      </LazyLoadWrapper>
      <Box ref={featuresRef} id="features">
        <LazyLoadWrapper height={400}>
          <Features />
        </LazyLoadWrapper>
      </Box>
      <LazyLoadWrapper height={500}>
        <Usecases />
      </LazyLoadWrapper>
      <LazyLoadWrapper height={300}>
        <LastSection />
      </LazyLoadWrapper>
    </Container>
  );
};

export default HomePage;
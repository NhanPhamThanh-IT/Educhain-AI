import { useRef, lazy, Suspense } from "react";
import { Box, Container, CircularProgress } from "@mui/material";

// Lazy load components
const Introduction = lazy(() => import("./sections/Introduction"));
const VideoDemo = lazy(() => import("./sections/VideoDemo.jsx"));
const Features = lazy(() => import("./sections/Features.jsx"));
const Usecases = lazy(() => import("./sections/Usecases.jsx"));
const LastSection = lazy(() => import("./sections/LastSection.jsx"));

const HomePage = () => {
  const featuresRef = useRef(null);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} bgcolor={"rgb(245,245,245)"} pt={7} pb={15}>
      <Suspense fallback={<CircularProgress />}>
        <Introduction />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <VideoDemo />
      </Suspense>
      <Box ref={featuresRef} id="features">
        <Suspense fallback={<CircularProgress />}>
          <Features />
        </Suspense>
      </Box>
      <Suspense fallback={<CircularProgress />}>
        <Usecases />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <LastSection />
      </Suspense>
    </Container>
  );
};

export default HomePage;
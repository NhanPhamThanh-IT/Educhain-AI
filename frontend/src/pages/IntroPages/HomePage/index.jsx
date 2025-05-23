import { useRef, lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import Page from "@components/Page";

// Lazy load components
const Introduction = lazy(() => import("./sections/Introduction"));
const VideoDemo = lazy(() => import("./sections/VideoDemo.jsx"));
const Features = lazy(() => import("./sections/Features.jsx"));
const Usecases = lazy(() => import("@sections/Intro/Usecases/index"));
const LastSection = lazy(() => import("@sections/Intro/LastSection/index"));

const HomePage = () => {
    const featuresRef = useRef(null);

    return (
        <Page title="Homepage">
            <Box maxWidth="2xl" bgcolor={"rgb(245,245,245)"} pt={7} pb={15}>
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
            </Box>
        </Page>
    );
};

export default HomePage;

import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const IntroSection = lazy(() => import("./Intro"));
const CategorySection = lazy(() => import("./Categories"));
const ListCourses = lazy(() => import("./ListCourses"));

const LoadingComponent = () => (
    <Container maxWidth="xl" sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress size={50} />
    </Container>
);

const Market = () => {
    return (
        <Box>
            <Suspense fallback={<LoadingComponent />}>
                <IntroSection />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <CategorySection />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <ListCourses title="Highly Recommended Courses" subcontent="Edunity Course Student Can Join With Us!" />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <ListCourses title="Courses For You" subcontent="Course Tailored Just For You!" />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <ListCourses title="Top Popular Course" subcontent="Course Tailored Just For You!" />
            </Suspense>
        </Box>
    );
};

export default Market;
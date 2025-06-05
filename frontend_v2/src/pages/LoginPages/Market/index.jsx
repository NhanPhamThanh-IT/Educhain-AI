import { lazy } from "react";
import { Box } from "@mui/material";
import LazyLoadWrapper from "@components/ui/LazyLoadWrapper";

// Lazy loading for market sections with improved chunk naming
const IntroSection = lazy(() => 
  import(/* webpackChunkName: "market-intro" */ "./Intro")
);
const CategorySection = lazy(() => 
  import(/* webpackChunkName: "market-categories" */ "./Categories")
);
const ListCourses = lazy(() => 
  import(/* webpackChunkName: "market-courses" */ "./ListCourses")
);

const Market = () => {
    return (
        <Box>
            <LazyLoadWrapper height={300}>
                <IntroSection />
            </LazyLoadWrapper>
            <LazyLoadWrapper height={200}>
                <CategorySection />
            </LazyLoadWrapper>
            <LazyLoadWrapper height={500}>
                <ListCourses title="Highly Recommended Courses" subcontent="Edunity Course Student Can Join With Us!" />
            </LazyLoadWrapper>
            <LazyLoadWrapper height={500}>
                <ListCourses title="Courses For You" subcontent="Course Tailored Just For You!" />
            </LazyLoadWrapper>
            <LazyLoadWrapper height={500}>
                <ListCourses title="Top Popular Course" subcontent="Course Tailored Just For You!" />
            </LazyLoadWrapper>
        </Box>
    );
};

export default Market;
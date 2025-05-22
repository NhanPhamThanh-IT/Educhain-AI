import { useRef } from "react";
import { Box } from "@mui/material";
import Page from "@components/Page";

import Introduction from "@sections/Intro/Introduction/index";
import VideoDemo from "./VideoDemo.jsx";
import Features from "@sections/Intro/Features/index";
import Usecases from "@sections/Intro/Usecases/index";
import LastSection from "@sections/Intro/LastSection/index";

const HomePage = () => {
    const featuresRef = useRef(null);

    return (
        <Page title="Homepage">
            <Box maxWidth="2xl" bgcolor={"rgb(245,245,245)"} pt={8} pb={15}>
                <Introduction />
                <VideoDemo />
                <Box ref={featuresRef} id="features">
                    <Features />
                </Box>
                <Usecases />
                <LastSection />
            </Box>
        </Page>
    );
};

export default HomePage;

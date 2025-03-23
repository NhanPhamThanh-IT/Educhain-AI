import { Tabs, Tab, Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll"; // Import scroller từ react-scroll
import { tabData } from "./constants";

const DesktopNavigation = () => {
    const navigate = useNavigate();

    const handleScroll = (section_id) => {
        scroller.scrollTo(section_id, {
            duration: 500,
            smooth: true,
        });
    };

    return (
        <Hidden mdDown>
            <Tabs textColor="primary" indicatorColor="primary" sx={{ flexGrow: 1, ml: 3 }}>
                {tabData.map(({ label, link, section_id }) => (
                    <Tab
                        key={label}
                        label={label}
                        onClick={() => {
                            if (link === null) {
                                handleScroll(section_id); // Cuộn đến section khi link === null
                            } else {
                                navigate(link); // Điều hướng trang khi có link
                            }
                        }}
                        sx={{
                            textTransform: "none",
                            color: "#000",
                            transition: "all 0.3s",
                            "&:hover": { color: "#F5A623", textShadow: "0px 0px 10px rgba(245, 166, 35, 0.5)" },
                        }}
                    />
                ))}
            </Tabs>
        </Hidden>
    );
};

export default DesktopNavigation;

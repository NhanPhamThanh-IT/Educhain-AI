import { Tabs, Tab, Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tabData } from "../../../constants/Header/constants";

const DesktopNavigation = ({ elevated }) => {
    const navigate = useNavigate();

    return (
        <Hidden mdDown>
            <Tabs textColor="primary" indicatorColor="primary" sx={{ flexGrow: 1, ml: 3 }}>
                {tabData.map(({ label, link }) => (
                    <Tab key={link} label={label} onClick={() => navigate(link)}
                        sx={{
                            color: elevated ? "#fff" : "#000",
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

import { useState, useEffect, useCallback, useMemo } from "react";

export const useAppBarLogic = () => {
    const [elevated, setElevated] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setElevated(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = useCallback((event) => {
        setMenuAnchor(menuAnchor ? null : event.currentTarget);
    }, [menuAnchor]);

    const toggleDrawer = useCallback((state) => () => {
        setDrawerOpen(state);
    }, []);

    const appBarStyle = useMemo(() => ({
        color: "black",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
        backdropFilter: "none",
        py: 2.5,
        borderBottom: "none",
    }), [elevated]);

    return { elevated, menuAnchor, drawerOpen, toggleMenu, toggleDrawer, appBarStyle };
};

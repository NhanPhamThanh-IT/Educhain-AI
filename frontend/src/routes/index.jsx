import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { TOKEN_ICO_Context } from "../context/index.jsx";
import SuspenseWrapper from '../components/SuspenseWrapper';
import {
    CreateCourse,
    CourseDetails,
    MyLearningPage,
    LeaderBoard,
    Market,
    AllCourses,
    HomePage,
    AboutUs,
    DepositAndEarn,
    MissionPage,
    ExchangeCoin,
    ProfileSetup,
    LearningPage,
    DocsPage
} from '../components/lazyComponents';

import AppBarComponent from "../components/Partials/Header/Index";
import FooterComponent from "../components/Partials/Footer";
import Test from "../pages/test";

export const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
    const {
        TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
        UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
        TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
        CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
        addTokenToMetaMask, TOKEN_ADDRESS, loader,
        account, currency, notifySuccess, notifyError
    } = useContext(TOKEN_ICO_Context);

    const [ownerModel, setOwnerModel] = useState(false);
    const [buyModel, setBuyModel] = useState(false);
    const [transferModel, setTransferModel] = useState(false);
    const [transferCurrency, setTransferCurrency] = useState(false);
    const [openDonate, setOpenDonate] = useState(false);
    const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
    const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
    const [detail, setDetail] = useState(null);
    const [totalClaimed, setTotalClaimed] = useState(0);
    const [missionClaims, setMissionClaims] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const ico = await TOKEN_ICO();
            const erc20 = await ERC20(TOKEN_ADDRESS);
            setDetail(ico);
        };
        fetchData();
    }, [account]);

    const contextValue = {
        ownerModel, setOwnerModel,
        buyModel, setBuyModel,
        transferModel, setTransferModel,
        transferCurrency, setTransferCurrency,
        openDonate, setOpenDonate,
        openUpdatePrice, setOpenUpdatePrice,
        openUpdateAddress, setOpenUpdateAddress,
        detail, setDetail,
        account, setAccount,
        CONNECT_WALLET,
        BUY_TOKEN, ERC20, TOKEN_ADDRESS,
        setLoader, currency,
        addTokenToMetaMask,
        notifySuccess,
        notifyError,
        totalClaimed,
        setTotalClaimed,
        missionClaims,
        setMissionClaims,
    };

    return (
        <RouterContext.Provider value={contextValue}>
            {children}
        </RouterContext.Provider>
    );
};

const MainLayout = ({ children, displayHeader = true, displayFooter = true }) => {
    return (
        <>
            {displayHeader && <AppBarComponent />}
            <SuspenseWrapper>
                {children}
            </SuspenseWrapper>
            {displayFooter && <FooterComponent />}
        </>
    );
};

const routes = [
    {
        path: "*",
        children: [
            { path: "about-us", element: <MainLayout><AboutUs /></MainLayout> },
            { path: "*", element: <Navigate to="/404" replace /> },
        ],
    },
    { path: "/", element: <Navigate to="/homepage" replace /> },
    { path: "homepage", element: <MainLayout><HomePage /></MainLayout> },
    { path: "docs", element: <MainLayout><DocsPage /></MainLayout> },
    { path: "deposit-and-earn", element: <MainLayout><DepositAndEarn /></MainLayout> },
    {
        path: "mylearning",
        children: [
            { path: "", element: <MainLayout><MyLearningPage /></MainLayout> },
        ],
    },
    { path: "allcourse", element: <MainLayout><AllCourses /></MainLayout> },
    { path: "market", element: <MainLayout><Market /></MainLayout> },
    { path: "coursedetails", element: <MainLayout><CourseDetails /></MainLayout> },
    {
        path: "learning",
        children: [
            { path: "", element: <Navigate to="/learning/course" replace /> },
            { path: "leaderboard", element: <MainLayout><LeaderBoard /></MainLayout> },
            { path: "mission", element: <MainLayout><MissionPage /></MainLayout> },
            { path: "course", element: <LearningPage /> },
            { path: "createcourse", element: <MainLayout><CreateCourse /></MainLayout> },
            { path: "exchange", element: <MainLayout><ExchangeCoin /></MainLayout> }
        ],
    },
    { path: "profilesetup", element: <MainLayout><ProfileSetup /></MainLayout> },
    { path: "/test", element: <Test /> },
];

export default function Router() {
    const routing = useRoutes(routes);

    return (
        <RouterProvider>
            {routing}
        </RouterProvider>
    );
}

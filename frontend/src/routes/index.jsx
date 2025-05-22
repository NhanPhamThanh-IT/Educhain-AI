import { Suspense, lazy, createContext, useContext, useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { TOKEN_ICO_Context } from "../context/index.jsx";

export const RouterContext = createContext();

import AppBarComponent from "../components/Partials/Header/Index";
import FooterComponent from "../components/Partials/Footer";
import Test from "../pages/test";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const LazyPages = {
  AuthPage: Loadable(lazy(() => import('../pages/authentication/AuthPage'))),
  ForgotPassword: Loadable(lazy(() => import('../pages/authentication/ForgotPassword'))),
  VerifyCode: Loadable(lazy(() => import('../pages/authentication/VerifyCode'))),
  Page500: Loadable(lazy(() => import('../pages/Error/Page500'))),
  Page404: Loadable(lazy(() => import('../pages/Error/Page404'))),
  AboutUs: Loadable(lazy(() => import('../pages/IntroPages/AboutUs/index'))),
  ComingSoon: Loadable(lazy(() => import('../pages/ComingSoon'))),
  Maintenance: Loadable(lazy(() => import('../pages/Maintenance'))),
  HomePage: Loadable(lazy(() => import('../pages/IntroPages/HomePage/index'))),
  MyLearningPage: Loadable(lazy(() => import('../pages/MyLearningPage'))),
  CreateCourse: Loadable(lazy(() => import('../pages/CreateCourse'))),
  Market: Loadable(lazy(() => import('../pages/Market'))),
  CourseDetails: Loadable(lazy(() => import('../pages/CourseDetails'))),
  LearningPage: Loadable(lazy(() => import('../pages/LearningPage/index'))),
  MissionPage: Loadable(lazy(() => import('../pages/MissionPage/index'))),
  LeaderBoard: Loadable(lazy(() => import('../pages/LeaderBoard'))),
  ExchangeCoin: Loadable(lazy(() => import('../pages/ExchangeCoin'))),
  ProfileSetup: Loadable(lazy(() => import('../pages/ProfileSetup'))),
  AllCourses: Loadable(lazy(() => import('../pages/AllCourses'))),
  DepositAndEarn: Loadable(lazy(() => import('../pages/IntroPages/DepositAndEarn/index'))),
};

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
  const context = useContext(RouterContext);

  return (
    <>
      {displayHeader && <AppBarComponent />}
      {children}
      {displayFooter && <FooterComponent />}
    </>
  );
};

const routes = [
  {
    path: "authentication",
    children: [
      { path: "forgot-password", element: <LazyPages.ForgotPassword /> },
      { path: "verify", element: <LazyPages.VerifyCode /> },
      { path: "", element: <LazyPages.AuthPage /> },
    ],
  },
  {
    path: "*",
    children: [
      { path: "coming-soon", element: <LazyPages.ComingSoon /> },
      { path: "maintenance", element: <LazyPages.Maintenance /> },
      { path: "about-us", element: <MainLayout><LazyPages.AboutUs /></MainLayout> },
      { path: "500", element: <LazyPages.Page500 /> },
      { path: "404", element: <LazyPages.Page404 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "/", element: <Navigate to="/homepage" replace /> },
  { path: "homepage", element: <MainLayout><LazyPages.HomePage /></MainLayout> },
  { path: "deposit-and-earn", element: <MainLayout><LazyPages.DepositAndEarn /></MainLayout> },
  {
    path: "mylearning",
    children: [
      { path: "createcourse", element: <MainLayout><LazyPages.CreateCourse /></MainLayout> },
      { path: "", element: <MainLayout><LazyPages.MyLearningPage /></MainLayout> },
    ],
  },
  { path: "allcourse", element: <MainLayout><LazyPages.AllCourses /></MainLayout> },
  { path: "market", element: <MainLayout><LazyPages.Market /></MainLayout> },
  { path: "coursedetails", element: <MainLayout><LazyPages.CourseDetails /></MainLayout> },
  {
    path: "learning",
    children: [
      { path: "", element: <Navigate to="/learning/course" replace /> },
      { path: "leaderboard", element: <MainLayout><LazyPages.LeaderBoard /></MainLayout> },
      { path: "mission", element: <MainLayout><LazyPages.MissionPage /></MainLayout> },
      { path: "course", element: <LazyPages.LearningPage /> },
      { path: "exchange", element: <LazyPages.ExchangeCoin /> }
    ],
  },
  { path: "profilesetup", element: <MainLayout><LazyPages.ProfileSetup /></MainLayout> },
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

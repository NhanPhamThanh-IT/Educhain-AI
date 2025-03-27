// This file is used to define the routes of the application.

// Importing necessary modules
import { Suspense, lazy, createContext, useContext, useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { TOKEN_ICO_Context } from "../context/index.jsx";

// ----------------------------------------------------------------------

// Create Router Context
export const RouterContext = createContext();

// Importing components
import AppBarComponent from "../components/Partials/Header/Index";
import FooterComponent from "../components/Partials/Footer";
import Test from "../pages/test";

// ----------------------------------------------------------------------

// Function to wrap the component with Suspense
const Loadable = (Component) => (props) => (
  <Suspense>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// Importing pages
const pages = {
  AuthPage: "../pages/authentication/AuthPage",
  ForgotPassword: "../pages/authentication/ForgotPassword",
  VerifyCode: "../pages/authentication/VerifyCode",
  Page500: "../pages/Error/Page500",
  Page404: "../pages/Error/Page404",
  AboutUs: "../pages/IntroPages/AboutUs",
  ComingSoon: "../pages/ComingSoon",
  Maintenance: "../pages/Maintenance",
  HomePage: "../pages/IntroPages/HomePage",
  MyLearningPage: "../pages/MyLearningPage",
  CreateCourse: "../pages/CreateCourse",
  Market: "../pages/Market",
  CourseDetails: "../pages/CourseDetails",
  LearningPage: "../pages/LearningPage/index",
  MissionPage: "../pages/MissionPage",
  LeaderBoard: "../pages/LeaderBoard",
  ExchangeCoin: "../pages/ExchangeCoin",
  ProfileSetup: "../pages/ProfileSetup",
  AllCourses: "../pages/AllCourses",
  DepositAndEarn: "../pages/IntroPages/DepositAndEarn/index",
};

// ----------------------------------------------------------------------

// Lazy loading pages
const LazyPages = Object.fromEntries(
  Object.entries(pages).map(([key, path]) => [
    key,
    Loadable(lazy(() => import(/* @vite-ignore */ path))),
  ])
);

// ----------------------------------------------------------------------

// Create Router Provider Component
export const RouterProvider = ({ children }) => {
  const {
    TOKEN_ICO, BUY_TOKEN, TRANSFER_ETHER, DONATE,
    UPDATE_TOKEN, UPDATE_TOKEN_PRICE, TOKEN_WITHDRAW,
    TRANSFER_TOKEN, CONNECT_WALLET, ERC20,
    CHECK_ACCOUNT_BALANCE, setAccount, setLoader,
    addTokenToMetaMask, TOKEN_ADDRESS, loader,
    account, currency, notifySuccess, notifyError
  } = useContext(TOKEN_ICO_Context);

  // State declarations from your Index component
  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModel, setTransferModel] = useState(false);
  const [transferCurrency, setTransferCurrency] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const ico = await TOKEN_ICO();
      console.log('items', ico);
      const erc20 = await ERC20(TOKEN_ADDRESS);
      console.log('erc20', erc20);
      setDetail(ico);
    };
    fetchData();
  }, [account]);

  // Create context value object
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
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

// Update MainLayout to use context
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

// ----------------------------------------------------------------------

// Defining the routes
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
  { path: "intro", element: <MainLayout><LazyPages.Intro /></MainLayout> },
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

// ----------------------------------------------------------------------

// Update Router component to include Provider
export default function Router() {
  const routing = useRoutes(routes);

  return (
    <RouterProvider>
      {routing}
    </RouterProvider>
  );
}

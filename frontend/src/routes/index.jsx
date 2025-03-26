// This file is used to define the routes of the application.

import Index from "../index.jsx";

// Importing necessary modules
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

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

// Component to wrap the AppBar
const MainLayout = ({ children, displayHeader = true, displayFooter = true }) => (
  <Index>
    {displayHeader && <AppBarComponent />}
    {children}
    {displayFooter && <FooterComponent />}
  </Index>
);

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
      { path: "leaderboard", element: <LazyPages.LeaderBoard /> },
      { path: "mission", element: <LazyPages.MissionPage /> },
      { path: "course", element: <LazyPages.LearningPage /> },
      { path: "exchange", element: <LazyPages.ExchangeCoin /> },

    ],
  },
  { path: "profilesetup", element: <MainLayout><LazyPages.ProfileSetup /></MainLayout> },
  { path: "/test", element: <Test /> },
];

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes(routes);
}

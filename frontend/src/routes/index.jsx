// This file is used to define the routes of the application.

// Importing necessary modules
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

// Importing components
import AppBarComponent from "../components/Partials/Header/Index";
import FooterComponent from "../components/Partials/Footer";

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
  AboutUs: "../pages/AboutUs",
  ComingSoon: "../pages/ComingSoon",
  Maintenance: "../pages/Maintenance",
  HomePage: "../pages/HomePage",
  Intro: "../pages/Intro",
  MyLearningPage: "../pages/MyLearningPage",
  CreateCourse: "../pages/CreateCourse",
  Market: "../pages/Market",
  CourseDetails: "../pages/CourseDetails",
  LearningPage: "../pages/LearningPage",
  MissionPage: "../pages/MissionPage",
  LeaderBoard: "../pages/LeaderBoard",
  ExchangeCoin: "../pages/ExchangeCoin",
  ProfileSetup: "../pages/ProfileSetup",
  AllCourses: "../pages/AllCourses"
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
  <>
    {displayHeader && <AppBarComponent />}
    {children}
    {displayFooter && <FooterComponent />}
  </>
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
      { path: "course", element: <MainLayout children={<LazyPages.LearningPage />} displayFooter={0}></MainLayout> },
      { path: "exchange", element: <MainLayout><LazyPages.ExchangeCoin /></MainLayout> },

    ],
  },
  { path: "profilesetup", element: <MainLayout><LazyPages.ProfileSetup /></MainLayout> },
];

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes(routes);
}

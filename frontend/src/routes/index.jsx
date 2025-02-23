// This file is used to define the routes of the application.

// Importing necessary modules
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

// Importing components
import AppBarComponent from "../components/Partials/Header";
import FooterComponent from "../components/Partials/Footer";
import AllCourses from "../pages/AllCourses";

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
  Login: "../pages/authentication/Login",
  Register: "../pages/authentication/Register",
  ForgotPassword: "../pages/authentication/ForgotPassword",
  VerifyCode: "../pages/authentication/VerifyCode",
  Page500: "../pages/Error/Page500",
  Page404: "../pages/Error/Page404",
  AboutUs: "../pages/AboutUs",
  ComingSoon: "../pages/ComingSoon",
  Maintenance: "../pages/Maintenance",
  HomePage: "../pages/HomePage",
  MyLearningPage: "../pages/MyLearningPage",
  CreateCourse: "../pages/CreateCourse",
  CoursesDocs: "../pages/CoursesDocs",
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
const WithHeaderFooter = ({ children, displayHeader = true, displayFooter = true }) => (
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
      { path: "login", element: <LazyPages.Login /> },
      { path: "register", element: <LazyPages.Register /> },
      { path: "forgot-password", element: <LazyPages.ForgotPassword /> },
      { path: "verify", element: <LazyPages.VerifyCode /> },
    ],
  },
  {
    path: "*",
    children: [
      { path: "coming-soon", element: <LazyPages.ComingSoon /> },
      { path: "maintenance", element: <LazyPages.Maintenance /> },
      { path: "about-us", element: <LazyPages.AboutUs /> },
      { path: "500", element: <LazyPages.Page500 /> },
      { path: "404", element: <LazyPages.Page404 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "/", element: <Navigate to="/homepage" replace /> },
  { path: "homepage", element: <WithHeaderFooter><LazyPages.HomePage /></WithHeaderFooter> },
  {
    path: "mylearning",
    children: [
      { path: "createcourse", element: <WithHeaderFooter><LazyPages.CreateCourse /></WithHeaderFooter> },
      { path: "", element: <WithHeaderFooter><LazyPages.MyLearningPage /></WithHeaderFooter> },
    ],
  },
  { path: "allcourse", element: <WithHeaderFooter><LazyPages.AllCourses /></WithHeaderFooter> },
  { path: "coursesdocs", element: <WithHeaderFooter><LazyPages.CoursesDocs /></WithHeaderFooter> },
  { path: "coursedetails", element: <WithHeaderFooter><LazyPages.CourseDetails /></WithHeaderFooter> },
  {
    path: "learning",
    children: [
      { path: "", element: <Navigate to="/learning/course" replace /> },
      { path: "leaderboard", element: <WithHeaderFooter><LazyPages.LeaderBoard /></WithHeaderFooter> },
      { path: "mission", element: <WithHeaderFooter><LazyPages.MissionPage /></WithHeaderFooter> },
      { path: "course", element: <WithHeaderFooter><LazyPages.LearningPage /></WithHeaderFooter> },
      { path: "exchange", element: <WithHeaderFooter><LazyPages.ExchangeCoin /></WithHeaderFooter> },
    ],
  },
  { path: "profilesetup", element: <WithHeaderFooter><LazyPages.ProfileSetup /></WithHeaderFooter> },
];

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes(routes);
}

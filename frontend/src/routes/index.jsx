// This file is used to define the routes of the application.

// Importing necessary modules
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

// Importing components
import AppBarComponent from "../components/Partials/AppBar";
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
const WithAppBar = ({ children }) => (
  <>
    <AppBarComponent />
    {children}
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
  { path: "homepage", element: <WithAppBar><LazyPages.HomePage /></WithAppBar> },
  {
    path: "mylearning",
    children: [
      { path: "createcourse", element: <WithAppBar><LazyPages.CreateCourse /></WithAppBar> },
      { path: "", element: <WithAppBar><LazyPages.MyLearningPage /></WithAppBar> },
    ],
  },
  {path: "allcourse", element: <WithAppBar><LazyPages.AllCourses /></WithAppBar>},
  { path: "coursesdocs", element: <WithAppBar><LazyPages.CoursesDocs /></WithAppBar> },
  { path: "coursedetails", element: <WithAppBar><LazyPages.CourseDetails /></WithAppBar> },
  {
    path: "learning",
    children: [
      { path: "", element: <Navigate to="/learning/course" replace /> },
      { path: "leaderboard", element: <WithAppBar><LazyPages.LeaderBoard /></WithAppBar> },
      { path: "mission", element: <WithAppBar><LazyPages.MissionPage /></WithAppBar> },
      { path: "course", element: <WithAppBar><LazyPages.LearningPage /></WithAppBar> },
      { path: "exchange", element: <WithAppBar><LazyPages.ExchangeCoin /></WithAppBar> },
    ],
  },
  { path: "profilesetup", element: <WithAppBar><LazyPages.ProfileSetup /></WithAppBar> },
];

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes(routes);
}

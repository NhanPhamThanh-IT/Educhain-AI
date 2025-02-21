// Code for routing in the app
// This file defines the routes for the app and the components to be rendered for each route

// Importing necessary react libraries
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// Components
import LoadingScreen from "../components/LoadingScreen";
import AppBarComponent from "../components/Partials/AppBar";

// Wrapper for lazy-loaded components
const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Định nghĩa danh sách các trang với đường dẫn tương ứng
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
};

// Sử dụng dynamic import có thêm comment /* @vite-ignore */ để tắt cảnh báo
const LazyPages = Object.fromEntries(
  Object.entries(pages).map(([key, path]) => [
    key,
    Loadable(lazy(() => import(/* @vite-ignore */ path)))
  ])
);

const {
  Login,
  Register,
  ForgotPassword,
  VerifyCode,
  Page500,
  Page404,
  AboutUs,
  ComingSoon,
  Maintenance,
  HomePage,
  MyLearningPage,
  CreateCourse,
  CoursesDocs,
  CourseDetails,
  LearningPage,
  MissionPage,
  LeaderBoard,
  ExchangeCoin,
  ProfileSetup
} = LazyPages;

// Layout wrapper cho các trang cần có AppBar
const WithAppBar = ({ children }) => (
  <>
    <AppBarComponent />
    {children}
  </>
);

const routes = [
  {
    path: "authentication",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify", element: <VerifyCode /> },
    ],
  },
  {
    path: "*",
    children: [
      { path: "coming-soon", element: <ComingSoon /> },
      { path: "maintenance", element: <Maintenance /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "500", element: <Page500 /> },
      { path: "404", element: <Page404 /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "/", element: <Navigate to="/homepage" replace /> },
  { path: "homepage", element: <WithAppBar><HomePage /></WithAppBar> },
  {
    path: "mylearning",
    children: [
      { path: "createcourse", element: <WithAppBar><CreateCourse /></WithAppBar> },
      { path: "", element: <WithAppBar><MyLearningPage /></WithAppBar> },
    ],
  },
  { path: "coursesdocs", element: <WithAppBar><CoursesDocs /></WithAppBar> },
  { path: "coursedetails", element: <WithAppBar><CourseDetails /></WithAppBar> },
  {
    path: "learning",
    children: [
      { path: "leaderboard", element: <LeaderBoard /> },
      { path: "mission", element: <MissionPage /> },
      { path: "course", element: <LearningPage /> },
      { path: "exchange", element: <ExchangeCoin /> },
    ],
  },
  { path: "profilesetup", element: <WithAppBar><ProfileSetup /></WithAppBar> },
];

export default function Router() {
  return useRoutes(routes);
}

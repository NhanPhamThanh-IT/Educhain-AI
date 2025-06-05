// routesPath.js
// Contains all application routes and navigation paths for frontend_v2

/**
 * Helper function to build paths
 * @param {string} root - The root path
 * @param {string} sublink - The subpath to append
 * @returns {string} - The complete path
 */
function path(root, sublink) {
  return `${root}${sublink}`;
}

// Main routes
export const MAIN_ROUTES = {
  root: "/",
  home: "/home",
  docs: "/docs",
  depositAndEarn: "/deposit-and-earn",
  about: "/about",
  profile: "/profile",
  settings: "/settings",
  myCourses: "/my-courses",
  createCourse: "/create-course",
  market: "/market",
  missions: "/missions",
  leaderboard: "/leaderboard",
  exchangeCoin: "/exchange",
  notFound: "*",
};

// Layout types
export const LAYOUTS = {
  login: "LOGIN_LAYOUT",
  notLogin: "NOT_LOGIN_LAYOUT",
};

// All application routes with their components
export const APP_ROUTES = [
  // Not Login Layout Routes
  {
    layout: LAYOUTS.notLogin,
    routes: [
      { path: MAIN_ROUTES.root, component: "Home" },
      { path: MAIN_ROUTES.home, component: "Home" },
      { path: MAIN_ROUTES.docs, component: "Docs" },
      { path: MAIN_ROUTES.depositAndEarn, component: "DepositAndEarn" },
      { path: MAIN_ROUTES.about, component: "About" },
    ],
  },
  // Login Layout Routes
  {
    layout: LAYOUTS.login,
    routes: [
      { path: MAIN_ROUTES.profile, component: "Profile" },
      { path: MAIN_ROUTES.settings, component: "Settings" },
    ],
  },
  // Error Routes (no layout)
  {
    layout: null,
    routes: [
      { path: MAIN_ROUTES.notFound, component: "NotFound" },
    ],
  },
];

// Export all routes and paths
export default {
  MAIN_ROUTES,
  LAYOUTS,
  APP_ROUTES,
  path,
};

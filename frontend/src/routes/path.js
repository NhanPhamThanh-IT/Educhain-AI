// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/authentication";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  fotgotPassword: path(ROOTS_AUTH, "/forgot-password"),
};

export const PATH_PAGE = {
  root: "/",
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  about: "/about-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
};

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  TAGS: "/tags",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CATEGORIES: "/categories",
  QUESTIONS: "/questions",
  QUESTION_DETAILS: (id: string) => `/questions/${id}`,
  BOOKMARKS: "/bookmarks",
};

export default ROUTES;

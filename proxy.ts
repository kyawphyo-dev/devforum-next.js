import { auth } from "@/auth";
import ROUTES from "@/routes";

const publicRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(ROUTES.REGISTER, nextUrl));
  }

  if (
    isLoggedIn &&
    (nextUrl.pathname === ROUTES.LOGIN || nextUrl.pathname === ROUTES.REGISTER)
  ) {
    return Response.redirect(new URL(ROUTES.HOME, nextUrl));
  }

  // Let the request proceed for public routes and authorized users
  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

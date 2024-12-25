import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/home/:path*", "/settings/:path*", "/profile/:path*", "/inbox/:path*", "/notifications/:path*"],
};

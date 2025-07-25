
import { NextResponse } from "next/server";

function middleware() {
//   const response = authMiddleware(request);

//   // If the user is not authenticated, redirect to the login page
//   if (response instanceof NextResponse && response.status === 401) {
//     return NextResponse.redirect(new URL("/admin/connexion", request.url));
//   }

//   return response;
NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/admin/connexion"],
};

export default middleware;
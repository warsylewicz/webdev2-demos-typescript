import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Redirect /sales to /custom-solutions
  if (request.nextUrl.pathname === "/week-13/sales") {
    return NextResponse.redirect(
      new URL("/week-13/custom-solutions", request.nextUrl)
    );
  }

  // Rewrite /really-long-url-that-is-hard-to-remember to /week13/short-url
  if (request.nextUrl.pathname === "/week-13/short-url") {
    return NextResponse.rewrite(
      new URL(
        "/week-13/really-long-url-that-is-hard-to-remember",
        request.nextUrl
      )
    );
  }
}

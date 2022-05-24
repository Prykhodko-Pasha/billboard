import { NextResponse } from "next/server";
import verifyToken from "../helpers/verifyToken";

export default function middleware(req) {
  const { cookies, nextUrl } = req;
  const jwt = cookies.token;
  console.log("jwt :>> ", jwt);
  const url = nextUrl.clone();

  if (url.pathname.includes("/profile")) {
    if (!jwt) {
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }

    try {
      //   verifyToken(req);
      return NextResponse.next();
    } catch (error) {
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }
  } else {
    if (jwt) {
      try {
        // console.log("req :>> ", req);
        // verifyToken(req);
        url.pathname = "/profile";
        return NextResponse.rewrite(url);
      } catch (error) {
        console.log("next :>> ");
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

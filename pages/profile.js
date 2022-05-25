import { useEffect, useState } from "react";
import Router from "next/router";
import { getCookies } from "../helpers/cookies";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCookies() ? setUser(getCookies()) : Router.push("/login");
  }, []);

  return (
    <div>
      My Profile
      <div>{user?.name}</div>
    </div>
  );
}

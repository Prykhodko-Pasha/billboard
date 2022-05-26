import { useEffect, useState } from "react";
import Router from "next/router";
import { getCookies } from "../helpers/cookies";
import Avatar from "@mui/material/Avatar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCookies() ? setUser(getCookies()) : Router.push("/login");
  }, []);

  return (
    <div>
      {/* <Avatar alt="me" src="../public/avatar.png" /> */}
      <div>{user?.name}</div>
    </div>
  );
}

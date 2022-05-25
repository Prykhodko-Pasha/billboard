import Router from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import stringAvatar from "../helpers/stringAvatar";
import { logoutUserAPI } from "../services/users-api";
import { useIsLoggedInContext } from "../context/provider";
import s from "../styles/UserMenu.module.css";

export default function UserMenu({ name }) {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedInContext();

  const handleLogout = async (e) => {
    try {
      await logoutUserAPI();
      await setIsLoggedIn(false);
      Router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.user_menu}>
      <Avatar {...stringAvatar(String(name))} className={s.user_menu__avatar} />
      <span className={s.user_menu__greeting}>Hello, {name}!</span>
      <Button
        className={s.nav__link}
        variant="text"
        color="error"
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </div>
  );
}

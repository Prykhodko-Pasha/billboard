import Router from "next/router";
import { useTranslation } from "next-i18next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import stringAvatar from "../helpers/stringAvatar";
import { logoutUserAPI } from "../services/users-api";
import { useUserContext } from "../context/provider";
import { clearCookies } from "../helpers/cookies";
import s from "../styles/UserMenu.module.css";

export default function UserMenu({ name, setActiveLink }) {
  const [user, setUser] = useUserContext();
  const { t } = useTranslation("common");

  const handleLogout = async (e) => {
    try {
      await logoutUserAPI();
      await setActiveLink("/login");
      await setUser(null);
      clearCookies();
      Router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.user_menu}>
      <Avatar {...stringAvatar(String(name))} className={s.user_menu__avatar} />
      <span className={s.user_menu__greeting}>
        {t("hello")}, {name}!
      </span>
      <Button
        className={s.nav__link}
        variant="text"
        color="error"
        onClick={() => handleLogout()}
      >
        {t("logout")}
      </Button>
    </div>
  );
}

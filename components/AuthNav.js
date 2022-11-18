import Link from "next/link";
import s from "../styles/Navigation.module.css";
import { useTranslation } from "next-i18next";

export default function AuthNav({ activeLink, setActiveLink }) {
  const { t } = useTranslation("common");

  return (
    <nav className={s.nav}>
      <Link href="/login">
        <a
          className={activeLink === "/login" ? s.nav__link_active : s.nav__link}
          onClick={() => setActiveLink("/login")}
        >
          {t("login")}
        </a>
      </Link>
      <Link href="/signup">
        <a
          className={
            activeLink === "/signup" ? s.nav__link_active : s.nav__link
          }
          onClick={() => setActiveLink("/signup")}
        >
          {t("signup")}
        </a>
      </Link>
    </nav>
  );
}

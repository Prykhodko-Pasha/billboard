import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import s from "../styles/Navigation.module.css";

export default function Navigation({ user, activeLink, setActiveLink }) {
  const [isLog, setIsLog] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => setIsLog(user), [user]);

  return (
    <nav className={s.nav}>
      <Link href="/">
        <a
          className={activeLink === "/" ? s.nav__link_active : s.nav__link}
          onClick={async () => await setActiveLink("/")}
        >
          {t("billboard")}
        </a>
      </Link>
      {isLog && (
        <Link href="/profile">
          <a
            className={
              activeLink === "/profile" ? s.nav__link_active : s.nav__link
            }
            onClick={() => setActiveLink("/profile")}
          >
            {t("profile")}
          </a>
        </Link>
      )}
    </nav>
  );
}

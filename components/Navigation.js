import Link from "next/Link";
import { useEffect, useState } from "react";
import s from "../styles/Navigation.module.css";

export default function Navigation({ user, activeLink, setActiveLink }) {
  const [isLog, setIsLog] = useState(false);
  useEffect(() => setIsLog(user), [user]);

  return (
    <nav className={s.nav}>
      <Link href="/">
        <a
          className={activeLink === "/" ? s.nav__link_active : s.nav__link}
          onClick={async () => await setActiveLink("/")}
        >
          Billboard
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
            Profile
          </a>
        </Link>
      )}
    </nav>
  );
}

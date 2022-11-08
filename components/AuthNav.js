import Link from "next/link";
import s from "../styles/Navigation.module.css";

export default function AuthNav({ activeLink, setActiveLink }) {
  return (
    <nav className={s.nav}>
      <Link href="/login">
        <a
          className={activeLink === "/login" ? s.nav__link_active : s.nav__link}
          onClick={() => setActiveLink("/login")}
        >
          Login
        </a>
      </Link>
      <Link href="/signup">
        <a
          className={
            activeLink === "/signup" ? s.nav__link_active : s.nav__link
          }
          onClick={() => setActiveLink("/signup")}
        >
          Sign up
        </a>
      </Link>
    </nav>
  );
}

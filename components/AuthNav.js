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
          Login / Sign up
        </a>
      </Link>

      {/* {activeLink === "/login" && (
        <Link href="/login">
          <a className={s.nav__link_active}>Login</a>
        </Link>
      )}
      {activeLink === "/signup" && (
        <Link href="/signup">
          <a className={s.nav__link_active}>Registration</a>
        </Link>
      )} */}
    </nav>
  );
}

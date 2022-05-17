import Link from "next/link";
import s from "../styles/Navigation.module.css";

export default function AuthNav() {
  return (
    <nav className={s.nav}>
      <Link href="/login">
        <a className={s.nav__link}>Login</a>
      </Link>
      <Link href="/signup">
        <a className={s.nav__link}>Registration</a>
      </Link>
    </nav>
  );
}

import Link from "next/link";
import s from "../styles/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={s.nav}>
      <Link href="/">
        <a className={s.nav__link}>Billboard</a>
      </Link>
    </nav>
  );
}

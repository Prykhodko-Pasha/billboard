// import { useSelector } from "react-redux";
import Navigation from "./navigation";
import AuthNav from "./authNav";
// import UserMenu from "../UserMenu/UserMenu";
import s from "../styles/AppBar.module.css";
// import { getIsLoggedIn } from "../../redux/auth/auth-selectors";

export default function AppBar() {
  //   const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <div className={s.app_bar}>
      <Navigation />
      <AuthNav />
      {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
    </div>
  );
}
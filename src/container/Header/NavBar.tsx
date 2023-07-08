import { Link } from "react-router-dom";
import { useGlobalState } from "../../hooks/GlobalHooks";
import MenuLogIn from "./MenuLogIn";
import MenuNoLogin from "./MenuNoLogin";
import MenuLogInAdmin from "./MenuLogInAdmin";
import logo from "../../assets/logo.png";
const NavBar = () => {
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [currentUser] = useGlobalState("currentUser");

  return (
    <div className="flex flex-row justify-center items-center w-full h-full ">
      <div className="basis-1/3   h-[100%] flex justify-start items-center ">
        <Link
          to={"./"}
          className="flex flex-row items-center justify-center gap-2 text-black text-xl"
        >
          <img src={logo} className="" width={50} height={50} />
          NesCatWeb
        </Link>
      </div>
      {!isLoggedIn ? (
        <MenuNoLogin />
      ) : currentUser.userType === "admin" ? (
        <MenuLogInAdmin />
      ) : (
        <MenuLogIn />
      )}
    </div>
  );
};

export default NavBar;

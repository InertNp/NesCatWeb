
import { Link } from "react-router-dom";
import { useGlobalState } from "../../hooks/GlobalHooks"
import MenuLogIn from "./MenuLogIn";
import MenuNoLogin from "./MenuNoLogin";

const NavBar = () => {
    const [isLoggedIn] = useGlobalState('isLoggedIn');

    return (
        <div className="flex flex-row justify-center items-center w-full max-h-[100%]">
            <div className="float-left w-2/3  text-lg h-[100%] flex justify-start items-center ">
                <Link to={'./'}>NesCatWeb</Link>
            </div>
            {(isLoggedIn) ?
                <MenuLogIn />
                : <MenuNoLogin />

            }
        </div>)
}

export default NavBar
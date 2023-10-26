import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/userSlice";
import { SetLoading } from "@/redux/loadersSlice";
import Image from "next/image";

function NavList() {
  const { currentUser } = useSelector((state) => state.users);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();


  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.get("/api/users/logout");
      message.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  
  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
  }, [pathname]);


  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
        <Typography as="li" variant="h5" className="p-1 font-medium">
          <a
            href="#"
            className="user-name hover-blue"
            onClick={() => {
              router.push("/profile");
            }}
          >
            {currentUser?.name}
          </a>
        </Typography>
      

      <a href="#" className="flex items-center">
        <i
          className="ri-logout-circle-r-line hover:text-blue-500 transition-colors duration-300 ease-in-out"
          style={{ fontSize: "24px" }}
          onClick={onLogout}
        ></i>
      </a>
    </ul>
  );
}

export function NavbarSimple() {
  const router = useRouter();
  const pathname = usePathname();

  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      {pathname !== "/login" && pathname !== "/register" && (
        <Navbar className="mx-auto max-w-full px-6 py-3 rounded-none">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              variant="h5"
              className="mr-4 cursor-pointer py-1.5"
              cursor="pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src="/header-logo.png"
                width={150}
                height={65}
                alt="Picture of the car"
              />
            </Typography>
            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <NavList />
          </Collapse>
        </Navbar>
      )}
    </div>
  );
}



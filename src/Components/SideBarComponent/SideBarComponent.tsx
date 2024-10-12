import { NavLink, useNavigate } from "react-router-dom";
import logoImg from "./../../assets/logo.svg";
import favoriteicon from "./../../assets/favorites.svg";
import producticon from "./../../assets/products.svg";
import signout from "./../../assets/signout.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import { FaBars, FaTimes } from "react-icons/fa";

interface User {
  firstName: string;
  lastName: string;
  profileImage: string;
}

const SideBarComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const navigate = useNavigate();

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        firstName: parsedUser.first_name,
        lastName: parsedUser.last_name,
        profileImage: parsedUser.profile_image_url,
      });
    }
  }, []);

  const handleLogOut = async () => {
    const url: string = "https://test1.focal-x.com/api/logout";
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = () => {
    if (screenWidth <= 640) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen sm:w-[270px] w-full bg-light-beige-color px-10 pt-9 pb-8 sm:!relative fixed top-0 z-40 transition-all duration-300 ease-in-out ${
        isOpen ? "right-0" : "right-full"
      }  sm:left-0`}
    >
      <div className="flex flex-col items-center">
        <div className="relative before-content">
          <img src={logoImg} alt="Logo Img" className="w-20 mb-14" />
        </div>

        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="fixed z-50 flex items-center justify-center w-10 h-10 text-white rounded left-6 sm:hidden bg-main-theme-color-100 top-28"
          >
            <FaBars size={30} />
          </button>
        )}

        {isOpen && (
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="fixed z-50 flex items-center justify-center w-10 h-10 text-white rounded sm:hidden bg-main-theme-color-100 top-6 right-6"
          >
            <FaTimes size={30} />
          </button>
        )}

        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile Img"
            className="mb-6 rounded-full w-[150px] h-[150px]"
          />
        ) : (
          <div className="mb-6 bg-gray-200 rounded-full w-[150px] h-[150px]"></div>
        )}

        <p className="text-lg font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
      </div>

      <ul className="mt-[91px]">
        <li className="mb-3">
          <NavLink
            to="/show"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center justify-center py-3 font-medium rounded gap-x-5 transition-all duration-300 ease-in-out text-sm capitalize
               ${isActive ? "bg-main-theme-color-100" : ""} 
               hover:bg-main-theme-color-100`
            }
          >
            <img src={producticon} alt="Product Icon" />
            Products
          </NavLink>
        </li>

        <li className="mb-3">
          <NavLink
            to="/favorites"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center justify-center py-3 font-medium rounded gap-x-5 transition-all duration-300 ease-in-out text-sm capitalize
               ${isActive ? "bg-main-theme-color-100" : ""} 
               hover:bg-main-theme-color-100`
            }
          >
            <img src={favoriteicon} alt="Favorite Icon" />
            Favorites
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/orderlist"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center justify-center py-3 font-medium rounded gap-x-5 transition-all duration-300 ease-in-out text-sm capitalize
               ${isActive ? "bg-main-theme-color-100" : ""} 
               hover:bg-main-theme-color-100`
            }
          >
            <img src={favoriteicon} alt="Order List Icon" />
            Order List
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center w-full py-3 capitalize transition-all duration-300 ease-in-out rounded gap-x-2 hover:bg-main-theme-color-100"
        >
          {loading ? <SpinnerComponent sm={true} /> : "Logout"}
          {!loading && <img src={signout} alt="Signout Icon" />}
        </button>
      </div>
    </div>
  );
};

export default SideBarComponent;

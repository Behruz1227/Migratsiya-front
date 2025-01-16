import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {davlat} from "../../assets";
import LanguageSelect from "./languageOption";
import UpdateProfileModal from "./updateProfileModal";
import useStore from "../../helpers/state-managment/navbar/navbar";
import {useGlobalRequest} from "../../helpers/functions/universal";
import {getUserInfo, imgGet} from "../../helpers/api/api";
import {useTranslation} from "react-i18next";

interface NavigationItem {
    name: string;
    layout: string;
    path: string;
}

interface NavbarProps {
    navigation: NavigationItem[];
    setLanguageData?: (v: string) => void
}

const Navbar: React.FC<NavbarProps> = ({navigation, setLanguageData}) => {
    const {t} = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user menu
    const location = useLocation();
    const {setUpdateModal, updateModal, setFormData, setImageId} = useStore();
    const userGet = useGlobalRequest(getUserInfo, "GET");

    // Extract the text after the last '/' in the pathname
    const currentPath = location.pathname.split("/").filter(Boolean).pop();
    const navigate = useNavigate()


    useEffect(() => {
        if (!updateModal) userGet.globalDataFunc().then(() => "");
    }, [updateModal]);

    useEffect(() => {
        userGet.globalDataFunc().then(() => "");
    }, []);

    return (
        <nav className="bg-[#0086D1] w-full fixed z-30"
             style={{
                 background: "linear-gradient(to bottom, #06264C, #51BBF0, #06264C)",
             }}
        >
            <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#0086D1] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen ? "true" : "false"}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <div className="shrink-0 items-center hidden md:block">
                            <img
                                className="h-10 w-auto hover:cursor-pointer"
                                src={davlat}
                                alt="Your Company"
                                onClick={() => window.location.reload()}
                            />
                        </div>
                        <div className="hidden md:ml-6 md:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.layout + item.path}
                                        className={() =>
                                            currentPath === item.path.split("/").filter(Boolean).pop()
                                                ? "rounded-md bg-[#04466c] px-3 py-2 text-sm font-medium text-white"
                                                : "rounded-md px-3 py-2 text-sm font-medium hover:bg-[#579bc3] text-white"
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                        <LanguageSelect setLanguageData={setLanguageData}/>

                        {/* User Menu Button */}
                        <div className="relative ml-3">
                            <div className="flex gap-3">
                                <div className="hidden sm:flex md:hidden lg:flex items-center justify-center text-white">
                                    <p>{userGet?.response?.fullName || "--"}</p>
                                </div>
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded={isUserMenuOpen ? "true" : "false"}
                                    aria-haspopup="true"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} // Toggle user menu
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={userGet?.response?.attachmentId ? imgGet + userGet?.response?.attachmentId : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                        alt="User profile"
                                    />
                                </button>
                            </div>

                            {/* User Menu */}
                            {isUserMenuOpen && (
                                <div
                                    className="absolute right-0 z-10 mt-2 w-52 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    <div className="py-1">
                                        <p className="px-4 py-2 text-sm text-gray-700">
                                            {userGet?.response?.fullName || "--"}
                                        </p>
                                        <p className="px-4 py-2 text-sm text-gray-700">
                                            {userGet?.response?.phone || "--"}
                                        </p>
                                        <div className="border-t border-gray-100"></div>
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                setFormData(
                                                    "phoneNumber",
                                                    userGet?.response?.phone || ""
                                                );
                                                setFormData(
                                                    "fullName",
                                                    userGet?.response?.fullName || ""
                                                );
                                                setImageId(userGet?.response?.attachmentId);
                                                setUpdateModal(true);
                                            }}
                                            className="block px-4 w-full text-start py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {t("Ma'lumotni tahrirlash")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                sessionStorage.clear();
                                                navigate("/");
                                            }}
                                            className="block px-4 w-full text-start py-2 text-sm text-red-700 hover:bg-gray-100"
                                        >
                                            {t("Chiqish")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}
                id="mobile-menu"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.layout + item.path}
                            className={() =>
                                currentPath === item.path.split("/").filter(Boolean).pop()
                                    ? "block rounded-md bg-[#04466c] px-3 py-2 text-base font-medium text-white"
                                    : "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#579bc3]"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <UpdateProfileModal/>
        </nav>
    );
};

export default Navbar;

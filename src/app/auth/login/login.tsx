import React, {useState, useEffect} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {davlat} from "../../../assets";
import axios from "axios";
import {log_in} from "../../../helpers/api/api";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

type RoleType = 'ROLE_SUPER_ADMIN' | 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_KICHIK_UCHASKAVOY';

const roleRoutes: Record<RoleType, string> = {
    ROLE_SUPER_ADMIN: "/super-admin/dashboard",
    ROLE_USER: "/manager/main",
    ROLE_ADMIN: "/admin/dashboard",
    ROLE_KICHIK_UCHASKAVOY: "/uchaskavoy/main",
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("+998");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState("");

    useEffect(() => {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
        setIsSubmitDisabled(password.length < 3 || formattedPhoneNumber.length !== 12);
    }, [phoneNumber, password]);

    useEffect(() => {
        if (roles) {
            if (roles === 'ROLE_SUPER_ADMIN') {
                navigate(roleRoutes.ROLE_SUPER_ADMIN);
                toast.success("Tizimga muvaffaqiyatli kirdingiz.");
            }
            else if (roles === 'ROLE_USER') {
                navigate(roleRoutes.ROLE_USER);
                toast.success("Tizimga muvaffaqiyatli kirdingiz.");
            }
            else if (roles === 'ROLE_ADMIN') {
                navigate(roleRoutes.ROLE_ADMIN);
                toast.success("Tizimga muvaffaqiyatli kirdingiz.");
            }
            else if (roles === 'ROLE_KICHIK_UCHASKAVOY') {
                navigate(roleRoutes.ROLE_KICHIK_UCHASKAVOY);
                toast.success("Tizimga muvaffaqiyatli kirdingiz.");
            }
        }
    }, [roles]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
            const reqData = {
                phoneNumber: `+${cleanPhoneNumber}`,
                password,
            }

            const {data} = await axios.post(log_in, reqData);

            if (data?.data) {
                const {role, token} = data?.data;
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("token", token);
                setRoles(role)
            } else if (data?.error) {
                toast.error(data.error?.message || "Login yoki parol xato");
            }
        } catch (err) {
            toast.error("Tizimga kirishda xatolik yuz berdi.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length > 30) {
            setPasswordError("Parol 30 ta belgidan oshmasligi kerak.");
        } else if (newPassword.length === 30) {
            setPasswordError("Parol 30 ta belgiga yetib keldi.");
        } else {
            setPasswordError("");
        }
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        value = value.startsWith("998") ? value : "998";
        value = value.slice(0, 12);

        const formattedValue = `+998${value.slice(3, 5) ? ` (${value.slice(3, 5)}` : ""}${value.slice(5, 8) ? `) ${value.slice(5, 8)}` : ""}${value.slice(8, 10) ? `-${value.slice(8, 10)}` : ""}${value.slice(10, 12) ? `-${value.slice(10, 12)}` : ""}`;
        setPhoneNumber(formattedValue);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-center mb-6">
                    <img src={davlat} alt="Logo" className="w-24 h-24"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Telefon raqami
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Telefon raqamingizni kiriting"
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >Parol</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full mt-2 p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Parolingizni kiriting"
                                maxLength={30}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-6 transform text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            isSubmitDisabled || loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={isSubmitDisabled || loading}
                    >
                        {loading ? "Yuklanmoqda..." : "Kirish"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

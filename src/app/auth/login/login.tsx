import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { davlat } from "../../../assets";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { log_in } from "../../../helpers/api/api";
import { toast } from "sonner";


const LoginPage: React.FC = () => {
  const [PhoneNumber, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhoneNumber = PhoneNumber.replace(/\D/g, ""); // Raqamlar faqat
    setLoading(true); // Start loading
    try {
      const response = await axios.post(log_in, {
        phoneNumber: "+" + cleanPhoneNumber,
        password: password,
      });
      if (response.data.data) {
        sessionStorage.setItem("role", response.data.data.role);
        sessionStorage.setItem("token", response.data.data.token);
        setRole(response.data.data.role);
      } else if (response.data.error) {
        toast.error(response.data.error.message || "Login yoki parol xato");
      }
    } catch (error: AxiosError | any) {
      toast.error("Tizimga kirishda xatolik yuz berdi.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (role) {
      if (role === "ROLE_SUPER_ADMIN") {
        navigate("/super-admin/dashboard");
        toast.success("Tizimga muvaffaqiyatli kirdingiz.");
        setRole('');
      } else if (role === "ROLE_USER") {
        navigate("/manager/main");
        toast.success("Tizimga muvaffaqiyatli kirdingiz.");
        setRole('');
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
        toast.success("Tizimga muvaffaqiyatli kirdingiz.");
        setRole('');
      }else if (role === "ROLE_KICHIK_UCHASKAVOY") {
        navigate("/uchaskavoy/main");
        toast.success("Tizimga muvaffaqiyatli kirdingiz.");
        setRole('');
      }
    }
  }, [role, setRole])

  useEffect(() => {
    const formattedPhoneNumber = PhoneNumber.replace(/\D/g, ""); // Faqat raqamlarni olish
    if (password.length >= 3 && formattedPhoneNumber.length === 12) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [PhoneNumber, password]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    if (newPassword.length > 30) {
      setPasswordError("Parol 30 ta belgidan oshmasligi kerak.");
    } else if (newPassword.length === 30) {
      setPasswordError("Parol 30 ta belgiga yetib keldi.");
    } else {
      setPasswordError("");
    }

    setPassword(newPassword);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (!value.startsWith("998")) {
      value = "998";
    }

    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    let formattedValue = "+998";
    if (value.length > 3) {
      formattedValue += " (" + value.slice(3, 5);
    }
    if (value.length > 5) {
      formattedValue += ") " + value.slice(5, 8);
    }
    if (value.length > 8) {
      formattedValue += "-" + value.slice(8, 10);
    }
    if (value.length > 10) {
      formattedValue += "-" + value.slice(10, 12);
    }

    setPhoneNumber(formattedValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={davlat} alt="Logo" className="w-24 h-24" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="PhoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Telefon raqami
            </label>
            <input
              type="text"
              id="PhoneNumber"
              value={PhoneNumber}
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
            >
              Parol
            </label>
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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

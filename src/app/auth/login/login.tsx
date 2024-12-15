import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { davlat } from "../../../assets";
import useStore from "../../../helpers/state-managment/navbar/navbar";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("+998");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 30) {
      setPasswordError("Parol 30 ta belgidan oshmasligi kerak.");
      return;
    }
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    // Check for password length validation
    if (newPassword.length > 30) {
      setPasswordError("Parol 30 ta belgidan oshmasligi kerak.");
    } else if (newPassword.length === 30) {
      setPasswordError("Parol 30 ta belgiga yetib keldi.");
    } else {
      setPasswordError(""); // Clear error when password is valid
    }

    setPassword(newPassword);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // If user has deleted all digits, reset the value to +998
    if (value.length === 0) {
      value = "+998";
    } else {
      // Ensure the prefix is always +998
      if (value.startsWith("998")) {
        value = "+998" + value.slice(3);
      } else {
        value = "+998" + value;
      }
    }

    // Format the phone number as +998 (90) 989-98-98
    if (value.length > 3) {
      value =
        "+998 (" +
        value.slice(4, 6) +
        ") " +
        value.slice(6, 9) +
        "-" +
        value.slice(9, 11) +
        "-" +
        value.slice(11, 13);
    } else if (value.length > 2) {
      value = "+998 (" + value.slice(4, 6) + ") ";
    }

    setUsername(value);
  };

  // Disable the submit button if username or password is empty
  const isSubmitDisabled = !username || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={davlat} alt="Logo" className="w-24 h-24" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Telefon raqami
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
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
                maxLength={30} // limit to 30 characters
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
            onClick={() => {
              sessionStorage.setItem("role", "ROLE_OFFICER");
              navigate("/officer/main");
            }}
            type="submit"
            className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={isSubmitDisabled}
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

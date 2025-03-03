import React, { useEffect, useState } from "react";
import Modal from "../modal/modal";
import ImageUpload from "../../helpers/functions/imgupload";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import globalStore from "../../helpers/state-managment/imgUploadStore/imgUploadStore";
import { useGlobalRequest } from "../../helpers/functions/universal";
import { editUserInfo } from "../../helpers/api/api";
import { toast } from "sonner";
import useStore from "../../helpers/state-managment/navbar/navbar";
import { useTranslation } from "react-i18next";

const UpdateProfileModal: React.FC = () => {
  const { t } = useTranslation()
  const { imgUpload } = globalStore();
  const { setUpdateModal, updateModal, formData, setFormData, resetFormData, imageId } = useStore();
  

  const profileUpdate = useGlobalRequest(editUserInfo, "PUT", {
    fullName: formData.fullName,
    phone: formData.phoneNumber,
    password: formData.password,
    attachmentId: imgUpload || 0,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (profileUpdate.response) {
      toast.success("Profile updated successfully!");
      sessionStorage.setItem("token", profileUpdate.response)
      setUpdateModal(false);
      resetFormData();
    } else if (profileUpdate.error) {
      toast.error("Profile update failed!");
    }
  }, [profileUpdate.response, profileUpdate.error, resetFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(id, value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (!value.startsWith("998")) value = "998";
    if (value.length > 12) value = value.slice(0, 12);

    let formattedValue = "+998";
    if (value.length > 3) formattedValue += " (" + value.slice(3, 5);
    if (value.length > 5) formattedValue += ") " + value.slice(5, 8);
    if (value.length > 8) formattedValue += "-" + value.slice(8, 10);
    if (value.length > 10) formattedValue += "-" + value.slice(10, 12);

    setFormData("phoneNumber", formattedValue);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { fullName: "", phoneNumber: "", password: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("Ism familiya kiritilishi shart.");
      valid = false;
    }

    const phoneNumberDigits = formData.phoneNumber.replace(/\D/g, "");
    if (phoneNumberDigits.length !== 12) {
      newErrors.phoneNumber = t("Telefon raqam to'liq kiritilishi shart.");
      valid = false;
    }

    if (formData.password.length < 3) {
      newErrors.password = t("Parol kamida 3 ta belgidan iborat bo'lishi kerak.");
      valid = false;
    }

    setErrors(newErrors);
    setIsSubmitDisabled(!valid);
  };

  const handleSubmit = () => {
    profileUpdate.globalDataFunc();
  };

  return (
    <Modal isOpen={updateModal} onClose={() => setUpdateModal(false)}>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">{t("Profilni Yangilash")}</h2>
        <ImageUpload imgID={imageId} />

        {/* Full Name */}
        <div className="mb-4 w-full max-w-sm">
          <label htmlFor="fullName">{t("Ism familiyangizni kiriting")}</label>
          <input
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg"
            placeholder={t("Ism familiyangizni kiriting")}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4 w-full max-w-sm">
          <label htmlFor="phoneNumber">{t("Telefon raqam")}</label>
          <input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 w-full max-w-sm relative">
          <label htmlFor="password">{t("Parol")}</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 p-3 pr-10 border rounded-lg"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-12"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button  
          className="bg-red-600 py-2 px-4 rounded-xl text-white"
           onClick={() => setUpdateModal(false)}>{t("Bekor qilish")}</button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`p-2 ${
              isSubmitDisabled ? "bg-gray-400 py-2 px-4 rounded-xl text-black" : "bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-xl text-white"
            } text-black`}
          >
            {t("Yangilash")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProfileModal;

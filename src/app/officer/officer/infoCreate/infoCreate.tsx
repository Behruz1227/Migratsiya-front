import React, { useState } from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import { addManager } from "../../../../helpers/api/api";
import PhoneNumberInput from "../../../../components/inputs/number-input";
import useUchaskavoyStore from "../../../../helpers/state-managment/uchaskavoy/uchaskavoyStore";

// Sana formatlash funksiyasi
const formatDateToDDMMYYYY = (date: string): string => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // 0-based index
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const InfoCreate: React.FC = () => {
    const { firstName, setFirstName, lastName, setLastName, homeNumber, setHomeNumber, middleName, setMiddleName, birthDate, setBirthDate, currentStatus, setCurrentStatus, birthCountry, setBirthCountry,
        birthRegion, setBirthRegion, birthDistrict, setBirthDistrict, birthVillage, setBirthVillage, additionalAddress, setAdditionalAddress, additionalInfo, setAdditionalInfo, departureCountry, setDepartureCountry, departureRegion, setDepartureRegion,
        departureDistrict, setDepartureDistrict, departureArea, setDepartureArea, typeOfActivity, setTypeOfActivity, leavingCountryDate, setLeavingCountryDate, returningUzbekistanDate, setReturningUzbekistanDate,
        reasonForLeaving, setReasonForLeaving, phoneNumberDeparture, setPhoneNumberDeparture, suspiciousCases, setSuspiciousCases, disconnectedTime, setDisconnectedTime } = useUchaskavoyStore();
    

    const formattedData = {
        firstName,
        lastName,homeNumber,middleName,birthDate,currentStatus,birthCountry,
        birthRegion,birthDistrict,birthVillage,additionalAddress,additionalInfo,departureCountry,
        departureRegion,departureDistrict,departureArea,typeOfActivity,leavingCountryDate,returningUzbekistanDate,reasonForLeaving,phoneNumberDeparture,suspiciousCases, 
        disconnectedTime,
    };

    const ManagerAdd = useGlobalRequest(`${addManager}`, "POST", formattedData);

    const isFormValid = firstName && lastName && birthDate && birthCountry && birthRegion 
        && departureCountry && departureDistrict && phoneNumberDeparture && role;

    const handleSubmit = async () => {
        console.log("Yuborilayotgan ma'lumotlar:", formattedData); // Logga chiqarish
        try {
            const response = await ManagerAdd.response(); // Backend so'rovi
            console.log("Backend Response:", response); // Backenddan kelgan javob
            alert("Ma'lumotlar muvaffaqiyatli yuborildi!");
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            alert("Xatolik yuz berdi, qayta urinib ko'ring!");
        }
    };

    const filterFields = [
        { label: "Ismi", value: firstName, type: "text", setState: setFirstName, placeholder: "Ismi" },
        { label: "Familiyasi", value: lastName, type: "text", setState: setLastName, placeholder: "Familiyasi" },
        { label: "Otasini ismi", value: middleName, type: "text", setState: setMiddleName, placeholder: "Otasini ismi" },
        { label: "Tug’ilgan sanasi", value: birthDate, type: "date", setState: setBirthDate, placeholder: "Select date" },
        { label: "Uy telefon no'meri", value: homeNumber, type: "number", setState: setHomeNumber, placeholder: "Telefon raqami" },
        { label: "Hozirgi holati", value: currentStatus, type: "text", setState: setCurrentStatus, placeholder: "Hozirgi holati" },
        { label: "Tug'ilgan davlat", value: birthCountry, type: "text", setState: setBirthCountry, placeholder: "Tug'ilgan davlat" },
        { label: "Tug'ilgan viloyat", value: birthRegion, type: "text", setState: setBirthRegion, placeholder: "Tug'ilgan viloyat" },
        { label: "Tug'ilgan tuman", value: birthDistrict, type: "text", setState: setBirthDistrict, placeholder: "Tug'ilgan tuman" },
        { label: "Tug'ilgan qishloq", value: birthVillage, type: "text", setState: setBirthVillage, placeholder: "Tug'ilgan qishloq" },
        { label: "Qo'shimcha ma'lumot", value: additionalInfo, type: "text", setState: setAdditionalInfo, placeholder: "Qo'shimcha ma'lumot" },
        { label: "Qo'shimcha manzil", value: additionalAddress, type: "text", setState: setAdditionalAddress, placeholder: "Qo'shimcha manzil" },
        { label: "Ketgan davlat", value: departureCountry, type: "text", setState: setDepartureCountry, placeholder: "Ketgan davlat" },
        { label: "Ketgan viloyat", value: departureRegion, type: "text", setState: setDepartureRegion, placeholder: "Ketgan viloyat" },
        { label: "Ketgan tuman", value: departureDistrict, type: "text", setState: setDepartureDistrict, placeholder: "Ketgan tuman" },
        { label: "Ketgan joyi", value: departureArea, type: "text", setState: setDepartureArea, placeholder: "Ketgan joyi" },
        { label: "Faoliyat turi", value: typeOfActivity, type: "text", setState: setTypeOfActivity, placeholder: "Faoliyat turi" },
        { label: "Davlatni tark etgan sana", value: leavingCountryDate, type: "date", setState: setLeavingCountryDate, placeholder: "Ketish sanasi" },
        { label: "O’zbekistonga qaytgan sana", value: returningUzbekistanDate, type: "date", setState: setReturningUzbekistanDate, placeholder: "Qaytish sanasi" },
        { label: "Ketish sababi", value: reasonForLeaving, type: "text", setState: setReasonForLeaving, placeholder: "Ketish sababi" },
        { label: "Telefon raqami", value: phoneNumberDeparture, type: "number", setState: setPhoneNumberDeparture, placeholder: "Telefon raqami" },
        { label: "Shubhali holatlar", value: suspiciousCases, type: "text", setState: setSuspiciousCases, placeholder: "Shubhali holatlar" },
        { label: "Aloqa uzilgan vaqt", value: disconnectedTime, type: "date", setState: setDisconnectedTime, placeholder: "Aloqa uzilgan vaqt" },
    ];

    const renderInputs = (fields: any) => {
        return fields.map((field: any, index: number) => {
            if (field.type === "text") {
                return (
                    <TextInput
                        key={index}
                        label={field.label}
                        value={field.value}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );
            } else if (field.type === "date") {
                return (
                    <DateInput
                        key={index}
                        label={field.label}
                        value={field.value}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );
            } else if (field.type === "number") {
                return (
                    <PhoneNumberInput
                        key={index}
                        label={field.label}
                        value={field.value}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );
            }
            return null;
        });
    };

    return (
        <div className="grid grid-cols-4 gap-4 mt-6">
            {renderInputs(filterFields)}
            <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`col-span-4 px-12 py-2 rounded-xl mt-4 
                ${isFormValid ? "bg-[#0086D1] text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
            >
                Ma’lumotlarni saqlash
            </button>
        </div>
    );
};

export default InfoCreate;

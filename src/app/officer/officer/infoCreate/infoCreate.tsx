import React, { useState } from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import { addManager } from "../../../../helpers/api/api";

const InfoCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [birthCountry, setBirthCountry] = useState('');
    const [birthRegion, setBirthRegion] = useState('');
    const [birthDistrict, setBirthDistrict] = useState('');
    const [birthVillage, setBirthVillage] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');
    const [departureCountry, setDepartureCountry] = useState('');
    const [departureRegion, setDepartureRegion] = useState('');
    const [departureDistrict, setDepartureDistrict] = useState('');
    const [departureArea, setDepartureArea] = useState('');
    const [typeOfActivity, setTypeOfActivity] = useState('');
    const [leavingCountryDate, setLeavingCountryDate] = useState('');
    const [returningUzbekistanDate, setReturningUzbekistanDate] = useState('');
    const [reasonForLeaving, setReasonForLeaving] = useState('');
    const [phoneNumberDeparture, setPhoneNumberDeparture] = useState('');
    const [suspiciousCases, setSuspiciousCases] = useState('');
    const [disconnectedTime, setDisconnectedTime] = useState('');

    const ManagerAdd = useGlobalRequest(`${addManager}`, "POST", {
        firstName: name,
        lastName: fullName,
        middleName: fatherName,
        birthDate,
        homeNumber,
        currentStatus,
        birthCountry,
        birthRegion,
        birthDistrict,
        birthVillage,
        additionalInfo,
        additionalAddress,
        departureCountry,
        departureRegion,
        departureDistrict,
        departureArea,
        typeOfActivity,
        leavingCountryDate,
        returningUzbekistanDate,
        reasonForLeaving,
        phoneNumberDeparture,
        suspiciousCases,
        disconnectedTime,
    });

    console.log(ManagerAdd.response);
    

    const filterFields = [
        { label: "Ismi", value: name, type: "text", setState: setName, placeholder: "Ismi" },
        { label: "Familiyasi", value: fullName, type: "text", setState: setFullName, placeholder: "Familiyasi" },
        { label: "Otasini ismi", value: fatherName, type: "text", setState: setFatherName, placeholder: "Otasini ismi" },
        { label: "Tug’ilgan sanasi", value: birthDate, type: "date", setState: setBirthDate, placeholder: "Select date" },
        { label: "Uy telefon no'meri", value: homeNumber, type: "text", setState: setHomeNumber, placeholder: "Telefon raqami" },
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
        { label: "Telefon raqami", value: phoneNumberDeparture, type: "text", setState: setPhoneNumberDeparture, placeholder: "Telefon raqami" },
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
                        type={field.type}
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
            }
            return null;
        });
    };

    
        // const formData = {
        //     name,
        //     fullName,
        //     fatherName,
        //     birthDate,
        //     homeNumber,
        //     currentStatus,
        //     birthCountry,
        //     birthRegion,
        //     birthDistrict,
        //     birthVillage,
        //     additionalInfo,
        //     additionalAddress,
        //     departureCountry,
        //     departureRegion,
        //     departureDistrict,
        //     departureArea,
        //     typeOfActivity,
        //     leavingCountryDate,
        //     returningUzbekistanDate,
        //     reasonForLeaving,
        //     phoneNumberDeparture,
        //     suspiciousCases,
        //     disconnectedTime,
        // };
        

    return (
        <div className="grid grid-cols-4 gap-4 mt-6">
            {renderInputs(filterFields)}
            <button 
                onClick={ManagerAdd.response} 
                className="col-span-4 bg-[#0086D1] text-white px-12 py-2 rounded-xl mt-4">
                Ma’lumotlarni saqlash
            </button>
        </div>
    );
};

export default InfoCreate; 
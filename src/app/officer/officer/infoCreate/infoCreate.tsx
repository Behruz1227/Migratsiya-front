import React, { useEffect, useState } from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import { addManager, addMigrate, countryList, distList, getTuman, mfyList, regionList } from "../../../../helpers/api/api";
import PhoneNumberInput from "../../../../components/inputs/number-input";
import useUchaskavoyStore from "../../../../helpers/state-managment/uchaskavoy/uchaskavoyStore";
import SelectInput from "../../../../components/inputs/selectInput";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const formatDateToDDMMYYYY = (date: string): string => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const InfoCreate: React.FC = () => {
    const { t } = useTranslation()
    const { firstName, setFirstName, lastName, setLastName, homeNumber, setHomeNumber, middleName, setMiddleName, birthDate, setBirthDate, currentStatus, setCurrentStatus, 
        birthRegion,  birthDistrict, setBirthDistrict, birthVillage, setBirthVillage, additionalAddress, setAdditionalAddress, additionalInfo, setAdditionalInfo, departureCountry, setDepartureCountry, departureRegion, setDepartureRegion,
        departureDistrict, setDepartureDistrict, departureArea, setDepartureArea, typeOfActivity, setTypeOfActivity, leavingCountryDate, setLeavingCountryDate, returningUzbekistanDate, setReturningUzbekistanDate,
        reasonForLeaving, setReasonForLeaving, phoneNumberDeparture, setPhoneNumberDeparture, suspiciousCases, setSuspiciousCases, disconnectedTime, setDisconnectedTime } = useUchaskavoyStore();
    const [birthDistrictNoce, setBirthDistrictNoce] = useState('')
    const CountryGet = useGlobalRequest(`${countryList}`, "GET");//tug'ilgan davlat 
    const DepartureCountry = useGlobalRequest(`${countryList}`, "GET");// ketgan davlat

    const RegionGet = useGlobalRequest(`${mfyList}?districtId=${birthDistrict}`, "GET");// tug'ilgan viloyat
    const GetdepartureRegion = useGlobalRequest(`${regionList}?countryId=${departureCountry}`, "GET");// tug'ilgan viloyat
    const DiskGet = useGlobalRequest(`${getTuman}?regionId=${birthRegion}`, "GET"); // tug'ilgan tuman 
    const DepartureDistrictGet = useGlobalRequest(`${distList}?regionId=${departureRegion}`, "GET");// ketgan tuman 

    const [departureCountryNonce, setDepartureCountryNonce] = useState<string | null>(null);
    const [birthCountryNonce, setBirthCountryNonce] = useState<string | null>(null);
    const [birthRegionNonce, setBirthRegionNonce] = useState<string | null>(null);
    const [departureRegionNonce, setDepartureRegionNonce] = useState<string | null>(null);
    const departureCountryOptions = DepartureCountry?.response
        ? DepartureCountry.response.map((country: any) => ({
            label: country.name,
            value: country.id,
            name: country.name,
        }))
        : []; // tug'ilgan davlat select 

    const countryOptions = CountryGet?.response
        ? CountryGet.response?.map((country: any) => ({
            label: country.name,
            value: country.id,
            name: country.code,
        }))
        : []; // ketgan davlat select

    const regioOption = RegionGet?.response ? RegionGet?.response?.data?.map((region: any) => ({
        label: region.name,
        value: region.geonameId,
    })) : []; // tug'ilgan  viloyat 
    const departureRegionOption = GetdepartureRegion?.response ? GetdepartureRegion?.response?.map((region: any) => ({
        label: region.name,
        value: region.geonameId,
    })) : []; //ketgan viloyat 
    const diskOption = DiskGet?.response ? DiskGet?.response?.map((region: any) => ({
        label: region.name,
        value: region.id,
    })) : []; // tug'ilgan tuman 
    const DepartureDistrictOption = DepartureDistrictGet?.response ? DepartureDistrictGet?.response?.map((region: any) => ({
        label: region.name,
        value: region.name,
    })) : []; //ketgan tuman
    
    const options = [
        { value: "QIDIRUVDA", label: "Qidiruvda" },
        { value: "BIRIGADIR", label: "Brigadir" },
        { value: "BOSHQA", label: "Boshqa" },
    ];
    const isFormValid =
        String(firstName)?.trim().length > 0 &&
        String(lastName)?.trim().length > 0 &&
        String(birthDate)?.trim().length > 0 &&
        String(departureCountry)?.trim().length > 0 &&
        String(departureRegion)?.trim().length > 0 &&
        String(departureDistrict)?.trim().length > 0 &&
        String(phoneNumberDeparture)?.trim().length > 0 &&
        String(currentStatus)?.trim().length > 0;
        String(phoneNumberDeparture)?.trim().length > 0;

    const formattedData = {
        firstName: firstName || "",
        lastName: lastName || "",
        homeNumber: homeNumber || "",
        middleName: middleName || "",
        birthDate: birthDate ? formatDateToDDMMYYYY(birthDate) : null,
        currentStatus: currentStatus || "",
        birthCountry: birthCountryNonce || "", // Bo'sh emasligini tekshirish uchun
        birthRegion: birthRegionNonce || "",   // Bo'sh emasligini tekshirish uchun
        birthDistrict: birthDistrictNoce || "",
        birthVillage: birthVillage || "",      // Bo'sh emasligini tekshirish uchun
        additionalAddress: additionalAddress || null,
        additionalInfo: additionalInfo || null,
        departureCountry: departureCountryNonce || "", // Bo'sh emasligini tekshirish uchun
        departureRegion: departureRegionNonce || "",   // Bo'sh emasligini tekshirish uchun
        departureDistrict: departureDistrict || "",    // Bo'sh emasligini tekshirish uchun
        departureArea: departureArea || null,
        typeOfActivity: typeOfActivity || null,
        leavingCountryDate: leavingCountryDate ? formatDateToDDMMYYYY(leavingCountryDate) : null,
        returningUzbekistanDate: returningUzbekistanDate ? formatDateToDDMMYYYY(returningUzbekistanDate) : null,
        reasonForLeaving: reasonForLeaving || null,
        phoneNumberDeparture: phoneNumberDeparture || "",
        suspiciousCases: suspiciousCases || null,
        disconnectedTime: disconnectedTime ? formatDateToDDMMYYYY(disconnectedTime) : null,
    };

    const ManagerAdd = useGlobalRequest(`${addMigrate}`, "POST", formattedData);
    const handleSubmit = async () => {
        console.log("Backend", formattedData);
        console.log(ManagerAdd.response);

        try {
            // Asinxron funksiya bo'lsa, `await`ni ishlatamiz
            await ManagerAdd.globalDataFunc();

            // Backenddan muvaffaqiyatli javob tekshiriladi
            if (ManagerAdd.response) {
                toast.success("Migrat tizimga qo'shildi ✅");
                resetFormattedData();
                return;
            } else {
                console.error("Response muvaffaqiyatsiz:", ManagerAdd.response);
                toast.error(
                    ManagerAdd.response?.message || "Xatolik yuz berdi, qayta urinib ko'ring!"
                );
            }
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            toast.error("Xatolik yuz berdi, qayta urinib ko'ring!");
        }
    };

    // Ma'lumotlarni tozalash funksiyasi
    const resetFormattedData = () => {
        formattedData.firstName = "";
        formattedData.lastName = "";
        formattedData.homeNumber = "";
        formattedData.middleName = "";
        formattedData.birthDate = null;
        formattedData.currentStatus = "";
        formattedData.birthCountry = "";
        formattedData.birthRegion = "";
        formattedData.birthDistrict = "";
        formattedData.birthVillage = "";
        formattedData.additionalAddress = null;
        formattedData.additionalInfo = null;
        formattedData.departureCountry = "";
        formattedData.departureRegion = "";
        formattedData.departureDistrict = "";
        formattedData.departureArea = null;
        formattedData.typeOfActivity = null;
        formattedData.leavingCountryDate = null;
        formattedData.returningUzbekistanDate = null;
        formattedData.reasonForLeaving = null;
        formattedData.phoneNumberDeparture = "";
        formattedData.suspiciousCases = null;
        formattedData.disconnectedTime = null;
    };


    useEffect(() => {
        CountryGet?.globalDataFunc();
    }, []);// tug'ilgan davlat 
    useEffect(() => {
        DepartureCountry?.globalDataFunc();
    }, [departureCountry]); // ketgan davlat 

    useEffect(() => {
        RegionGet?.globalDataFunc();
    }, [birthDistrict]); // tug'ilgan viloyat 
    useEffect(() => {
        GetdepartureRegion?.globalDataFunc();
    }, [departureCountry]);// ketgan viloyat 

    useEffect(() => {
        DiskGet?.globalDataFunc();
    }, [birthRegion]); // tug'ilgan tuman
    useEffect(() => {
        DepartureDistrictGet?.globalDataFunc();
    }, [departureRegion]); // ketgan tuman



    const filterFields = [
        { label: `${t("Ismi")}`, value: firstName, type: "text", setState: (value: string) => setFirstName(value.toUpperCase()), placeholder: `${t("Ismi")}` },
        { label: `${t("Familiya")}`, value: lastName, type: "text", setState: (value: string) => setLastName(value.toUpperCase()), placeholder: `${t("Familiya")}` },
        { label: `${t("Otasini ismi")}`, value: middleName, type: "text", setState: (value: string) => setMiddleName(value.toUpperCase()), placeholder: `${t("Otasini ismi")}` },
        { label: `${t("Tug’ilgan sanasi")}`, value: birthDate, type: "date", setState: setBirthDate, placeholder: `${t("Tug’ilgan sanasi")}` },
        { label: `${t("Uy telefon no'meri")}`, value: homeNumber, type: "number", setState: setHomeNumber, placeholder: `${t("Uy telefon no'meri")}`},
        { label: `${t("Qo'shimcha ma'lumot")}`, value: additionalInfo, type: "text", setState: setAdditionalInfo, placeholder: `${t("Qo'shimcha ma'lumot")}` },
        { label: `${t("Qo'shimcha manzil")}`, value: additionalAddress, type: "text", setState: setAdditionalAddress, placeholder: `${t("Qo'shimcha manzil")}` },
        { label: `${t("Ketgan joyi")}`, value: departureArea, type: "select", setState: setDepartureArea, placeholder: `${t("Ketgan joyi")}` },
        { label: `${t("Faoliyat turi")}`, value: typeOfActivity, type: "text", setState: setTypeOfActivity, placeholder: `${t("Faoliyat turi")}`},
        { label: `${t("Ketgan sana")}`, value: leavingCountryDate, type: "date", setState: setLeavingCountryDate, placeholder: `${t("Ketgan sana")}` },
        { label: `${t("Qaytgan sana")}`, value: returningUzbekistanDate, type: "date", setState: setReturningUzbekistanDate, placeholder: `${t("Qaytgan sana")}`},
        { label: `${t("Ketish sababi")}`, value: reasonForLeaving, type: "text", setState: setReasonForLeaving, placeholder: `${t("Ketish sababi")}` },
        { label: `${t("Telefon raqami")}`, value: phoneNumberDeparture, type: "number", setState: setPhoneNumberDeparture, placeholder: `${t("Telefon raqami")}` },
        { label: `${t("Shubhali holatlar")}`, value: suspiciousCases, type: "text", setState: setSuspiciousCases, placeholder: `${t("Shubhali holatlar")}` },
        { label: `${t("Aloqa uzilgan vaqt")}`, value: disconnectedTime, type: "date", setState: setDisconnectedTime, placeholder: `${t("Aloqa uzilgan vaqt")}` },
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
            {/* <SelectInput
                label={"Tug'ilgan davlat"}
                value={birthCountry || ""}
                handleChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    const nonce = selectedOption.getAttribute("nonce");
                    setBirthRegion(null);
                    setBirthDistrict(null);
                    setBirthCountry(e.target.value);
                    setBirthCountryNonce(nonce);
                }}
                options={countryOptions}
                className="mb-4"
            /> */}
            {/* <SelectInput
                label={"Tug'ilgan viloyat"}
                value={birthRegion || ""}
                handleChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    const nonce = selectedOption.getAttribute("nonce");
                    setBirthRegion(e.target.value);
                    setBirthRegionNonce(nonce);
                }}
                options={regioOption}
                className="mb-4"
                disabled={!RegionGet?.response || RegionGet.response.length === 0}
            /> */}

            {/* <SelectInput
                label={"Tug'ilgan tuman"}
                value={birthDistrict || ""}
                handleChange={(e) => {
                    setBirthDistrict(e.target.value);  
                }}
                options={diskOption}
                className="mb-4"
                disabled={!DiskGet?.response || DiskGet.response.length === 0}
            /> */}
            <SelectInput
                label={t("Tug'ilgan tuman")}
                value={birthDistrict || ""}
                handleChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex]; // Tanlangan option
                    // const nonce = selectedOption.getAttribute("nonce"); // nonce atributi
                    const name = selectedOption.textContent; // Optionning nomi (name)
                    const selectedValue = e.target.value; // Tanlangan qiymat

                    setBirthDistrict(selectedValue); // Tug'ilgan tumanning qiymatini saqlash
                    setBirthDistrictNoce(name || ""); // Tug'ilgan tumanning nomini saqlash (yangi state kerak bo'ladi)
                }}
                options={diskOption}
                className="mb-4"
            // disabled={!DiskGet?.response || DiskGet.response.length === 0}
            />


            <SelectInput
                label={t("Tug'ilgan MFY")}
                value={birthVillage || ""}
                handleChange={(e) => {
                    setBirthVillage(e.target.value);
                }}
                options={regioOption}
                className="mb-4"
            // disabled={!DiskGet?.response || DiskGet.response.length === 0}
            />
            <SelectInput
                label={t("Ketgan davlat")}
                value={departureCountry || ""}
                handleChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    const nonce = selectedOption.getAttribute("nonce");
                    setDepartureCountry(e.target.value);
                    setDepartureCountryNonce(nonce);
                }}
                options={departureCountryOptions}
                className="mb-4"
            />
            <SelectInput
                label={t("Ketgan viloyat")}
                value={departureRegion || ""}
                handleChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    const nonce = selectedOption.getAttribute("nonce"); // Nonce qiymatini olish
                    setDepartureRegion(e.target.value); // Viloyat ID'sini saqlash
                    setDepartureRegionNonce(nonce); // Nonce ni saqlash
                }}
                options={departureRegionOption}
                className="mb-4"
                disabled={!GetdepartureRegion?.response || GetdepartureRegion?.response?.length === 0}
            />

            <SelectInput
                label={t("Ketgan tuman")}
                value={departureDistrict || ""}
                handleChange={(e) => {
                    setDepartureDistrict(e.target.value);
                }}
                options={DepartureDistrictOption}
                className="mb-4"
                disabled={!DepartureDistrictGet?.response || DepartureDistrictGet?.response?.length === 0}
            />
            <SelectInput
                label={t("Statusni tanlang")}
                value={currentStatus || undefined }
                handleChange={(e) => setCurrentStatus(e.target.value)}
                options={options}
                className="w-full"
            />
            <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`col-span-4 px-12 py-2 rounded-xl mt-4 
                ${isFormValid ? "bg-[#0086D1] text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
            >
                {t("Ma’lumotlarni saqlash")}
            </button>
        </div>
    );
};

export default InfoCreate;

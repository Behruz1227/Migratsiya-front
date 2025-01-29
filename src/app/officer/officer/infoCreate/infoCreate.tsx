import React, {useEffect, useState} from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";
import {useGlobalRequest} from "../../../../helpers/functions/universal";
import {
    addMigrate,
    countryList,
    distList,
    getTuman,
    getVillage,
    mfyList,
    regionList
} from "../../../../helpers/api/api";
import PhoneNumberInput from "../../../../components/inputs/number-input";
import useUchaskavoyStore from "../../../../helpers/state-managment/uchaskavoy/uchaskavoyStore";
import SelectInput from "../../../../components/inputs/selectInput";
import {toast} from "sonner";
import {useTranslation} from "react-i18next";
import {optionGender} from "../../../../helpers/constants/const.ts";
import AntdSelect from "../../../../components/inputs/antd-select.tsx";

const InfoCreate: React.FC = () => {
    const {t} = useTranslation()
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        homeNumber,
        setHomeNumber,
        middleName,
        setMiddleName,
        birthDate,
        setBirthDate,
        currentStatus,
        setCurrentStatus,
        birthDistrict,
        setBirthDistrict,
        birthVillage,
        setBirthVillage,
        additionalAddress,
        setAdditionalAddress,
        additionalInfo,
        setAdditionalInfo,
        departureCountry,
        setDepartureCountry,
        departureRegion,
        setDepartureRegion,
        departureDistrict,
        setDepartureDistrict,
        departureArea,
        setDepartureArea,
        typeOfActivity,
        setTypeOfActivity,
        leavingCountryDate,
        setLeavingCountryDate,
        returningUzbekistanDate,
        setReturningUzbekistanDate,
        reasonForLeaving,
        setReasonForLeaving,
        phoneNumberDeparture,
        setPhoneNumberDeparture,
        suspiciousCases,
        setSuspiciousCases,
        disconnectedTime,
        setDisconnectedTime
    } = useUchaskavoyStore();
    const [departureCountryNonce, setDepartureCountryNonce] = useState<string | null>(null);
    const [departureRegionNonce, setDepartureRegionNonce] = useState<string | null>(null);
    const [birthCountryNonce, setBirthCountryNonce] = useState<string | null>(null);
    const [birthRegionNonce, setBirthRegionNonce] = useState<string | null>(null);
    const [workPlace, setWorkPlace] = useState("")
    const [gender, setGender] = useState("")
    const [liveDistrict, setLiveDistrict] = useState<any>("")
    const [liveDistrictId, setLiveDistrictId] = useState("")
    const [responsiblePerson, setResponsiblePerson] = useState("")
    const [reasonForReturn, setReasonForReturn] = useState("")
    const [married, setMarried] = useState("");
    const [knowForeignLanguage, setKnowForeignLanguage] = useState("");
    const [foreignLanguage, setForeignLanguage] = useState("");
    const [currentStatusReturn, setCurrentStatusReturn] = useState("")
    const [job, setJob] = useState("")
    const [medicalExam, setMedicalExam] = useState("")

    const CountryGet = useGlobalRequest(`${countryList}`, "GET");//tug'ilgan davlat
    const DepartureCountry = useGlobalRequest(`${countryList}`, "GET");// ketgan davlat
    const GetdepartureRegion = useGlobalRequest(`${regionList}?countryId=${departureCountry}`, "GET");// tug'ilgan viloyat
    const DepartureDistrictGet = useGlobalRequest(`${distList}?regionId=${departureRegion}`, "GET");// ketgan tuman 

    const RegionGet = useGlobalRequest(`${mfyList}?districtId=${birthDistrict}`, "GET");// tug'ilgan viloyat
    const getMfy = useGlobalRequest(getVillage, "GET");
    const districtList = useGlobalRequest(getTuman, "GET");

    const departureCountryOptions = DepartureCountry?.response
        ? DepartureCountry.response.map((country: any) => ({
            label: country.name,
            value: country.id,
            name: country.name,
        })) : []; // tug'ilgan davlat select

    const regionOption = getMfy?.response ? getMfy?.response.map((region: any) => ({
        label: region,
        value: region,
    })) : []; // tug'ilgan  viloyat

    const departureRegionOption = GetdepartureRegion?.response ? GetdepartureRegion?.response?.map((region: any) => ({
        label: region.name,
        value: region.id,
    })) : []; //ketgan viloyat

    const DepartureDistrictOption = DepartureDistrictGet?.response ? DepartureDistrictGet?.response?.map((region: any) => ({
        label: region.name,
        value: region.name,
    })) : []; //ketgan tuman

    const options = [
        {value: "QIDIRUVDA", label: t("Qidiruvda")},
        {value: "BIRIGADIR", label: t("Brigadir")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    const returnOptionType = [
        {value: "UZ_XOXISHI_BILAN_QAYTGAN", label: t("O‘z xohishi bilan qaytganlar")},
        {value: "DEPORTASIYA_BULIB_QAYTGAN", label: t("Deport bo‘lib qaytganlar")},
        {value: "VATANGA_QAYTISH_GUVOHNOMASI_BILAN_QAYTGAN", label: t("Vatanga qaytish guvohnomasi bilan qaytganlar")},
        {value: "MAVSUMIY_QAYTGAN", label: t("Mavsumiy qaytganlar")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    const maritalStatusOption = [
        {value: "OILALI", label: t("Oilali")},
        {value: "AJRASHGAN", label: t("Ajrashgan")},
        {value: "BUYDOQ", label: t("Bo’ydoq")},
    ];

    const districtOp: any[] = districtList?.response?.map((item: any) => ({
        value: item.id, label: item.name
    })) || [];

    const isFormValid =
        String(firstName)?.trim().length > 0 &&
        String(lastName)?.trim().length > 0 &&
        String(birthDate)?.trim().length > 0 &&
        String(departureCountry)?.trim().length > 0 &&
        String(departureRegion)?.trim().length > 0 &&
        String(phoneNumberDeparture)?.trim().length > 0 &&
        String(currentStatus)?.trim().length > 0;

    const isFormValidRequired = () => {
        if (isFormValid) {
            if (returningUzbekistanDate && reasonForReturn) return true;
            else if (!returningUzbekistanDate && !reasonForReturn) return true;
            else if (returningUzbekistanDate && !reasonForReturn) return false;
            else if (!returningUzbekistanDate && reasonForReturn) return false;
        } else return false;
    }

    const formattedData = {
        firstName: firstName || "",
        lastName: lastName || "",
        middleName: middleName || "",
        birthDate: birthDate || null,
        homeNumber: homeNumber?.replace(/[^0-9]/g, "") || "",
        currentStatus: currentStatus || "",
        birthCountry: birthCountryNonce || "",
        birthRegion: birthRegionNonce || "",
        birthDistrict: "",
        birthVillage: birthVillage || "",
        additionalInfo: additionalInfo || null,
        additionalAddress: additionalAddress || null,
        departureCountry: departureCountryNonce || "",
        departureRegion: departureRegionNonce || "",
        departureDistrict: departureDistrict || "",
        departureArea: departureArea || null,
        typeOfActivity: typeOfActivity || null,
        leavingCountryDate: leavingCountryDate || null,
        returningUzbekistanDate: returningUzbekistanDate || null,
        reasonForLeaving: reasonForLeaving || null,
        phoneNumberDeparture: phoneNumberDeparture?.replace(/[^0-9]/g, "") || "",
        suspiciousCases: suspiciousCases || null,
        disconnectedTime: disconnectedTime || null,
        workplace: workPlace ? workPlace : "",
        liveDistrict,
        createdBy: null,
        createdAt: null,
        updatedBy: null,
        updatedAt: null,
        gender,
        maritalStatus: married,
        guardianship: responsiblePerson,
        reasonForReturn,
        knowForeignLanguage,
        foreignLanguage,
        currentStatusReturn,
        job,
        medicalExam
    };

    const ManagerAdd = useGlobalRequest(addMigrate, "POST", formattedData);
    const handleSubmit = async () => {
        if (!isFormValidRequired()) return toast.error(t("Iltimos majburiy malumotlarni tuliq tuldirib chiqing! (*)"));

        try {
            await ManagerAdd.globalDataFunc();
            if (ManagerAdd.response || !ManagerAdd.response) {
                toast.success("Migrat tizimga qo'shildi ✅");
                resetFormattedData();
                return;
            } else {
                resetFormattedData()
                toast.error(ManagerAdd.response?.message || "Xatolik yuz berdi, qayta urinib ko'ring!");
            }
        } catch (error) {
            toast.error("Xatolik yuz berdi, qayta urinib ko'ring!");
            resetFormattedData()
        }
    };

    const resetFormattedData = () => {
        setFirstName("")
        setLastName("")
        setHomeNumber("")
        setMiddleName("")
        setBirthDate(0)
        setCurrentStatus("")
        setBirthCountryNonce("")
        setBirthRegionNonce("")
        setBirthDistrict("")
        setBirthVillage("")
        setAdditionalAddress("")
        setAdditionalInfo("")
        setDepartureCountry("")
        setDepartureRegion("")
        setDepartureDistrict("")
        setDepartureArea("")
        setTypeOfActivity("")
        setLeavingCountryDate(0)
        setReturningUzbekistanDate(0)
        setReasonForLeaving("")
        setPhoneNumberDeparture("")
        setSuspiciousCases("")
        setDisconnectedTime(0)
        setWorkPlace("");
        setGender("");
        setReasonForReturn("")
        setResponsiblePerson("")
        setMarried("")
        setForeignLanguage("")
        setKnowForeignLanguage("")
        setCurrentStatusReturn("")
        setJob("")
        setMedicalExam("")
        setLiveDistrictId("")
        setLiveDistrict("")
    };

    useEffect(() => {
        CountryGet?.globalDataFunc();
        getMfy?.globalDataFunc();
        districtList?.globalDataFunc();
    }, []);

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
        DepartureDistrictGet?.globalDataFunc();
    }, [departureRegion]); // ketgan tuman

    const filterFields = [
        {
            label: `${t("Ismi")}`,
            value: firstName,
            type: "text",
            setState: (value: string) => setFirstName(value.toUpperCase()),
            placeholder: `${t("Ismi")}`
        },
        {
            label: `${t("Familiya")}`,
            value: lastName,
            type: "text",
            setState: (value: string) => setLastName(value.toUpperCase()),
            placeholder: `${t("Familiya")}`
        },
        {
            label: `${t("Otasini ismi")}`,
            value: middleName,
            type: "text",
            setState: (value: string) => setMiddleName(value.toUpperCase()),
            placeholder: `${t("Otasini ismi")}`
        },
        {
            label: `${t("Tug’ilgan sanasi")}`,
            value: birthDate,
            type: "date",
            setState: setBirthDate,
            placeholder: `${t("Tug’ilgan sanasi")}`
        },
        {
            label: `${t("Uy telefon raqami")}`,
            value: homeNumber,
            type: "phone",
            setState: setHomeNumber,
            placeholder: `${t("Uy telefon raqami")}`
        },
        {
            label: `${t("Qo'shimcha ma'lumot")}`,
            value: additionalInfo,
            type: "text",
            setState: setAdditionalInfo,
            placeholder: `${t("Qo'shimcha ma'lumot")}`
        },
        {
            label: `${t("Qo'shimcha manzil")}`,
            value: additionalAddress,
            type: "text",
            setState: setAdditionalAddress,
            placeholder: `${t("Qo'shimcha manzil")}`
        },
        {
            label: `${t("Ketgan joyi")}`,
            value: departureArea,
            type: "select",
            setState: setDepartureArea,
            placeholder: `${t("Ketgan joyi")}`
        },
        {
            label: `${t("Faoliyat turi")}`,
            value: typeOfActivity,
            type: "text",
            setState: setTypeOfActivity,
            placeholder: `${t("Faoliyat turi")}`
        },
        {
            label: `${t("Ketgan sana")}`,
            value: leavingCountryDate,
            type: "date",
            setState: setLeavingCountryDate,
            placeholder: `${t("Ketgan sana")}`
        },
        {
            label: t("Qaytgan sana"),
            value: returningUzbekistanDate,
            type: "date",
            setState: setReturningUzbekistanDate,
            placeholder: t("Qaytgan sana")
        },
        {
            label: `${t("Ish joyi")}`,
            value: workPlace,
            type: "text",
            setState: setWorkPlace,
            placeholder: `${t("Ish joyi")}`
        },
        {
            label: `${t("Telefon raqam")}`,
            value: phoneNumberDeparture,
            type: "phone",
            setState: setPhoneNumberDeparture,
            placeholder: `${t("Telefon raqami")}`
        },
        {
            label: `${t("Shubhali holatlar")}`,
            value: suspiciousCases,
            type: "text",
            setState: setSuspiciousCases,
            placeholder: `${t("Shubhali holatlar")}`
        },
        {
            label: `${t("Aloqa uzilgan vaqt")}`,
            value: disconnectedTime,
            type: "date",
            setState: setDisconnectedTime,
            placeholder: `${t("Aloqa uzilgan vaqt")}`
        },
    ];

    const renderInputs = (fields: any) => {
        return fields.map((field: any, index: number) => {
            if (field.type === "text") {
                return (
                    <TextInput
                        key={index}
                        disabled={field.disabled}
                        label={field.label}
                        value={field.value}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                        className={"w-full"}
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
                        className={"w-full"}
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
                        className={"w-full"}
                    />
                );
            } else if (field.type === "phone") {
                return (
                    <div className="w-full">
                        <label
                            htmlFor="PhoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            {field.label}
                        </label>
                        <input
                            type="text"
                            id="PhoneNumber"
                            value={field.value}
                            onChange={(e) => {
                                let value = e.target.value.replace(/[^0-9]/g, "");

                                if (!value.startsWith("998")) value = "998";
                                if (value.length > 12) value = value.slice(0, 12);

                                let formattedValue = "+998";
                                if (value.length > 3) formattedValue += " (" + value.slice(3, 5);
                                if (value.length > 5) formattedValue += ") " + value.slice(5, 8);
                                if (value.length > 8) formattedValue += "-" + value.slice(8, 10);
                                if (value.length > 10) formattedValue += "-" + value.slice(10, 12);

                                field.setState(formattedValue);
                            }}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Telefon raqamingizni kiriting"
                            required
                        />
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="p-6 w-full">
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4"}>
                {renderInputs(filterFields)}
                <AntdSelect
                    label={t("Oylaviy holati")}
                    value={married}
                    handleChange={(e) => {
                        if (e === "BUYDOQ") setResponsiblePerson("")
                        setMarried(e)
                    }}
                    options={maritalStatusOption}
                />
                {renderInputs([{
                    label: `${t("Kafil shaxs")}`,
                    value: responsiblePerson,
                    type: "text",
                    setState: setResponsiblePerson,
                    placeholder: `${t("Kafil shaxs")}`,
                    disabled: !married || married === 'BUYDOQ',
                }])}
                <SelectInput
                    label={t("Tug'ilgan tuman")}
                    value={liveDistrictId}
                    handleChange={(e) => {
                        const name = e.target.options[e.target.selectedIndex];
                        setLiveDistrict(name?.textContent);
                        setLiveDistrictId(e.target.value);
                    }}
                    options={districtOp}
                    className="w-full"
                    pad={'p-2'}
                />
                <AntdSelect
                    label={t("Yashash MFY")}
                    value={birthVillage}
                    handleChange={(e) => setBirthVillage(e)}
                    options={regionOption}
                />
                <AntdSelect
                    label={t("Ketish sababi")}
                    value={reasonForLeaving}
                    handleChange={(e) => setReasonForLeaving(e)}
                    options={[
                        {label: t('Davolanish'), value: 'DAVOLANISH'},
                        {label: t('Turizm'), value: 'TURIZM'},
                        {label: t('Ish'), value: 'ISH'},
                        {label: t('O\'qish'), value: 'UQISH'},
                        {label: t('Boshqa'), value: 'BOSHQA'},
                    ]}
                />
                <SelectInput
                    label={t("Ketgan davlat")}
                    value={departureCountry || ""}
                    handleChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        setDepartureCountryNonce(selectedOption.textContent);
                        setDepartureCountry(e.target.value);
                    }}
                    options={departureCountryOptions}
                    className="w-full"
                    pad={'p-2'}
                />
                <SelectInput
                    label={t("Ketgan viloyat")}
                    value={departureRegion || ""}
                    handleChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        setDepartureRegionNonce(selectedOption.textContent);
                        setDepartureRegion(e.target.value);
                    }}
                    options={departureRegionOption}
                    className="w-full"
                    disabled={!GetdepartureRegion?.response || GetdepartureRegion?.response?.length === 0}
                    pad={'p-2'}
                />
                <AntdSelect
                    label={t("Ketgan tuman")}
                    value={departureDistrict || ""}
                    handleChange={(e) => setDepartureDistrict(e)}
                    options={DepartureDistrictOption}
                    disabled={!DepartureDistrictGet?.response || DepartureDistrictGet?.response?.length === 0}
                />
                <AntdSelect
                    label={t("Statusni tanlang")}
                    value={currentStatus}
                    handleChange={(e) => setCurrentStatus(e)}
                    options={options}
                />
                <AntdSelect
                    label={t("jins tanlang")}
                    value={gender}
                    handleChange={(e) => setGender(e)}
                    options={optionGender}
                />
                <AntdSelect
                    label={t("status type")}
                    value={reasonForReturn}
                    handleChange={(e) => setReasonForReturn(e)}
                    options={returnOptionType}
                />
                <AntdSelect
                    options={[
                        {value: 'true', label: t('Ha')},
                        {value: 'false', label: t("Yo'q")}
                    ]}
                    value={knowForeignLanguage}
                    handleChange={e => {
                        if (knowForeignLanguage !== 'true') setForeignLanguage('')
                        setKnowForeignLanguage(e)
                    }}
                    label={t("Chet tilini biladimi")}
                />
                {renderInputs([{
                    label: t("Chet tilini bilish darajasini kiriting"),
                    value: foreignLanguage,
                    type: "text",
                    setState: setForeignLanguage,
                    placeholder: t("Chet tilini bilish darajasini kiriting"),
                    disabled: knowForeignLanguage !== 'true',
                }])}
                <AntdSelect
                    options={[
                        {value: "BANDLIGI_TAMINLANGAN", label: t("Bandligi taminlangan")},
                        {value: "VAQTINCHA_ISHSIZ", label: t("Vaqrincha ishsiz")},
                        {value: "QAYTIB_KETISH_ISTAGIDA", label: t("Qaytib ketish istagida")}
                    ]}
                    handleChange={e => {
                        if (currentStatusReturn !== "BANDLIGI_TAMINLANGAN") setJob("")
                        setCurrentStatusReturn(e)
                    }}
                    value={currentStatusReturn}
                    label={t("Qaytganlarni xozirgi xolati")}
                />
                {renderInputs([{
                    label: t("Bandligi taminlangan"),
                    value: job,
                    type: "text",
                    setState: setJob,
                    placeholder: t("Bandligi taminlangan"),
                    disabled: currentStatusReturn !== 'BANDLIGI_TAMINLANGAN',
                }])}
                <AntdSelect
                    options={[
                        {value: "true", label: t("Ha")},
                        {value: "false", label: t("Yo'q")},
                    ]}
                    handleChange={e => setMedicalExam(e)}
                    value={medicalExam}
                    label={t("Tibbiy ko’rikdan o’tganligi")}
                />
            </div>
            <button
                disabled={!isFormValidRequired}
                onClick={handleSubmit}
                className={`w-full py-2 rounded-xl mt-4 
                ${isFormValidRequired() ? "bg-[#0086D1] text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
            >
                {t("Ma’lumotlarni saqlash")}
            </button>
        </div>
    );
};

export default InfoCreate;

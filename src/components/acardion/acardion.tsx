import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {
    FaGenderless, FaHandHoldingMedical, FaPhoneAlt, FaPlane, FaRegCalendarAlt, FaRegUserCircle
} from "react-icons/fa";
import {MdDateRange, MdFamilyRestroom, MdLocationPin, MdOutlineWork, MdPersonSearch} from "react-icons/md";
import {RiArrowDropDownFill, RiArrowDropRightFill} from "react-icons/ri";
import {TbPlugConnectedX, TbStatusChange} from "react-icons/tb";
import {GiReturnArrow} from "react-icons/gi";
import {LuLanguages} from "react-icons/lu";
import {FaPerson} from "react-icons/fa6";

export interface UserCardData {
    additionalAddress: string | null;
    birthDate: string | null;
    birthDistrict: string | null;
    departureDate: string | null;
    departureFinishDate?: string | null;
    disconnectedTime: string | null;
    migrateFirstName: string | null;
    migrateLastName: string | null;
    migrateMiddleName: string | null;
    phoneNumber: string | null;
    suspiciousCases: string | null;
    typeOfActivity: string | null;
    phoneNumberDeparture: string | null;
    birthVillage: string | null;
    departureCountry: string | null;
    departureRegion: string | null;
    departureDistrict: string | null;
    additionalInfo: string | null;
    workplace: string | null;
    createdBy: string | null;
    createdAt: string | null;
    updatedBy: string | null;
    updatedAt: string | null;
    maritalStatus: string | null;
    guardianship: string | null;
    gender: string | null;
    reasonForReturn: string | null;
    foreignLanguage: string | null;
    currentStatusReturn: string | null;
    medicalExam: string | null;
}

const Accordion: React.FC<{ userData: UserCardData }> = ({userData}) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const styles = {
        paragraph: 'text-gray-700 text-sm sm:text-base flex gap-3 items-center justify-between',
        box: 'flex items-center gap-2',
        icons: 'text-blue-500'
    }

    const returnOptionType = [
        {value: "UZ_XOXISHI_BILAN_QAYTGAN", label: t("O‘z xohishi bilan qaytganlar")},
        {value: "DEPORTASIYA_BULIB_QAYTGAN", label: t("Deport bo‘lib qaytganlar")},
        {value: "VATANGA_QAYTISH_GUVOHNOMASI_BILAN_QAYTGAN", label: t("Vatanga qaytish guvohnomasi bilan qaytganlar")},
        {value: "MAVSUMIY_QAYTGAN", label: t("Mavsumiy qaytganlar")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    const statusForUzb = [
        {value: "BANDLIGI_TAMINLANGAN", label: t("Bandligi taminlangan")},
        {value: "VAQTINCHA_ISHSIZ", label: t("Vaqrincha ishsiz")},
        {value: "QAYTIB_KETISH_ISTAGIDA", label: t("Qaytib ketish istagida")}
    ]

    return (
        <div className="border bg-gray-50 border-blue-500 rounded-lg shadow-md mb-5">
            {/* ==========Accordion Header======== */}
            <div
                className={isOpen
                    ? "flex flex-col md:flex-row md:justify-between rounded-lg items-start md:items-center p-4 cursor-pointer"
                    : "flex rounded-lg flex-col md:flex-row md:justify-between items-start md:items-center p-4 cursor-pointer hover:bg-gray-100"
                }
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center space-x-2">
                    <FaRegUserCircle className={styles.icons} size={25}/>
                    <span className="font-medium text-lg md:text-xl">
                        {`${userData?.migrateFirstName || "--"} ${userData?.migrateLastName || ""} ${userData?.migrateMiddleName || ""}`}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm md:text-lg mt-2 md:mt-0">
                    <MdLocationPin className={styles.icons} size={25}/>
                    {`${userData?.birthDistrict || "--"}`}
                </div>
                <span className="text-gray-500 text-lg md:text-xl mt-2 md:mt-0">
                    {isOpen ? <RiArrowDropDownFill size={25}/> : <RiArrowDropRightFill size={25}/>}
                </span>
            </div>

            {/* ============Accordion Body=========== */}
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}
            >
                <div className="p-4 py-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaRegCalendarAlt className={styles.icons} size={25}/>
                                <strong>{t("Tug'ilgan sanasi")}:</strong>
                            </div>
                            {userData.birthDate}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdDateRange className={styles.icons} size={25}/>
                                <strong>{t("Ketgan vaqti")}:</strong>
                            </div>
                            {userData.departureDate}
                        </p>
                        {userData.departureFinishDate && (
                            <p className={styles.paragraph}>
                                <div className={styles.box}>
                                    <MdDateRange className={styles.icons} size={25}/>
                                    <strong>{t("Kelgan vaqti")}:</strong>
                                </div>
                                {userData.departureFinishDate}
                            </p>
                        )}
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaPhoneAlt className={styles.icons} size={25}/>
                                <strong>{t("Uy telefon raqami")}:</strong>
                            </div>
                            {userData.phoneNumberDeparture}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaPhoneAlt className={styles.icons} size={25}/>
                                <strong>{t("Telefon raqami")}:</strong>
                            </div>
                            {userData.phoneNumber}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <TbPlugConnectedX className={styles.icons} size={25}/>
                                <strong>{t("Aloqasi uzilgan vaqti")}:</strong>
                            </div>
                            {userData?.disconnectedTime}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdLocationPin className={styles.icons} size={25}/>
                                <strong>{t("Yashash MFY")}:</strong>
                            </div>
                            {userData?.birthVillage}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaPlane className={styles.icons} size={25}/>
                                <strong>{t("Ketgan manzili")}:</strong>
                            </div>
                            {`${userData?.departureCountry || ''}, ${userData?.departureRegion || ''}, ${userData.departureDistrict || ''}`}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdLocationPin className={styles.icons} size={25}/>
                                <strong>{t("Qo'shimcha manzil")}:</strong>
                            </div>
                            {userData?.additionalAddress}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdOutlineWork className={styles.icons} size={25}/>
                                <strong>{t("Qo'shimcha ma'lumot")}:</strong>
                            </div>
                            {userData?.additionalInfo}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdOutlineWork className={styles.icons} size={25}/>
                                <strong>{t("Ish joyi")}:</strong>
                            </div>
                            {userData?.workplace}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <TbPlugConnectedX className={styles.icons} size={25}/>
                                <strong>{t("Faoliyat turi")}:</strong>
                            </div>
                            {userData?.typeOfActivity}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdLocationPin className={styles.icons} size={25}/>
                                <strong>{t("Kim tomonidan va qachon qushilgani")}:</strong>
                            </div>
                            {userData?.createdBy} {userData?.createdAt}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <MdLocationPin className={styles.icons} size={25}/>
                                <strong>{t("Kim tomonidan va qachon taxrirlangani")}:</strong>
                            </div>
                            {userData?.updatedBy} {userData?.updatedAt}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaGenderless className={styles.icons} size={25}/>
                                <strong>{t("Jins")}:</strong>
                            </div>
                            {userData?.gender === 'MALE' ? t('Erkak') : userData?.gender === 'FEMALE' ? t('Ayol') : ''}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <GiReturnArrow className={styles.icons} size={25}/>
                                <strong>{t("status type")}:</strong>
                            </div>
                            {returnOptionType.map(i => {
                                return i.value === userData?.reasonForReturn ? i.label : ''
                            })}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <TbStatusChange className={styles.icons} size={25}/>
                                <strong>{t("Qaytganlarni xozirgi xolati")}:</strong>
                            </div>
                            {statusForUzb.map(i => {
                                return i.value === userData?.currentStatusReturn ? i.label : ''
                            })}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <LuLanguages className={styles.icons} size={25}/>
                                <strong>{t("Chet tilini bilish darajasi")}:</strong>
                            </div>
                            {userData?.foreignLanguage}
                        </p>
                        <p className={styles.paragraph}>
                            <div className={styles.box}>
                                <FaHandHoldingMedical className={styles.icons} size={25}/>
                                <strong>{t("Tibbiy ko’rikdan o’tganligi")}:</strong>
                            </div>
                            {userData?.medicalExam === 'true' ? t('Ha') : userData?.medicalExam === 'false' ? t("Yo'q") : ''}
                        </p>
                        {(userData?.maritalStatus === 'OILALI' || userData?.maritalStatus === 'AJRASHGAN') && <>
                            <p className={styles.paragraph}>
                                <div className={styles.box}>
                                    <MdFamilyRestroom className={styles.icons} size={25}/>
                                    <strong>{t("Oylaviy holati")}:</strong>
                                </div>
                                {userData?.maritalStatus === 'OILALI' ? t('Oilali') : t('Ajrashgan')}
                            </p>
                            <p className={styles.paragraph}>
                                <div className={styles.box}>
                                    <FaPerson className={styles.icons} size={25}/>
                                    <strong>{t("Kafil shaxs")}:</strong>
                                </div>
                                {userData?.guardianship}
                            </p>
                        </>}
                        <p className={`${styles.paragraph} text-green-500`}>
                            <div className={styles.box}>
                                <MdPersonSearch className={styles.icons} size={25}/>
                                <strong>{t("Shubhali holatlar")}:</strong>
                            </div>
                            {userData?.suspiciousCases}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;

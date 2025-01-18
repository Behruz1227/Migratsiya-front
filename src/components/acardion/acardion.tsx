import React, {useState} from "react";
import {CiCalendarDate} from "react-icons/ci";
import {
    FaPhoneAlt,
    FaPlane,
    FaRegCalendarAlt,
    FaRegUserCircle,
} from "react-icons/fa";
import {MdLocationPin, MdOutlineWork, MdPersonSearch} from "react-icons/md";
import {RiArrowDropDownFill, RiArrowDropRightFill} from "react-icons/ri";
import {TbPlugConnectedX} from "react-icons/tb";
import {useTranslation} from "react-i18next";

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
}

const Accordion: React.FC<{ userData: UserCardData }> = ({userData}) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border bg-gray-50 border-blue-500 rounded-lg shadow-md mb-5">
            {/* Accordion Header */}
            <div
                className={isOpen ? "flex flex-col md:flex-row md:justify-between rounded-lg items-start md:items-center p-4 cursor-pointer" : "flex rounded-lg flex-col md:flex-row md:justify-between items-start md:items-center p-4 cursor-pointer hover:bg-gray-100"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center space-x-2">
          <span className="text-blue-500 text-xl">
            <FaRegUserCircle/>
          </span>
                    <span className="font-medium text-lg md:text-xl">
            {`${userData?.migrateFirstName || "--"} ${userData?.migrateLastName || ""} ${userData?.migrateMiddleName || ""}`}
          </span>
                </div>
                <div className="flex items-center text-xl space-x-2 text-blue-500 mt-2 md:mt-0">
          <span>
            <MdLocationPin/>
          </span>
                    <span className="font-medium text-sm md:text-base">
            {`${userData?.birthDistrict || "--"}`}
          </span>
                </div>
                <span className="text-gray-500 text-lg md:text-xl mt-2 md:mt-0">
          {isOpen ? <RiArrowDropDownFill size={25}/> : <RiArrowDropRightFill size={25}/>}
        </span>
            </div>

            {/* Accordion Body */}
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="p-4 py-6 bg-gray-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-5">
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <FaRegCalendarAlt/>
                </span>{" "}
                                <strong>{t("Tug'ilgan sanasi")}:</strong> {userData.birthDate}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <CiCalendarDate/>
                </span>{" "}
                                <strong>{t("Ketgan vaqti")}:</strong> {userData.departureDate}
                            </p>
                            {userData.departureFinishDate && (
                                <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                    <span className="text-blue-500 text-xl">
                      <CiCalendarDate/>
                    </span>{" "}
                                    <strong>{t("Kelgan vaqti")}:</strong> {userData.departureFinishDate}
                                </p>
                            )}
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <FaPhoneAlt/>
                </span>{" "}
                                <strong>{t("Uy telefon raqami")}:</strong> {userData.phoneNumberDeparture}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <FaPhoneAlt/>
                </span>{" "}
                                <strong>{t("Telefon raqami")}:</strong> {userData.phoneNumber}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <TbPlugConnectedX/>
                </span>{" "}
                                <strong>{t("Aloqasi uzilgan vaqti")}:</strong>{" "}
                                {userData?.disconnectedTime}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdLocationPin/>
                </span>{" "}
                                <strong>{t("Yashash MFY")}:</strong> {userData?.birthVillage}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdLocationPin/>
                </span>{" "}
                                <strong>{t("Kim tomonidan va qachon qushilgani")}:</strong> {userData?.createdBy} {userData?.createdAt}
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <FaPlane/>
                </span>{" "}
                                <strong>{t("Ketgan manzili")}:</strong> {`${userData?.departureCountry || ''}, ${userData?.departureRegion || ''}, ${userData.departureDistrict || ''}`}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdLocationPin/>
                </span>{" "}
                                <strong>{t("Qo'shimcha manzil")}:</strong>{userData?.additionalAddress}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdOutlineWork/>
                </span>{" "}
                                <strong>{t("Qo'shimcha ma'lumot")}:</strong>{userData?.additionalInfo}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdOutlineWork/>
                </span>{" "}
                                <strong>{t("Ish joyi")}:</strong>{userData?.workplace}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <TbPlugConnectedX/>
                </span>{" "}
                                <strong>{t("Faoliyat turi")}:</strong>{" "}
                                {userData?.typeOfActivity}
                            </p>
                            <p className="font-medium text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdPersonSearch/>
                </span>{" "}
                                <strong>{t("Kim tomonidan va qachon taxrirlangani")}:</strong> {userData?.updatedBy} {userData?.updatedAt}
                            </p>
                            <p className="text-green-500 font-medium text-sm sm:text-base flex gap-3 items-center">
                <span className="text-blue-500 text-xl">
                  <MdPersonSearch/>
                </span>{" "}
                                <strong>{t("Shubhali holatlar")}:</strong> {userData?.suspiciousCases}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;

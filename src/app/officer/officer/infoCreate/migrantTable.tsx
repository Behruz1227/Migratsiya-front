import React, { useState, useEffect } from "react";
import Tables, { IThead } from "../../../../components/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import { editMigrate, getMigrate, deleteMigrate } from "../../../../helpers/api/api";
import Modal from "../../../../components/modal/modal";
import TextInput from "../../../../components/inputs/text-input";
import { toast } from "sonner";
import useUchaskavoyStore from "../../../../helpers/state-managment/uchaskavoy/uchaskavoyStore";
import DateInput from "../../../../components/inputs/date-input";
import PhoneNumberInput from "../../../../components/inputs/number-input";
import SelectInput from "../../../../components/inputs/selectInput";
import { Pagination } from "antd";
import useFilterStore from "../../../../helpers/state-managment/filterStore/filterStore";
import { useTranslation } from "react-i18next";


const MigrantTable: React.FC = () => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [editMigrateid, setEditMigrateid] = useState<string>("");
  const { t } = useTranslation()

  const { filterName, departureCountryFilter, departureRegionFilter, departureDistrictFilter, departureStartFilter, birthFinishFilter, birthStartFilter, currentStatusFilter } = useFilterStore();
  const MigrateDelete = useGlobalRequest(`${deleteMigrate}/${deleteConfirm}`, "DELETE");

  const getDynamicUrl = () => {
    const queryParams: string = [
      filterName ? `fio=${filterName}` : '',
      departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
      departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
      departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
      departureStartFilter ? `departureStart=${departureStartFilter}` : '',
      birthStartFilter ? `birthStart=${birthStartFilter}` : '',
      birthFinishFilter ? `birthFinish=${birthFinishFilter}` : '',
      currentStatusFilter ? `currentStatus=${currentStatusFilter}` : '',
      page ? `page=${page}` : '',
    ]
      .filter(Boolean) // Bo'sh qiymatlarni chiqarib tashlash
      .join('&');

    return `${getMigrate}?${queryParams ? `${queryParams}&` : ''}`;
  };

  const dynamicUrl = getDynamicUrl();

  const MigrateGet = useGlobalRequest(dynamicUrl, "GET");


  // const MigrateGet = useGlobalRequest(`${getMigrate}?fio=${filterName}&departureCountry=${departureCountryFilter}&departureRegion=${departureRegionFilter}
  //   &departureDistrict=${departureDistrictFilter}&departureStart=${departureStartFilter}&birthStart=${birthStartFilter}&birthFinish=${birthFinishFilter}&currentStatus=${currentStatusFilter}&page=${page}&size=10`, "GET");


  //  const MigrateGet = useGlobalRequest(`${getMigrate}?page=${page}&size=10`, "GET");

  const { firstName, setFirstName, lastName, setLastName, homeNumber, setHomeNumber, middleName, setMiddleName, birthDate, setBirthDate, currentStatus, setCurrentStatus, birthCountry, setBirthCountry,
    birthRegion, setBirthRegion, birthDistrict, setBirthDistrict, birthVillage, setBirthVillage, additionalAddress, setAdditionalAddress, additionalInfo, setAdditionalInfo, departureCountry, setDepartureCountry, departureRegion, setDepartureRegion,
    departureDistrict, setDepartureDistrict, departureArea, setDepartureArea, typeOfActivity, setTypeOfActivity, leavingCountryDate, setLeavingCountryDate, returningUzbekistanDate, setReturningUzbekistanDate,
    reasonForLeaving, setReasonForLeaving, phoneNumberDeparture, setPhoneNumberDeparture, suspiciousCases, setSuspiciousCases, disconnectedTime, setDisconnectedTime } = useUchaskavoyStore();

  const cancelDelete = () => setDeleteConfirm(null);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await MigrateDelete.globalDataFunc();
        if (MigrateDelete.response) {
          await MigrateGet.globalDataFunc();
          toast.success("Migrat ma'lumotlari  o'chirildi ✅");
          setDeleteConfirm(null);
        } else if (MigrateDelete.error) {
          toast.error("Xatolik yuz berdi. O'chirishni qayta urinib ko'ring.");
        }
      } catch (error) {

      }
    }
  };

  const handleEditClick = async (item: any) => {
    setFirstName(item.firstName)
    setLastName(item.lastName)
    setMiddleName(item.middleName)
    setBirthDate(item.birthDate)
    setHomeNumber(item.homeNumber)
    setCurrentStatus(item.currentStatus)
    setBirthCountry(item.birthCountry)
    setBirthRegion(item.birthRegion)
    setBirthDistrict(item.birthDistrict)
    setBirthVillage(item.birthVillage)
    setAdditionalInfo(item.additionalInfo)
    setAdditionalAddress(item.additionalAddress)
    setDepartureCountry(item.departureCountry)
    setDepartureRegion(item.departureRegion)
    setDepartureDistrict(item.departureDistrict)
    setDepartureArea(item.departureArea)
    setTypeOfActivity(item.typeOfActivity)
    setLeavingCountryDate(item.leavingCountryDate)
    setReturningUzbekistanDate(item.returningUzbekistanDate)
    setReasonForLeaving(item.reasonForLeaving)
    setPhoneNumberDeparture(item.phoneNumberDeparture)
    setSuspiciousCases(item.suspiciousCases)
    setDisconnectedTime(item.disconnectedTime)
    // setSelectedId(item.id);
    setIsModalOpen(true);
    setEditMigrateid(item.id)
  };

  // const isFormValid =
  //   String(firstName)?.trim().length > 0 &&
  //   String(lastName)?.trim().length > 0 &&
  //   String(birthDate)?.trim().length > 0 &&
  //   String(birthCountry)?.trim().length > 0 &&
  //   String(birthRegion)?.trim().length > 0 &&
  //   String(departureCountry)?.trim().length > 0 &&
  //   String(departureRegion)?.trim().length > 0 &&
  //   String(departureDistrict)?.trim().length > 0 &&
  //   String(phoneNumberDeparture)?.trim().length > 0 &&
  //   String(currentStatus)?.trim().length > 0;
  // String(phoneNumberDeparture)?.trim().length > 0;

  const requestData = {
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    birthDate: birthDate,
    homeNumber: homeNumber,
    currentStatus: currentStatus,
    birthCountry: birthCountry,
    birthRegion: birthRegion,
    birthDistrict: birthDistrict,
    birthVillage: birthVillage,
    additionalInfo: additionalInfo,
    additionalAddress: additionalAddress,
    departureCountry: departureCountry,
    departureRegion: departureRegion,
    departureDistrict: departureDistrict,
    departureArea: departureArea,
    typeOfActivity: typeOfActivity,
    leavingCountryDate: leavingCountryDate,
    returningUzbekistanDate: returningUzbekistanDate,
    reasonForLeaving: reasonForLeaving,
    phoneNumberDeparture: phoneNumberDeparture,
    suspiciousCases: suspiciousCases,
    disconnectedTime: disconnectedTime,
  };
  const MigrateEdit = useGlobalRequest(`${editMigrate}/${editMigrateid}`, "PUT", requestData);



  const options = [
    { value: "QIDIRUVDA", label: "Qidiruvda" },
    { value: "BIRIGADIR", label: "Brigadir" },
    { value: "BOSHQA", label: "Boshqa" },
  ];

  const tableHeaders: IThead[] = [
    { id: 1, name: `${t('T/r')}` },
    { id: 2, name: `${t("F.I.O.")}` },
    { id: 3, name: `${t("Otasini ismi")}` },
    { id: 4, name: `${t("Tug'ilgan kun")}` },
    { id: 5, name: `${t("Uy telefon no'meri")}` },
    { id: 6, name: `${t("Migrant holati")}`},
    { id: 7, name: `${t("Tug'ilgan tumani")}` },
    { id: 8, name: `${t("Tug'ilgan qishloq")}` },
    { id: 9, name: `${t("Qo'shimcha ma'lumot")}` },
    { id: 10, name: `${t("Migrant ketgan davlat")}`},
    { id: 11, name: `${t("Migrant ketgan viloyat")}` },
    { id: 12, name: `${t("Migrant ketgan tuman")}`},
    { id: 13, name: `${t("O'zbekistondan chiqish sanasi")}` },
    { id: 14, name:  `${t("O'zbekistonga qaytish sanasi")}`},
    { id: 15, name: `${t("Migrant telefon no'meri")}` },
    { id: 16, name: `${t("Migrant bilan a'loqa uzilgan vaqt")}`},
    { id: 17, name: `${t("Migrant o'zgartirish")}` },
  ];
  useEffect(() => {
    MigrateGet.globalDataFunc();
    if (MigrateGet.response && MigrateGet.response.totalElements < 10) setPage(0)
  }, [page, filterName, departureCountryFilter, departureRegionFilter, departureDistrictFilter,
    departureStartFilter, birthFinishFilter, currentStatusFilter, birthStartFilter,]);

    
  const handleSubmit = async () => {
    try {
      await MigrateEdit.globalDataFunc();
      await MigrateGet.globalDataFunc();
      console.log();
      
      closeModal();
      if (MigrateEdit.response || !MigrateGet.response) {
        toast.success(t("Migrate ma'lumotlari o'zgartirildi"))
      } else {
        toast.error(t("Migrate ma'lumotlari o'zgartirilmadi"))
      }
    } catch (error) {
    }
  };


  return (
    <div>
      {MigrateGet?.loading ? (
        <div className="text-center">{t("Ma'lumot yuklanmoqda ....")}</div>
      ) : MigrateGet?.error ? (
        <div>Error: {MigrateGet.error}</div>
      ) : MigrateGet?.response?.object?.length === 0 ? (
        <div className="text-center">
          {t("Ma'lumot topilmadi")}
        </div>
      ) : (
        <div>
          <Tables thead={tableHeaders}>
            {MigrateGet?.response?.object?.map((item: any, index: number) => (
              <tr key={item.id} className="hover:bg-blue-300 border-b">
                <td className="border-b border-[#eee]  p-5">
                  <p className="text-black">
                    {(page * 10) + index + 1}
                  </p>
                </td>
                <td className="p-5">{item.firstName} {item.lastName}</td>
                <td className="p-5">{item.middleName}</td>
                <td className="p-5">{item.birthDate}</td>
                <td className="p-5">{item.homeNumber}</td>
                <td className={`p-5 ${item.currentStatus === "QIDIRUVDA" ? "text-red-600 font-bold" : "text-blue-600 font-bold"}`}>
                  {item.currentStatus}
                </td>
                {/* <td className="p-5">{item.birthCountry}</td> */}
                {/* <td className="p-5">{item.birthRegion}</td> */}
                <td className="p-5">{item.birthDistrict}</td>
                <td className="p-5">{item.birthVillage}</td>
                <td className="p-5">{item.additionalInfo}</td>
                <td className="p-5">{item.departureCountry}</td>
                <td className="p-5">{item.departureRegion}</td>
                <td className="p-5">{item.departureDistrict}</td>
                <td className="p-5">{item.leavingCountryDate}</td>
                <td className="p-5">{item.returningUzbekistanDate}</td>
                <td className="p-5">{item.phoneNumberDeparture}</td>
                <td className="p-5">{item.disconnectedTime}</td>
                <td className="p-5 flex justify-center space-x-4">
                  <button className="text-[#0086D1] hover:text-blue-700" onClick={() => handleEditClick(item)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => setDeleteConfirm(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </Tables>
        </div>
      )}

      <Pagination
        showSizeChanger={false}
        responsive={true}
        defaultCurrent={1} 
        total={
          MigrateGet.response && MigrateGet.response.totalElements > 0
            ? MigrateGet.response.totalElements
            : 0 
        }
        onChange={(page: number) => setPage(page-1)} 
        rootClassName="mt-8 mb-5"
      />

      {deleteConfirm && (
        <Modal isOpen={true} onClose={cancelDelete} mt="mt-5">
          <div className="mb-10 mt-2 font-bold text-xl text-center p-3">
            <h1>{t("Xaqiqatdan ham shu migrantni  o'chirmoqchimisiz")}</h1>
          </div>
          <div className="flex justify-center items-center space-x-14 ">
            <button onClick={cancelDelete} className="bg-red-500 text-white px-6 py-2 rounded-xl">{t("Yopish")}</button>
            <button
              onClick={handleConfirmDelete}
              className={`bg-[#0086D1] text-white px-6 py-2 rounded-xl `}
            >
              {MigrateDelete.response ? `${t("O'chirish")}` : `${"O'chirish"}`}
            </button>
          </div>
        </Modal>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} mt="mt-6">
          <div className="flex justify-center items-center space-x-4">
            {/* <h2 className="text-2xl font-bold">{selectedItem ? "Migrantni tahrirlash" : "Yangi migrant yaratish"}</h2> */}
          </div>
          <div className="w-full flex flex-col gap-3 items-center justify-center">
            <div className="w-full">
              <TextInput
                label={t("Ism")}
                value={firstName || ""}
                type="text"
                handleChange={(e) => setFirstName(e.target.value)}
                placeholder={t("Ism kiriting")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Familiya")}
                value={lastName || ""}
                type="text"
                handleChange={(e) => setLastName(e.target.value)}
                placeholder={t("Familiya kiritng")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Otasini ismi")}
                value={middleName || ""}
                type="text"
                handleChange={(e) => setMiddleName(e.target.value)}
                placeholder={t("Otasini ismini kiriting")}
              />
            </div>
            <div className="w-full">
              <DateInput
                label={t("Tug'ilgan kuni")}
                value={birthDate || ""}
                handleChange={(e) => setBirthDate(+e.target.value)}
                placeholder={t("Tug'ilgan kunini kiriting")}
              />
            </div>
            <div className="w-full">
              <PhoneNumberInput
                label={t("Telefon no'mer")}
                value={homeNumber || 0}
                handleChange={(e) => setHomeNumber(e.target.value)}
                placeholder={t("Telefon no'merini kiriting")}
              />
            </div>
            <div className="w-full">
              <SelectInput
                label={t("Statusni tanlang")}
                value={currentStatus || ""}
                handleChange={(e) => setCurrentStatus(e.target.value)}
                options={options}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Tug'ilgan davlat")}
                value={birthCountry || ""}
                type="text"
                handleChange={(e) => setBirthCountry(e.target.value)}
                placeholder={t("Tug'ilgan davlat")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Tug'ilgan viloyat")}
                value={birthRegion || ""}
                type="text"
                handleChange={(e) => setBirthRegion(e.target.value)}
                placeholder={t("Tug'ilgan viloyat")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Tug'ilgan tuman")}
                value={birthDistrict || ""}
                type="text"
                handleChange={(e) => setBirthDistrict(e.target.value)}
                placeholder={t("Tug'ilgan tuman")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Tug'ilgan qishloq")}
                value={birthVillage || ""}
                type="text"
                handleChange={(e) => setBirthVillage(e.target.value)}
                placeholder={t("Tug'ilgan qishloq")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Qo'shimcha ma'lumot")}
                value={additionalInfo || ""}
                type="text"
                handleChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder={t("Qo'shimcha ma'lumot")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Qo'shimcha manzil")}
                value={additionalAddress || ""}
                type="text"
                handleChange={(e) => setAdditionalAddress(e.target.value)}
                placeholder={t("Qo'shimcha manzil")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Migrant ketgan davlat")}
                value={departureCountry || ""}
                type="text"
                handleChange={(e) => setDepartureCountry(e.target.value)}
                placeholder={t("Migrant ketgan davlat")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Migrant ketgan viloyat")}
                value={departureRegion || ''}
                type="text"
                handleChange={(e) => setDepartureRegion(+e.target.value)}
                placeholder={t("Migrant ketgan viloyat")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Migrant ketgan tuman")}
                value={departureDistrict || ""}
                type="text"
                handleChange={(e) => setDepartureDistrict(e.target.value)}
                placeholder={t("Migrant ketgan tuman")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Ketish manzili")}
                value={departureArea || ""}
                type="text"
                handleChange={(e) => setDepartureArea(e.target.value)}
                placeholder={t("Ketish manzili")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Ishlash joyi")}
                value={typeOfActivity || ""}
                type="text"
                handleChange={(e) => setTypeOfActivity(e.target.value)}
                placeholder={t("Ishlash joyi")}
              />
            </div>
            <div className="w-full">
              <DateInput
                label={t("O'zbekkistondan chiqib ketgan sana")}
                value={leavingCountryDate || ""}
                handleChange={(e) => setLeavingCountryDate(+e.target.value)}
                placeholder={t("O'zbekkistondan chiqib ketgan sana")}
              />
            </div>
            <div className="w-full">
              <DateInput
                label={t("O'zbekistonga qaytgan sana")}
                value={returningUzbekistanDate || ""}
                handleChange={(e) => setReturningUzbekistanDate(+e.target.value)}
                placeholder={t("O'zbekistonga qaytgan sana")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Ketish sababi")}
                value={reasonForLeaving || ""}
                type="text"
                handleChange={(e) => setReasonForLeaving(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="w-full">
              <PhoneNumberInput
                label={t("Migrant telefon no'meri")}
                value={phoneNumberDeparture || 0}
                handleChange={(e) => setPhoneNumberDeparture(e.target.value)}
                placeholder={t("Migrant telefon no'meri")}
              />
            </div>
            <div className="w-full">
              <TextInput
                label={t("Shubhali holatlar")}
                value={suspiciousCases || ""}
                type="text"
                handleChange={(e) => setSuspiciousCases(e.target.value)}
                placeholder={t("Shubhali holatlar")}
              />
            </div>
            <div className="w-full">
              <DateInput
                label={t("Oxirgi bog'lanilgan vaqt")}
                value={disconnectedTime || ""}
                handleChange={(e) => setDisconnectedTime(+e.target.value)}
                placeholder={t("Oxirgi bog'lanilgan vaqt")}
              />
            </div>

            {/* Add additional fields as necessary */}
            <div className="flex justify-center gap-4 mt-6 space-x-4">
              <button className="bg-red-600 text-white px-12 py-2 rounded-xl" onClick={() => setIsModalOpen(false)}>{t("Yopish")}</button>
              <button className="bg-[#0086D1] text-white px-12 py-2 rounded-xl" onClick={handleSubmit} >{t("Saqlash")}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MigrantTable;

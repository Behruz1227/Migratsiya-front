import React, { useState, useEffect } from "react";
import Tables, { IThead } from "../../../../components/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import { editMigrate, getMigrate } from "../../../../helpers/api/api";
import Modal from "../../../../components/modal/modal";
import TextInput from "../../../../components/inputs/text-input";
import { toast } from "sonner";

const MigrantTable: React.FC = () => {
  const MigrateGet = useGlobalRequest(`${getMigrate}?page=0&size=10`, "GET");

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cancelDelete = () => setDeleteConfirm(null);

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      alert(`Deleting ${deleteConfirm}`);
      setDeleteConfirm(null);
    }
  };

  const MigrateEdit = useGlobalRequest(
    `${editMigrate}/${selectedId}`,
    "PUT"
  );

  const handleEditClick = async (item: any) => {
    setSelectedItem(item);
    setSelectedId(item.id);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedId) return;
    try {
      console.log("Data being sent to backend:", selectedItem);
      const { ...dataToSend } = selectedItem;
      const response = await MigrateEdit.globalDataFunc(dataToSend);
      console.log("Backend response:", response);
      setIsModalOpen(false);
      toast.success("Data saved successfully!");
      MigrateGet.globalDataFunc();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data");
    }
  };
  

  const handleDeleteClick = (item: any) => {
    setDeleteConfirm(`${item.firstName} ${item.lastName}`);
  };

  const tableHeaders: IThead[] = [
    { id: 1, name: "T/r" },
    { id: 2, name: "F.I.O." },
    { id: 3, name: "Otasini ismi" },
    { id: 4, name: "Tug'ilgan kun" },
    { id: 5, name: "Uy telefon no'meri" },
    { id: 6, name: "Migrant holati" },
    { id: 7, name: "Tug'ilgan davlati" },
    { id: 8, name: "Tug'ilgan viloyati" },
    { id: 9, name: "Tug'ilgan tumani" },
    { id: 10, name: "Tug'ilgan qishloq" },
    { id: 11, name: "Qo'shimcha ma'lumot" },
    { id: 12, name: "Migrant ketgan davlat" },
    { id: 13, name: "Migrant ketgan viloyat" },
    { id: 14, name: "Migrant ketgan tuman" },
    { id: 15, name: "O'zbekistondan chiqish sanasi" },
    { id: 16, name: "O'zbekistonga qaytish sanasi" },
    { id: 17, name: "Migrant telefon no'meri" },
    { id: 18, name: "Migrant bilan a'loqa uzilgan vaqt" },
    { id: 19, name: "Migrant o'zgartirish" },
  ];

  const filteredData = MigrateGet?.response?.data?.object?.filter((item: any) =>
    `${item.firstName} ${item.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    MigrateGet.globalDataFunc();
  }, []);

  useEffect(() => {
    console.log("ManagerGet response:", MigrateGet?.response);
  }, [MigrateGet?.response]);

  return (
    <div>
      {MigrateGet?.loading ? (
        <div className="text-center">Ma'lumot yuklanmoqda ....</div>
      ) : MigrateGet?.error ? (
        <div>Error: {MigrateGet.error}</div>
      ) : MigrateGet?.response?.object?.length === 0 ? (
        <div>No data available</div>
      ) : (
        <div>
          <Tables thead={tableHeaders}>
            {MigrateGet?.response?.object?.map((item: any, index: number) => (
              <tr key={item.id} className="hover:bg-blue-300 border-b">
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{item.firstName} {item.lastName}</td>
                <td className="p-5">{item.middleName}</td>
                <td className="p-5">{item.birthDate}</td>
                <td className="p-5">{item.homeNumber}</td>
                <td className={`p-5 ${item.currentStatus === "QIDIRUVDA" ? "text-red-600 font-bold" : "text-blue-600 font-bold"}`}>
                  {item.currentStatus}
                </td>
                <td className="p-5">{item.birthCountry}</td>
                <td className="p-5">{item.birthRegion}</td>
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
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(item)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </Tables>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Modal isOpen={true} onClose={cancelDelete} mt="mt-5">
          <div className="flex justify-center items-center space-x-4">
            <button onClick={cancelDelete} className="bg-red-500 text-white px-6 py-3 rounded-xl">Yopish</button>
            <button onClick={handleConfirmDelete} className="bg-[#0086D1] text-white px-6 py-3 rounded-xl">O'chirish</button>
          </div>
        </Modal>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mt="mt-6">
          <div className="flex justify-center items-center space-x-4">
            <h2 className="text-2xl font-bold">{selectedItem ? "Migrantni tahrirlash" : "Yangi migrant yaratish"}</h2>
          </div>
          <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
            {/* Map over the selectedItem and skip the 'id' field */}
            {Object.keys(selectedItem || {}).map((key) => {
              if (key !== 'id') {  // Skip the 'id' key
                const value = selectedItem ? selectedItem[key] : "";
                return (
                  <div key={key} className="w-full">
                    <TextInput
                      label={key}
                      value={value}
                      handleChange={(e) => setSelectedItem({ ...selectedItem, [key]: e.target.value })}
                      placeholder={key}
                    />
                  </div>
                );
              }
              return null;
            })}
            <div className="flex justify-center gap-4 mt-6 space-x-4">
              <button className="bg-red-600 text-white px-12 py-2 rounded-xl" onClick={() => setIsModalOpen(false)}>Yopish</button>
              <button className="bg-[#0086D1] text-white px-12 py-2 rounded-xl" onClick={handleSave}>Saqlash</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MigrantTable;

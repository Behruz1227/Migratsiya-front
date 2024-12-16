import React, { useState } from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";
import Tables, { IThead } from "../../../../components/table";
import { FaEdit, FaTrash } from "react-icons/fa";

const MigrantTable: React.FC = () => {
  // Initial data (dummy data for demonstration)
  const initialData = [
    { id: 1, fio: "Ali Valiyev", tel: "+998901234567", createdDate: "2024-12-01" },
    { id: 2, fio: "Olim Karimov", tel: "+998937654321", createdDate: "2024-12-05" },
    { id: 3, fio: "Dilnoza Omonova", tel: "+998998765432", createdDate: "2024-12-10" },
  ];

  // State for storing and filtering data
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");

  // Filter data based on search
  const filteredData = data.filter((item) =>
    item.fio.toLowerCase().includes(search.toLowerCase())
  );

  // Table headers
  const tableHeaders: IThead[] = [
    { id: 1, name: "T/r" },
    { id: 2, name: "F.I.O." },
    { id: 3, name: "Telefon no'mer" },
    { id: 4, name: "Tizimga qo'shilgan kun" },
    { id: 5, name: "Foydalanuvchini o'zgartirish" },
  ];

  // Handle edit action
  const handleEditClick = (item: { id: number; fio: string; tel: string; createdDate: string }) => {
    alert(`O'zgartirish: ${item.fio}`);
    // Add your edit logic here
  };

  // Handle delete action
  const handleDeleteClick = (item: { id: number; fio: string; tel: string; createdDate: string }) => {
    if (window.confirm(`${item.fio} ni o'chirishga ishonchingiz komilmi?`)) {
      setData(data.filter((i) => i.id !== item.id));
    }
  };

  return (
    <div className="">
     
      <Tables thead={tableHeaders}>
        {filteredData.map((item, index) => (
          <tr key={item.id} className="hover:bg-blue-300 border-b">
            <td className="p-5">{index + 1}</td>
            <td className="p-5">{item.fio}</td>
            <td className="p-5">{item.tel}</td>
            <td className="p-5">{item.createdDate}</td>
            <td className="p-5 flex justify-center space-x-4">
              <button
                className="text-[#0086D1] hover:text-blue-700"
                onClick={() => handleEditClick(item)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteClick(item)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </Tables>
    </div>
  );
};

export default MigrantTable;

import React, { useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa"; // Added FaSearch for search icon and other icons
import { BsFillFilterSquareFill } from "react-icons/bs";
import Tables, { IThead } from "../../../components/table";
import DateInput from "../../../components/inputs/date-input";
import TextInput from "../../../components/inputs/text-input";
import Modal from "../../../components/modal/modal";

// Assuming Input is a custom component
const Input: React.FC<any> = ({ name, placeholder, value, onChange, onKeyDown, color, onFilterClick }) => (
    <div className="relative w-full">
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full p-3 pl-10 pr-10 border rounded-xl border-[#0086D1] focus:border-[#0086D1] ${color}`} // Added padding to right for second icon
        />
        <FaSearch className="absolute right-14 top-1/2 transform -translate-y-1/2 text-[#0086D1]" />
        <button onClick={onFilterClick}>
            <BsFillFilterSquareFill className="absolute right-7 top-1/2 transform -translate-y-1/2 text-[#0086D1] cursor-pointer" />
        </button>
    </div>
);

const Adminlar: React.FC = () => {
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const cancelDelete = () => {
        setDeleteConfirm(null);
    };
    const [data, setData] = useState([
        { id: 1, fio: "John Doe", tel: "+123456789", createdDate: "2023-12-10" },
        { id: 2, fio: "Jane Smith", tel: "+987654321", createdDate: "2023-11-15" },
        { id: 3, fio: "Alice Johnson", tel: "+112233445", createdDate: "2023-10-22" },
    ]);

    const tableHeaders: IThead[] = [
        { id: 1, name: 'F.I.O.' },
        { id: 2, name: "Telefon no'mer" },
        { id: 3, name: "Tizimga qo'shilgan kun" },
        { id: 4, name: "Foydalanuvchini o'zgartirish" },
    ];


    const handleFilterClick = () => {
        setFilterVisible(!filterVisible);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate(e.target.value);
    };

    const handleEditClick = (item: any) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };
    const handleDeleteClick = (item:any) => {
        setDeleteConfirm(item);
    };
    const confirmDelete = () => {
        setData((prevData) => prevData.filter((d) => d.id !== deleteConfirm.id));
        setDeleteConfirm(null);
    };
    

    const filteredData = data.filter(item => {
        const matchesText = item.fio.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.tel.includes(filterValue) ||
            item.createdDate.includes(filterValue);

        const matchesDate = filterDate ? item.createdDate.includes(filterDate) : true;

        return matchesText && matchesDate;
    });

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full container mt-6 px-4">
                <Input
                    name="max"
                    placeholder="Ma’lumotlarni izlash"
                    value={filterValue}
                    onChange={handleFilterChange}
                    onKeyDown={(e: any) => {
                        if (e.key === "+" || e.key === "-") e.preventDefault();
                    }}
                    color="text-black"
                    onFilterClick={handleFilterClick}
                />
                {filterVisible && (
                    <div className="flex space-x-16 mt-6">
                        <TextInput
                            label="F.I.O"
                            value={filterValue}
                            type="text"
                            handleChange={handleFilterChange}
                            placeholder="F.I.O."
                        />
                        <DateInput
                            label="	Tizimga qo'shilgan kun"
                            value={filterDate}
                            handleChange={handleDateChange}
                            placeholder="Select date"
                        />
                    </div>
                )}
                <div className="mt-6">
                    <Tables thead={tableHeaders}>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-300 border-b">
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
                                    <button className="text-red-500 hover:text-red-700"
                                     onClick={() => handleDeleteClick(item)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Tables>
                </div>
            </div>
            {deleteConfirm && (
                <Modal isOpen={true} onClose={cancelDelete} mt="mt-5">
                    <p className="text-center text-xl mb-8">Foydalanuvchini o'chirishni tasdiqlaysizmi?</p>
                    <div className="flex justify-center gap-15 mt-4 space-x-4 ">
                        <button className="bg-red-500 text-white px-12 py-2 rounded" onClick={confirmDelete}>
                            Yo'q
                        </button>
                        <button className="bg-[#0086D1] text-white px-12 py-2 rounded" onClick={cancelDelete}>
                            Ha
                        </button>
                    </div>
                </Modal>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal} mt="mt-5">
                {selectedItem ? (
                    <div>
                        <p className="text-2xl text-center text-black my-3">Ma'lumotlarni o'zgartirish</p>
                        <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
                            <div className="w-full">
                            <TextInput
                                label="F.I.O."
                                value={selectedItem.fio}
                                type="text"
                                handleChange={(e) =>
                                    setSelectedItem((prev:any) => ({ ...prev, fio: e.target.value }))
                                }
                                placeholder="Enter name"
                            />
                            </div>
                            <div className="w-full">
                            <TextInput
                                label="Telefon no'mer"
                                value={selectedItem.tel}
                                type="text"
                                handleChange={(e) =>
                                    setSelectedItem((prev:any) => ({ ...prev, tel: e.target.value }))
                                }
                                placeholder="Enter phone number"
                            />
                            </div>
                            <div className="w-full">
                            <DateInput
                                label="Tizimga qo'shilgan sana"
                                value={selectedItem.createdDate}
                                handleChange={(e) =>
                                    setSelectedItem((prev:any) => ({ ...prev, createdDate: e.target.value }))
                                }
                                placeholder=""
                            />
                            </div>
                        </div>
                        <div className="flex justify-end gap-45 mt-4 space-x-4 ">
                        <button className="bg-red-500 text-white px-12 py-2 rounded" onClick={confirmDelete}>
                            Cancel
                        </button>
                        <button className="bg-[#0086D1] text-white px-12 py-2 rounded" onClick={cancelDelete}>
                            Save
                        </button>
                    </div>
                        </div>
                        ):(
                            <p>Tanlangan element mavjud emas.</p>
                        )}
            </Modal> 
        </div>
    );
};

export default Adminlar;

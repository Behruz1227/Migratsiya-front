import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Tables, { IThead } from "../../../components/table";
import DateInput from "../../../components/inputs/date-input";
import TextInput from "../../../components/inputs/text-input";
import Modal from "../../../components/modal/modal";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import { addManager, editManager, deleteManager, getManager, getUser } from "../../../helpers/api/api";
import { toast } from "sonner";

const Input: React.FC<any> = ({ name, placeholder, value, onChange, onKeyDown, color, onFilterClick }) => (
    <div className="relative w-full">
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full p-3 pl-10 pr-10 border rounded-xl border-[#0086D1] focus:border-[#0086D1] ${color}`}
        />
        <FaSearch className="absolute right-14 top-1/2 transform -translate-y-1/2 text-[#0086D1]" />
        <button onClick={onFilterClick}>
            <BsFillFilterSquareFill className="absolute right-7 top-1/2 transform -translate-y-1/2 text-[#0086D1] cursor-pointer" />
        </button>
    </div>
);

interface ManagerData {
    id: number;
    fullName: string;
    phone: string;
    password: string;
    createdDate: string;
    role: string;
}

const Manager: React.FC = () => {
    const [deleteConfirm, setDeleteConfirm] = useState<ManagerData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({
        fio: '',
        password: '',
        tel: '',
        role: 'ROLE_ADMIN',
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    const ManagerAdd = useGlobalRequest(`${addManager}?role=${'ROLE_USER'}`, "POST", {
        fullName: selectedItem.fio,
        phone: selectedItem.tel,
        password: selectedItem.password,
        attachmentId: selectedItem?.attachmentId || 0
    });
    const ManagerEdit = useGlobalRequest(`${editManager}?role=${'ROLE_USER'}`,"PUT",{
        fullName: selectedItem.fio,
        phone: selectedItem.tel,
        password: selectedItem.password,
        attachmentId: selectedItem?.attachmentId || 0
    });
    const ManagerDelete = useGlobalRequest(deleteManager, "DELETE");
    const UserGet = useGlobalRequest(getUser, "GET");

    useEffect(() => {
        UserGet.globalDataFunc();
    }, []);

    useEffect(() => {
        if (ManagerAdd.response) {
            toast.success("Manger qo'shildi");
            UserGet?.globalDataFunc();
        } else if (ManagerAdd.error) {
            toast.error("Manager qo'shilmadi");
        }
    }, [ManagerAdd.error, ManagerAdd.response]);

    const tableHeaders: IThead[] = [
        { id: 1, name: 'T/r' },
        { id: 2, name: 'F.I.O.' },
        { id: 3, name: "Telefon no'mer" },
        { id: 4, name: "Tizimga qo'shilgan kun" },
        { id: 5, name: "Foydalanuvchini o'zgartirish" },
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

    const handleEditClick = (item: ManagerData) => {
        setIsCreating(false);
        setSelectedItem({
            fio: item.fullName,
            tel: item.phone,
            password: '', 
            role: item.role,
        });
        setIsModalOpen(true);
    };

    const handleAddAdminClick = () => {
        setIsCreating(true);
        setSelectedItem({ fio: '', tel: '', createdDate: '', role: 'ROLE_ADMIN' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem({ fio: '', tel: '', createdDate: '', password: '' });
        setIsModalOpen(false);
    };

    const handleDeleteClick = (item: any) => {
        setDeleteConfirm(item);
    };

    const validateForm = () => {
        if (!selectedItem.fio || !selectedItem.tel || !selectedItem.role) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring.");
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            if (isCreating) {
                ManagerAdd.globalDataFunc();
                if (ManagerAdd.response) {
                    closeModal();
                }
            } else {
                ManagerEdit.globalDataFunc();
                if (ManagerEdit.response) {
                    closeModal();
                }
            }
        }
    };

    const handleConfirmDelete = () => {
        if (deleteConfirm) {
            ManagerDelete.globalDataFunc({ id: item.id });
            if (ManagerDelete.response) {
                toast.success("Manager o'chirildi");
                setDeleteConfirm(null);
                UserGet.globalDataFunc(); 
            } else if (ManagerDelete.error) {
                toast.error("Xatolik yuz berdi. O'chirishni qayta urinib ko'ring.");
            }
        }
    };

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
                            placeholder="F.I.O"
                        />
                        <DateInput
                            label="Tizimga qo'shilgan kun"
                            value={filterDate}
                            handleChange={handleDateChange}
                            placeholder="Select date"
                        />
                    </div>
                )}
                <div className="flex justify-end gap-4 mt-4 space-x-4 mb-3">
                    <button className="bg-red-500 text-white px-12 py-2 rounded-xl">
                        Import qilish
                    </button>
                    <button
                        className="bg-[#0086D1] text-white px-12 py-2 rounded-xl"
                        onClick={handleAddAdminClick}
                    >
                        + Admin yaratish
                    </button>
                </div>
                <div className="mt-6">
                    <Tables thead={tableHeaders}>
                        {UserGet?.response?.map((item: any, index: number) => (
                            <tr key={item.id} className="hover:bg-blue-300 border-b">
                                <td className="p-5">{index + 1}</td>
                                <td className="p-5">{item.fullName}</td>
                                <td className="p-5">{item.phone}</td>
                                <td className="p-5">{item.createDate}</td>
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
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={cancelDelete}
                            className="bg-red-500 text-white px-6 py-3 rounded-xl"
                        >
                            Yopish
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-[#0086D1] text-white px-6 py-3 rounded-xl"
                        >
                            O'chirish
                        </button>
                    </div>
                </Modal>
            )}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} mt="mt-6">
                    <div className="flex justify-center items-center space-x-4">
                        <h2 className="text-2xl font-bold">{isCreating ? "Yangi admin yaratish" : "Adminni tahrirlash"}</h2>
                    </div>
                    <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
                        <div className="w-full">
                            <TextInput
                                label="F.I.O."
                                value={selectedItem.fio}
                                type="text"
                                handleChange={(e) => setSelectedItem((prev:any) => ({ ...prev, fio: e.target.value }))}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Password"
                                value={selectedItem.password}
                                type="text"
                                handleChange={(e) => setSelectedItem((prev:any) => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Telefon no'mer"
                                value={selectedItem.tel}
                                type="text"
                                handleChange={(e) => {
                                    let newValue = e.target.value;
                                    if (!newValue.startsWith("+998")) {
                                        newValue = "+998" + newValue.replace(/^(\+998)?/, '');
                                    }
                                    setSelectedItem((prev:any) => ({ ...prev, tel: newValue }));
                                }}
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div className="flex justify-center gap-4 mt-6 space-x-4">
                            <button className="bg-red-600 text-white px-12 py-2 rounded-xl" onClick={closeModal}>
                                Yopish
                            </button>
                            <button className="bg-[#0086D1] text-white px-12 py-2 rounded-xl" onClick={handleSave}>
                                Saqlash
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Manager;

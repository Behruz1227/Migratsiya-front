import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Tables, { IThead } from "../../../components/table";
import Select from "react-select";
import DateInput from "../../../components/inputs/date-input";
import TextInput from "../../../components/inputs/text-input";
import Modal from "../../../components/modal/modal";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import { addManager, editManager, deleteManager, getManager, getTuman, getMfy, postUchaskavoy, getKichikUchaskavoy, } from "../../../helpers/api/api";
import { toast } from "sonner";
import SelectInput from "../../../components/inputs/selectInput";

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
        <FaSearch className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[#0086D1]" />
        {/* <button onClick={onFilterClick}>
            <BsFillFilterSquareFill className="absolute right-7 top-1/2 transform -translate-y-1/2 text-[#0086D1] cursor-pointer" />
        </button> */}
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

const UchaskavoyKichik: React.FC = () => {
    const [deleteConfirm, setDeleteConfirm] = useState<ManagerData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({
        fio: '',
        password: '',
        tel: '',
        role: 'ROLE_ADMIN',
        uchaskavoyTuman: '',
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [uchaskavoyTuman, setUchaskavoyTuman] = useState('');
    const [selectId, setSelectId] = useState();
    const [selectEdit, setSelectEdit] = useState<number>();
    const [isCreating, setIsCreating] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };
   
    const handleChange = (selected:any) => {
        setSelectedOptions(selected || []);
        const selectedIds = selected ? selected.map((item:any) => item.value) : [];
    };

    const createApiUrl = () => {
        const url = `${postUchaskavoy}?role=ROLE_KICHIK_UCHASKAVOY&${selectedOptions.map((item:any) => `mfyIds=${item.value}`).join("&")}`;
        return url;
    };
    const UchaskavoyKichikAdd = useGlobalRequest(
        createApiUrl(),
        "POST",
        {
            fullName: selectedItem.fio,
            phone: selectedItem.tel,
            password: selectedItem.password,
            attachmentId: selectedItem?.attachmentId || 0,
        }
    );
    const ManagerEdit = useGlobalRequest(`${editManager}/${selectEdit}`, "PUT", {
        fullName: selectedItem.fio,
        phone: selectedItem.tel,
        password: selectedItem.password,

        attachmentId: selectedItem?.attachmentId || 0
    });
    const ManagerDelete = useGlobalRequest(`${deleteManager}/${selectId}`, "DELETE");

    console.log(selectId);
    

    const UserGet = useGlobalRequest(`${getManager}?text=${filterValue}`, "GET");
    const UchaskavotGetMfy = useGlobalRequest(`${getMfy}`, "GET");
    const UchaskavoyGet = useGlobalRequest(`${getKichikUchaskavoy}`, "GET")
    
    useEffect(() => {
        UserGet.globalDataFunc();
    }, [filterValue]);
    useEffect(() => {
        UchaskavoyGet.globalDataFunc()
        UchaskavotGetMfy.globalDataFunc()
    }, []);
    const UchaskavoyOption = UchaskavotGetMfy?.response ? UchaskavotGetMfy?.response?.map((region: any) => ({
        label: region.name,
        value: region.id,
    })) : [];
    useEffect(() => {
        if (UchaskavoyKichikAdd.response) {
            UchaskavoyGet.globalDataFunc()
            toast.success("Admin tizimga qo'shildi ✅");
            UserGet?.globalDataFunc();
            closeModal();
        } else if (UchaskavoyKichikAdd.error) {

            toast.error(`${UchaskavoyKichikAdd.error}`);
        }
    }, [UchaskavoyKichikAdd.error, UchaskavoyKichikAdd.response]);

    const tableHeaders: IThead[] = [
        { id: 1, name: 'T/r' },
        { id: 2, name: 'F.I.O.' },
        { id: 3, name: "Telefon no'mer" },
        { id: 4, name: "Tuman nomi" },
        { id: 5, name: "Tizimga qo'shilgan kun" },
        { id: 6, name: "Foydalanuvchini o'zgartirish" },
    ];

    const handleFilterClick = () => {
        setFilterVisible(!filterVisible);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };



    const handleEditClick = (item: ManagerData) => {
        setSelectEdit(item.id);
        setIsCreating(false);
        setSelectedItem({
            fio: item.fullName,
            tel: item.phone,
            password: '',
            uchaskavoyTuman: ''
        });
        setIsModalOpen(true);
    };




    const handleAddAdminClick = () => {
        setIsCreating(true);
        setSelectedItem({ fio: '', tel: '', createdDate: '', role: 'ROLE_ADMIN', uchaskavoyTuman: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem({ fio: '', tel: '', createdDate: '', password: '' });
        setIsModalOpen(false);
    };

    const handleDeleteClick = (item: any) => {
        setSelectId(item.id)
        setDeleteConfirm(item);
    };

    const validateForm = () => {
        if (!selectedItem.fio) {
            toast.error("Ism familiya bo'sh bo'lmasin")
            return false
        } else if (!selectedItem.tel) {
            toast.error("Telefon raqam bo'sh bo'lmasin");
            return false
        } else if (!selectedItem.password) {
            toast.error("Parol bo'sh bo'lmasin");
            return false
        }
        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            try {
                if (isCreating) {
                    await UchaskavoyKichikAdd.globalDataFunc();
                    if (UchaskavoyKichikAdd.response) {
                        closeModal();
                        toast.success("Ma'lumot muvaffaqiyatli qo'shildi ✅");
                    } else {
                        toast.error("Ma'lumot qo'shilmadi. Iltimos, qayta urinib ko'ring.");
                    }
                } else {
                    await ManagerEdit.globalDataFunc();
                    if (ManagerEdit.response) {
                        await UserGet.globalDataFunc();
                        toast.success("Uchaskavoy ma'lumotlari o'zgartirildi ✅");
                        closeModal();
                    } else {
                        const errorMessage = ManagerEdit.error || "Ma'lumot o'zgartirilmadi. Iltimos, qayta urinib ko'ring.";
                        toast.error(errorMessage);
                    }
                }
            } catch (error) {

            }
        }
    };



    const handleConfirmDelete = () => {
        if (deleteConfirm) {
            ManagerDelete.globalDataFunc();
            if (ManagerDelete.response) {
                toast.success("Manager o'chirildi");
                UchaskavoyGet.globalDataFunc();
                closeModal();
                setDeleteConfirm(null);
            } else if (ManagerDelete.error) {
                toast.error("Xatolik yuz berdi. O'chirishni qayta urinib ko'ring.");
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
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
                    </div>
                )}
                <div className="flex justify-end gap-4 mt-4 space-x-4 mb-3">
                    <button
                        className="bg-[#0086D1] text-white px-12 py-2 rounded-xl"
                        onClick={handleAddAdminClick}
                    >
                        + Uchaskavoy yaratish
                    </button>
                </div>
                <div className="mt-6">
                    <Tables thead={tableHeaders}>
                        {UserGet?.loading ?
                            (
                                <tr>
                                    <td colSpan={tableHeaders.length}>
                                        <div className="flex justify-center items-center h-20">
                                            <p className="text-lg font-medium text-gray-600 animate-pulse">
                                                Yuklanmoqda...
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) :
                            UchaskavoyGet?.response && UchaskavoyGet.response.length > 0 ? (
                                UchaskavoyGet?.response?.map((item: any, index: number) => (
                                    <tr key={item.id} className="hover:bg-blue-300 border-b">
                                        <td className="p-5">{index + 1}</td>
                                        <td className="p-5">{item.fullName}</td>
                                        <td className="p-5">{item.phone}</td>
                                        <td className="p-5">{item.districtName}</td>
                                        <td className="p-5">{item.createDate}</td>
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={tableHeaders.length}>
                                        <div className="flex justify-center items-center h-20">
                                            <p className="text-lg font-medium text-gray-600 text-center">
                                                Uchaskavoylar mavjud emas
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                    </Tables>
                </div>
            </div>
            {deleteConfirm && (
                <Modal isOpen={true} onClose={cancelDelete} mt="mt-5">
                    <div className="mb-5 font-bold text-xl text-center p-3">
                        <h1>Xaqiqatdan ham shu uchaskavoyni o'chirmoqchimisiz</h1>
                    </div>
                    <div className="flex justify-center items-center space-x-14 mt-4">
                        <button
                            onClick={cancelDelete}
                            className="bg-red-500 text-white px-10 py-2 rounded-xl"
                        >
                            Yopish
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-[#0086D1] text-white px-10 py-2 rounded-xl"
                        >
                            {ManagerDelete.response ? "Loading..." : "O'chirish"}
                        </button>
                    </div>
                </Modal>
            )}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} mt="mt-6">
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <h2 className="text-2xl font-bold">{isCreating ? "Tizimga uchaskavoy qo'shish" : "Uchaskavoy ma'lumotlarini o'zgartirish"}</h2>
                    </div>
                    <div className="w-full flex flex-col gap-3 items-center justify-center">
                        <div className="w-full">
                            <TextInput
                                label="F.I.O."
                                value={selectedItem.fio}
                                type="text"
                                handleChange={(e) => setSelectedItem((prev: any) => ({ ...prev, fio: e.target.value }))}
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Telefon no'mer"
                                value={selectedItem.tel}
                                type="text"
                                className="w-full"
                                handleChange={(e) => {
                                    let newValue = e.target.value;

                                    // Faqat raqam va + belgisi bilan boshlanadigan qiymatni ruxsat etish
                                    if (/^\+?\d*$/.test(newValue)) {
                                        // Telefon raqam +998 bilan boshlanishini ta'minlash
                                        if (!newValue.startsWith("+998")) {
                                            newValue = "+998";  // faqat +998 bilan boshlansin
                                        }

                                        // Telefon raqam uzunligini cheklash (13 ta belgi: +998 bilan birga)
                                        if (newValue.length <= 13) {
                                            setSelectedItem((prev: any) => ({
                                                ...prev,
                                                tel: newValue,
                                            }));
                                        }
                                    }
                                }}
                                placeholder="Telefon raqam kiriting"
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Password"
                                value={selectedItem.password}
                                type="text"
                                handleChange={(e) => setSelectedItem((prev: any) => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="w-full">
                            <div className="mb-4">
                                <label htmlFor="tuman-select" className=" mb-2 ">
                                    Tuman tanlang
                                </label>
                                <Select
                                    id="tuman-select"
                                    isMulti
                                    closeMenuOnSelect={false}
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    options={UchaskavoyOption}
                                    placeholder="Tuman tanlang..."
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            {/* <SelectInput
                                label={"Tuman tanlang"}
                                value={uchaskavoyTuman}
                                handleChange={(e) => {
                                    setUchaskavoyTuman(e.target.value);
                                }}
                                options={UchaskavoyOption}
                                className="mb-4"
                                // disabled={}
                            /> */}
                        </div>
                        <div className="flex justify-center gap-4 mt-6 space-x-4">
                            <button className="bg-red-600 text-white px-12 py-2 rounded-xl" onClick={closeModal}>
                                Yopish
                            </button>
                            <button className="bg-[#0086D1] text-white px-12 py-2 rounded-xl" onClick={handleSave}>
                                {ManagerEdit.loading ? (
                                    <span className="flex items-center space-x-2">
                                        <span className="animate-spin border-2 border-t-2 border-gray-200 rounded-full w-4 h-4"></span>
                                        <span>{isCreating ? "Qo'shilmoqda..." : "Saqlanmoqda..."}</span>
                                    </span>
                                ) : (
                                    isCreating ? "Qo'shish" : "Saqlash"
                                )}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UchaskavoyKichik;
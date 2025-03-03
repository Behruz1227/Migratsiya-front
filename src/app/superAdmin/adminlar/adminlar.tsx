import React, {useEffect, useState} from "react";
import {FaSearch, FaTrash, FaEdit} from "react-icons/fa";

import Tables, {IThead} from "../../../components/table";
import TextInput from "../../../components/inputs/text-input";
import Modal from "../../../components/modal/modal";
import {useGlobalRequest} from "../../../helpers/functions/universal";
import {
    addManager,
    editManager,
    deleteManager,
    getUser,
} from "../../../helpers/api/api";
import {toast} from "sonner";
import {useTranslation} from "react-i18next";
import Translator from "../../../components/translate/transletor";

const Input: React.FC<any> = (
    {
        name,
        placeholder,
        value,
        onChange,
        onKeyDown,
        color,
    }) => (
    <div className="relative w-full">
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full p-3 pl-10 pr-10 border rounded-xl border-[#0086D1] focus:border-[#0086D1] ${color}`}
        />
        <FaSearch className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[#0086D1]"/>
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

const Adminlar: React.FC = () => {
    const {t} = useTranslation()
    const [deleteConfirm, setDeleteConfirm] = useState<ManagerData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({
        fio: "",
        password: "",
        tel: "",
        role: "ROLE_ADMIN",
    });
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [selectId, setSelectId] = useState();

    const cancelDelete = () => setDeleteConfirm(null)

    const [selectEdit, setSelectEdit] = useState<number>();

    const ManagerAdd = useGlobalRequest(
        `${addManager}?role=${"ROLE_ADMIN"}`,
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
        attachmentId: selectedItem?.attachmentId || 0,
    });
    const ManagerDelete = useGlobalRequest(
        `${deleteManager}/${selectId}`,
        "DELETE"
    );
    const ManagerGet = useGlobalRequest(`${getUser}?text=${filterValue}`, "GET");

    useEffect(() => {
        ManagerGet.globalDataFunc();
    }, [filterValue]);

    useEffect(() => {
        if (ManagerAdd.response) {
            ManagerGet.globalDataFunc();
            closeModal();
        } else if (ManagerAdd.error) {
            toast.error(ManagerAdd.error === 'User allaqachon mavjud allaqachon mavjud.' ? 'Telefon raqam allaqachon mavjud.' : "Manager qo'shilmadi qayta urinib ko'ring.");
        }
    }, [ManagerAdd.error, ManagerAdd.response]);


    const tableHeaders: IThead[] = [
        {id: 1, name: `${t('T/r')}`},
        {id: 2, name: `${t("F.I.O.")}`},
        {id: 3, name: `${t("Telefon raqam")}`},
        {id: 4, name: `${t("Tizimga qo'shilgan kun")}`},
        {id: 5, name: `${t("Foydalanuvchini o'zgartirish")}`},
    ];

    const handleFilterClick = () => {
        setFilterVisible(!filterVisible);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const handleEditClick = (item: ManagerData) => {
        setIsCreating(false);
        setSelectEdit(item.id);
        setSelectedItem({
            fio: item.fullName,
            tel: item.phone,
            password: "",
            role: item.role,
        });
        setIsModalOpen(true);
    };

    const handleAddAdminClick = () => {
        setIsCreating(true);
        setSelectedItem({fio: "", tel: "", createdDate: "", role: "ROLE_ADMIN"});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem({fio: "", tel: "", createdDate: "", password: ""});
        setIsModalOpen(false);
    };

    const handleDeleteClick = (item: any) => {
        setSelectId(item.id);
        setDeleteConfirm(item);
    };

    const validateForm = () => {
        if (!selectedItem.fio) {
            toast.error(`${t("Ism familiya bo'sh bo'lmasin")}`);
            return false
        } else if (!selectedItem.tel) {
            toast.error(`${t("Telefon raqam bo'sh bo'lmasin")}`);
            return false
        } else if (!selectedItem.password) {
            toast.error(`${t("Parol bo'sh bo'lmasin")}`);
            return false
        }
        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            try {
                if (isCreating) {
                    await ManagerAdd.globalDataFunc();
                    if (ManagerAdd?.response) {
                        closeModal();
                        toast.success(`${t("Ma'lumot muvaffaqiyatli qo'shildi")}`);
                    } else {
                        toast.info(
                            t("Ma'lumot o'zgartirilmadi. Iltimos, qayta urinib ko'ring"));
                    }
                } else {
                    await ManagerEdit.globalDataFunc();
                    if (ManagerEdit?.response) {
                        await ManagerGet.globalDataFunc();
                        toast.success(`${t("Admin ma'lumotlari o'zgartirildi")}`);
                        closeModal();
                    } else {
                        const errorMessage =
                            ManagerEdit?.error ||
                            `${t("Ma'lumot o'zgartirilmadi. Iltimos, qayta urinib ko'ring")}`;
                        toast.error(errorMessage);
                    }
                }
            } catch (error) {
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (deleteConfirm) {
            try {
                await ManagerDelete.globalDataFunc();
                await ManagerDelete?.response
                cancelDelete();
                await closeModal();
                toast.success(`${t("Manager o'chirildi")}`);
                if (ManagerDelete?.response || !ManagerDelete?.response) {
                    await ManagerGet.globalDataFunc();

                    setDeleteConfirm(null);
                } else if (ManagerDelete?.error) {
                    toast.error(`${t("Xatolik yuz berdi. O'chirishni qayta urinib ko'ring.")}`);
                }
            } catch (error) {
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
            <div className="w-full mt-6 mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
                <Input
                    name="max"
                    placeholder={`${t("Malumotlarni izlash")}`}
                    value={filterValue}
                    onChange={handleFilterChange}
                    onKeyDown={(e: any) => {
                        if (e.key === "+" || e.key === "-") e.preventDefault();
                    }}
                    color="text-black"
                    onFilterClick={handleFilterClick}
                />
                <div className="flex justify-end gap-4 mt-4 space-x-4 mb-3">
                    <button
                        className="bg-[#0086D1] text-white px-12 py-2 rounded-xl"
                        onClick={handleAddAdminClick}
                    >
                        {`${t("Admin yaratish")}`}
                    </button>
                </div>
                <div className="mt-6 mb-6">
                    <Tables thead={tableHeaders}>
                        {ManagerGet?.loading ? (
                            <tr>
                                <td colSpan={tableHeaders.length}>
                                    <div className="flex justify-center items-center h-20">
                                        <p className="text-lg font-medium text-gray-600 animate-pulse">
                                            {t("Yuklanmoqda")}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : ManagerGet?.response && ManagerGet.response.length > 0 ? (
                            ManagerGet.response.map((item: any, index: number) => (
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
                                            <FaEdit/>
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteClick(item)}
                                        >
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeaders.length}>
                                    <div className="flex justify-center items-center h-20">
                                        <p className="text-lg font-medium text-gray-600 text-center">
                                            {t("Adminlar mavjud emas")}
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
                        <h1>{t("Xaqiqatdan ham shu adminni o'chirmoqchimisiz")}</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                        <button
                            onClick={cancelDelete}
                            className="w-full sm:w-auto bg-red-500 text-white px-10 py-2 rounded-xl"
                        >
                            {t("Yopish")}
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="w-full sm:w-auto bg-[#0086D1] text-white px-10 py-2 rounded-xl"
                        >
                            {ManagerDelete.response ? `${t("O'chirish")}` : `${t("O'chirish")}`}
                        </button>
                    </div>
                </Modal>
            )}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} mt="mt-6">
                    <div className="flex justify-center items-center space-x-4 mb-4">
                        <h2 className="text-2xl font-bold">
                            {isCreating
                                ? `${t("Tizimga admin qo'shish")}`
                                : `${t("Admin ma'lumotlarini o'zgartirish")}`}
                        </h2>
                    </div>
                    <div className="w-full space-y-3">
                        <div className="w-full">
                            <TextInput
                                label={t('Ism va familiya')}
                                value={selectedItem.fio}
                                type="text"
                                handleChange={(e) => {
                                    const upperCaseValue = e.target.value.toUpperCase(); // Kiritilgan matnni katta harfga aylantirish
                                    setSelectedItem((prev: any) => ({
                                        ...prev,
                                        fio: upperCaseValue,
                                    }));
                                }}
                                placeholder={t('Ism va familiya')}
                            />
                            {selectedItem.fio && (
                                <div className="mt-2 text-gray-600">
                                    <Translator text={selectedItem?.fio}/>
                                </div>
                            )}
                        </div>
                        <div className="w-full">
                            <TextInput
                                label={t("Telefon raqam")}
                                value={selectedItem.tel || "+998"}
                                type="text"
                                className="w-full"
                                handleChange={(e) => {
                                    let newValue = e.target.value;

                                    // Faqat raqamlar va + belgisi bilan boshlanadigan qiymatni ruxsat etish
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
                                placeholder={t("Telefon raqam")}
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label={t("Password")}
                                value={selectedItem.password}
                                type="text"
                                handleChange={(e) =>
                                    setSelectedItem((prev: any) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                placeholder={t("Password")}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end items-center gap-2">
                            <button
                                className="w-full sm:w-auto bg-red-600 text-white px-12 py-2 rounded-xl"
                                onClick={closeModal}
                            >
                                {t("Yopish")}
                            </button>
                            <button
                                className="w-full sm:w-auto bg-[#0086D1] text-white px-12 py-2 rounded-xl"
                                onClick={handleSave}
                            >
                                {ManagerEdit.loading ? `${t("Yuklanmoqda")}` : `${t("Saqlash")}`}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Adminlar;

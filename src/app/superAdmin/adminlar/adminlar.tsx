import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Tables, { IThead } from "../../../components/table";
import DateInput from "../../../components/inputs/date-input";
import TextInput from "../../../components/inputs/text-input";
import Modal from "../../../components/modal/modal";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import {
  addManager,
  editManager,
  deleteManager,
  getManager,
  getUser,
} from "../../../helpers/api/api";
import { toast } from "sonner";

const Input: React.FC<any> = ({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  color,
  onFilterClick,
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

const Adminlar: React.FC = () => {
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
  const [filterDate, setFilterDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectId, setSelectId] = useState();

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

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
      toast.success("Admin qo'shildi");
      ManagerGet.globalDataFunc();
      closeModal();
    } else if (ManagerAdd.error) {
      // toast.error("Manager qo'shilmadi");
    }
  }, [ManagerAdd.error, ManagerAdd.response]);


  

  const tableHeaders: IThead[] = [
    { id: 1, name: "T/r" },
    { id: 2, name: "F.I.O." },
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
    setSelectedItem({ fio: "", tel: "", createdDate: "", role: "ROLE_ADMIN" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem({ fio: "", tel: "", createdDate: "", password: "" });
    setIsModalOpen(false);
  };

  const handleDeleteClick = (item: any) => {
    setSelectId(item.id);
    setDeleteConfirm(item);
  };

  const validateForm = () => {
    if (!selectedItem.fio) {
      toast.error("Ism familiya bo'sh bo'lmasin");
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
          await ManagerAdd.globalDataFunc();
          if (ManagerAdd.response) {
            closeModal();
            toast.success("Ma'lumot muvaffaqiyatli qo'shildi ✅");
          } else if (ManagerAdd.error) {
            // toast.error("Ma'lumot qo'shilmadi. Iltimos, qayta urinib ko'ring.");
          }
        } else {
          await ManagerEdit.globalDataFunc();
          if (ManagerEdit.response) {
            await ManagerGet.globalDataFunc();
            toast.success("Admin ma'lumotlari o'zgartirildi ✅");
            closeModal();
          } else {
            const errorMessage =
              ManagerEdit?.error ||
              "Ma'lumot o'zgartirilmadi. Iltimos, qayta urinib ko'ring.";
            toast.error(errorMessage);
          }
        }
      } catch (error) { }
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await ManagerDelete.globalDataFunc();
        if (ManagerDelete.response) {
          await ManagerGet.globalDataFunc();
          toast.success("Manager o'chirildi ✅");
          closeModal();
          setDeleteConfirm(null);
        } else if (ManagerDelete.error) {
          toast.error("Xatolik yuz berdi. O'chirishni qayta urinib ko'ring.");
        }
      } catch (error) { }
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
        {/* {filterVisible && (
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
        )} */}
        <div className="flex justify-end gap-4 mt-4 space-x-4 mb-3">
          {/* <button className="bg-gray-500 text-white px-12 py-2 rounded-xl">
            Import qilish
          </button> */}
          <button
            className="bg-[#0086D1] text-white px-12 py-2 rounded-xl"
            onClick={handleAddAdminClick}
          >
            + Admin yaratish
          </button>
        </div>
        <div className="mt-6 mb-6">
          <Tables thead={tableHeaders}>
            {ManagerGet?.loading ? (
              <tr>
                <td colSpan={tableHeaders.length}>
                  <div className="flex justify-center items-center h-20">
                    <p className="text-lg font-medium text-gray-600 animate-pulse">
                      Yuklanmoqda...
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
                      Adminlar mavjud emas
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
            <h1>Xaqiqatdan ham shu adminni o'chirmoqchimisiz</h1>
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
            <h2 className="text-2xl font-bold">
              {isCreating
                ? "Tizimga admin qo'shish"
                : "Admin ma'lumotlarini o'zgartirish"}
            </h2>
          </div>
          <div className="w-full  flex flex-col gap-3 items-center justify-center">
            <div className="w-full">
              <TextInput
                label="F.I.O."
                value={selectedItem.fio}
                type="text"
                handleChange={(e) =>
                  setSelectedItem((prev: any) => ({
                    ...prev,
                    fio: e.target.value,
                  }))
                }
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
                handleChange={(e) =>
                  setSelectedItem((prev: any) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter password"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6 space-x-4">
              <button
                className="bg-red-600 text-white px-12 py-2 rounded-xl"
                onClick={closeModal}
              >
                Yopish
              </button>
              <button
                className="bg-[#0086D1] text-white px-12 py-2 rounded-xl"
                onClick={handleSave}
              >
                {ManagerEdit.loading ? "Loading.." : "Saqlash"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Adminlar;

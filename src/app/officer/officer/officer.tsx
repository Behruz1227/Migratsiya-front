import React, { useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa"; // Added FaSearch for search icon and other icons
import { BsFillFilterSquareFill } from "react-icons/bs";
import Tables, { IThead } from "../../../components/table";
import DateInput from "../../../components/inputs/date-input";
import TextInput from "../../../components/inputs/text-input";
import { Tab } from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";

// Assuming Input is a custom component
const Input: React.FC<any> = ({ name, placeholder, value, onChange, onKeyDown, color, onFilterClick }) => (
    <div className="relative w-full">
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full p-3 pl-10 pr-10 border rounded-xl border-blue-500 focus:border-blue-500 ${color}`} // Added padding to right for second icon
        />
        <FaSearch className="absolute right-14 top-1/2 transform -translate-y-1/2 text-blue-500" />
        <button onClick={onFilterClick}>
            <BsFillFilterSquareFill className="absolute right-7 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer" />
        </button>
    </div>
);

const Officer: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputTextColor] = useState('text-black');
    const [filterVisible, setFilterVisible] = useState(false); // New state to toggle filter visibility
    const [name, setName] = useState(''); // New state for filter input value
    const [fullName, setfullName] = useState(''); // New state for filter input value
    const [filterValue, setFilterValue] = useState(''); // New state for filter input value
    const [fatherName, setfatherName] = useState(''); // New state for filter input value
    const [filterDate, setFilterDate] = useState(''); // New state for date filter value

    const tableHeaders: IThead[] = [
        { id: 1, name: 'F.I.O.' },
        { id: 2, name: "Telefon no'mer" },
        { id: 3, name: "Tizimga qo'shilgan kun" },
        { id: 4, name: "Foydalanuvchini o'zgartirish" },
    ];

    const data = [
        { id: 1, fio: "John Doe", tel: "+123456789", createdDate: "2023-12-10", actions: "Edit/Delete" },
        { id: 2, fio: "Jane Smith", tel: "+987654321", createdDate: "2023-11-15", actions: "Edit/Delete" },
        { id: 3, fio: "Alice Johnson", tel: "+112233445", createdDate: "2023-10-22", actions: "Edit/Delete" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleFilterClick = () => {
        setFilterVisible(!filterVisible);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDate(e.target.value);
    };

    const filteredData = data.filter(item => {
        const matchesText = item.fio.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.tel.includes(filterValue) ||
            item.createdDate.includes(filterValue);

        const matchesDate = filterDate ? item.createdDate.includes(filterDate) : true; // Filter by date if filterDate is set

        return matchesText && matchesDate;
    });

    const tabs: Tab[] = [
        {
            id: 1, title: "Migrant  qo’shish", content:
                <div className="flex space-x-16 mt-6">
                    <TextInput
                        label="Ismi"
                        value={name}
                        type="text"
                        handleChange={handleFilterChange}
                        placeholder="Ismi"
                    />
                    <TextInput
                        label="Familiyasi"
                        value={fullName}
                        type="text"
                        handleChange={handleFilterChange}
                        placeholder="Familiyasi"
                    />
                    <TextInput
                        label="Otasini ismi"
                        value={fatherName}
                        type="text"
                        handleChange={handleFilterChange}
                        placeholder="Otasini ismi"
                    />
                    <DateInput
                        label="Tug’ilgan sanasi"
                        value={filterDate}
                        handleChange={handleDateChange}
                        placeholder="Select date"
                    />
                </div>
        },
        {
            id: 2, title: "Horijdagi Migrantlar", content:
                <div className="mt-6">
                    <Tables thead={tableHeaders}>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-300 border-b">
                                <td className="p-5">{item.fio}</td>
                                <td className="p-5">{item.tel}</td>
                                <td className="p-5">{item.createdDate}</td>
                                <td className="p-5 flex justify-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Tables>
                </div>
        },
        { id: 3, title: "Qaytib kelganini ro’yhatga olish", content: "Qashqadaryo bo‘yicha ma'lumotlar" },


    ];

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full container mt-6 px-4">
                <Input
                    name="max"
                    placeholder="Ma’lumotlarni izlash"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e: any) => {
                        if (e.key === "+" || e.key === "-") e.preventDefault();
                    }}
                    color={inputTextColor}
                    onFilterClick={handleFilterClick}
                />
                <div className="mt-2">
                    {filterVisible && (
                        <div>
                            <div className="flex space-x-16 mt-6">
                                <TextInput
                                    label="Search Filter"
                                    value={filterValue}
                                    type="text"
                                    handleChange={handleFilterChange}
                                    placeholder="Filter by name, phone, or date"
                                />
                                <DateInput
                                    label="Filter by Date"
                                    value={filterDate}
                                    handleChange={handleDateChange}
                                    placeholder="Select date"
                                />
                                <TextInput
                                    label="Another Filter"
                                    value={filterValue}
                                    type="text"
                                    handleChange={handleFilterChange}
                                    placeholder="Filter by something else"
                                />
                                <DateInput
                                    label="Another Date Filter"
                                    value={filterDate}
                                    handleChange={handleDateChange}
                                    placeholder="Select another date"
                                />
                            </div>
                            <div className="flex space-x-16 mt-6">
                                <TextInput
                                    label="Search Filter"
                                    value={filterValue}
                                    type="text"
                                    handleChange={handleFilterChange}
                                    placeholder="Filter by name, phone, or date"
                                />
                                <DateInput
                                    label="Filter by Date"
                                    value={filterDate}
                                    handleChange={handleDateChange}
                                    placeholder="Select date"
                                />
                                <TextInput
                                    label="Another Filter"
                                    value={filterValue}
                                    type="text"
                                    handleChange={handleFilterChange}
                                    placeholder="Filter by something else"
                                />
                                <DateInput
                                    label="Another Date Filter"
                                    value={filterDate}
                                    handleChange={handleDateChange}
                                    placeholder="Select another date"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <TabsMigrant tabs={tabs} />
            </div>
        </div>
    );
};

export default Officer;

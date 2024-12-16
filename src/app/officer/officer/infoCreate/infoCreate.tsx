import React, { useState } from "react";
import TextInput from "../../../../components/inputs/text-input";
import DateInput from "../../../../components/inputs/date-input";

const InfoCreate: React.FC = () => {
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [davlat, setDavlat] = useState('');
    const [viloyat, setViloyat] = useState('');
    const [tumani, setTumani] = useState('');
    const [qishloq, setQishloq] = useState('');
    const [ketganHudud, setKetganHudud] = useState('');
    const [manzilInfo, setManzilInfo] = useState('');
    const [ketganDavlat, setKetganDavlat] = useState('');

    const filterFields = [
        { label: "Ismi", value: name, type: "text", setState: setName, placeholder: "Ismi" },
        { label: "Familiyasi", value: fullName, type: "text", setState: setFullName, placeholder: "Familiyasi" },
        { label: "Otasini ismi", value: fatherName, type: "text", setState: setFatherName, placeholder: "Otasini ismi" },
        { label: "Tug’ilgan sanasi", value: filterDate, type: "date", setState: setFilterDate, placeholder: "Select date" },
        { label: "Tug’ilgan davlati", value: davlat, type: "text", setState: setDavlat, placeholder: "Tug’ilgan davlati" },
        { label: "Tug’ilgan viloyati", value: viloyat, type: "text", setState: setViloyat, placeholder: "Tug’ilgan viloyati" },
        { label: "Tug’ilgan tumani", value: tumani, type: "text", setState: setTumani, placeholder: "Tug’ilgan tumani" },
        { label: "Ketgan davlati", value: ketganDavlat, type: "text", setState: setKetganDavlat, placeholder: "Ketgan davlati" },
        { label: "Ketgan hududi", value: ketganHudud, type: "text", setState: setKetganHudud, placeholder: "Ketgan hududi" },
        { label: "Qo’shimcha manzil", value: manzilInfo, type: "text", setState: setManzilInfo, placeholder: "Qo’shimcha manzil" },
        { label: "Ketish sababi", value: manzilInfo, type: "text", setState: setManzilInfo, placeholder: "Ketish sababi" },
        { label: "Telefon raqami", value: manzilInfo, type: "text", setState: setManzilInfo, placeholder: "Telefon raqami" },
    ];

    const renderInputs = (fields: any) => {
        return fields.map((field: any, index: number) => {
            if (field.type === "text") {
                return (
                    <TextInput
                        key={index}
                        label={field.label}
                        value={field.value}
                        type={field.type}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );
            } else if (field.type === "date") {
                return (
                    <DateInput
                        key={index}
                        label={field.label}
                        value={field.value}
                        handleChange={(e) => field.setState(e.target.value)}
                        placeholder={field.placeholder}
                    />
                );
            }
            return null;
        });
    };

    const handleSave = () => {
        const formData = {
            name,
            fullName,
            fatherName,
            filterDate,
            davlat,
            viloyat,
            tumani,
            qishloq,
            ketganHudud,
            manzilInfo,
            ketganDavlat,
        };
        console.log("Form Data:", formData);
    };

    return (
        <div className="grid grid-cols-4 gap-4 mt-6">
            {renderInputs(filterFields)}
            <button 
                onClick={handleSave} 
                className="col-span-4 bg-[#0086D1] text-white px-12 py-2 rounded-xl mt-4">
                Ma’lumotlarni saqlash
            </button>
        </div>
    );
};

export default InfoCreate;

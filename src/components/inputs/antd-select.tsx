import {Select} from "antd";

const AntdSelect = (
    {
        label,
        value,
        handleChange,
        options,
        disabled,
    }: {
        label?: string;
        value?: any;
        handleChange: (e: any) => void;
        options: { value: any; label: string }[];
        disabled?: boolean;
    }) => {

    return (
        <div className={"w-full"}>
            {label && <label className="block text-gray-700">{label}</label>}
            <Select
                value={value ? value : null}
                onChange={handleChange}
                disabled={disabled}
                placeholder={label}
                allowClear
                className={"w-full h-10"}
            >
                {options &&
                    options.length &&
                    options.map((option, index) => (
                        <Select.Option key={index} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
            </Select>
        </div>
    );
};

export default AntdSelect;

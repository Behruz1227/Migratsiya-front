import { FaSearch } from "react-icons/fa";

interface UserFilterInputProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    color?: string;
}

const UserFilterInput: React.FC<UserFilterInputProps> = ({ name, placeholder, value, onChange, onKeyDown, color }) => (
    <div className="relative w-full">
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`w-full p-3 pl-10 pr-10 border rounded-xl border-blue-500 focus:border-blue-500 ${color}`}
        />
        <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-500" />
    </div>
);

export default UserFilterInput;
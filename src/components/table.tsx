import React, { ReactNode } from 'react';

// Interface for table props
export interface IMasterTableProps {
    thead: IThead[];
    children: ReactNode;
}

// Interface for table headers
export interface IThead {
    id: number;
    name: string;
}

const Tables: React.FC<IMasterTableProps> = ({ thead, children }) => {
    return (
        <div className="rounded-xl bg-white shadow-xl">
            <div className="max-w-full overflow-x-auto w-full">
                <table className="w-full table-auto">
                    <thead className='rounded-xl'>
                        <tr className="text-left bg-blue-500 ">
                            {thead.map((item) => (
                                <th
                                    key={item.id}
                                    className="min-w-[150px] p-4 font-medium text-white "
                                    scope="col"
                                >
                                    {item.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Tables;

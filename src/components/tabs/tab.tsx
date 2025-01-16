import {useState} from "react";
import {Tab} from "../../helpers/constants/types";

function TabsMigrant({tabs, setIdIn}: { tabs: Tab[], setIdIn?: (num: number) => void }) {
    const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
    return (
        <div className="w-full max-w-6xl mx-auto mt-4">
            <div className={`w-full flex justify-start overflow-x-auto`}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setIdIn && setIdIn(tab.id);
                        }}
                        className={`min-w-[150px] py-3 text-sm font-semibold w-full border-t border-l border-r ${activeTab === tab.id
                            ? "bg-white text-blue-500 border-b-0"
                            : "bg-blue-500 text-white"
                        } ${tab.id === tabs[0].id
                            ? "rounded-tl-lg"
                            : tab.id === tabs[tabs.length - 1].id
                                ? "rounded-tr-lg"
                                : ""
                        }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <div className="border border-t-0 bg-white text-gray-700 rounded-b-lg">
                {
                    tabs.map((tab) => activeTab === tab.id && (
                        <div key={tab.id} className="text-gray-700">
                            {tab.content}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default TabsMigrant;

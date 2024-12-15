import { useState } from "react";
import { Tab } from "../../helpers/constants/types";

function TabsMigrant({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
  const gridCount = tabs?.length;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className={`grid grid-cols-${gridCount} w-full items-center justify-center`}>
        {tabs.map((tab) => ( 
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 h-full text-sm font-semibold w-full border-t border-l border-r 
              ${
                activeTab === tab.id
                  ? "bg-white text-blue-500 border-b-0"
                  : "bg-blue-500 text-white"
              }
              ${
                tab.id === tabs[0].id
                  ? "rounded-tl-lg"
                  : tab.id === tabs[tabs.length - 1].id
                  ? "rounded-tr-lg"
                  : ""
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 border border-t-0 bg-white text-gray-700 rounded-b-lg">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default TabsMigrant;

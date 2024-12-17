import TabsMigrant from "../../../components/tabs/tab";
import { Tab } from "../../../helpers/constants/types";
import Brigaderlar from "./tabs/brigaderlar";
import Horijdagi from "./tabs/horijdagi";
import OxirgiUchOylik from "./tabs/OxirgiUchOylik";
import QashqadaryoBuyicha from "./tabs/qashqadaryoBo'yicha";
import Qidiruv from "./tabs/qidiruv";
import Uzbekistondagilar from "./tabs/uzbekistondagilar";


function Dashboard() {
  

  const tabs: Tab[] = [
    {
      id: 1,
      title: "Horijdagi Migrantlar",
      content: (
        <Horijdagi/>
      ),
    },
    {
      id: 2,
      title: "Qashqadaryo bo‘yicha",
      content: (
        <QashqadaryoBuyicha/>
      ),
    },
    {
      id: 3,
      title: "Oxirgi 3 oyda qaytganlar",
      content: (
        <OxirgiUchOylik/>
      ),
    },
    {
      id: 4,
      title: "Hozirda O‘zbekistondagilar",
      content: (
        <Uzbekistondagilar/>
      ),
    },
    { id: 5, title: "Brigadeler", content: (
        <Brigaderlar/>
      ), },
    // { id: 6, title: "O/I", content: "O/I bo‘yicha ma'lumotlar" },
    {
      id: 7,
      title: "Qidiruv",
      content: (
        <Qidiruv/>
      ),
    },
  ];

  
  return (
    <div className="pt-20 ">
      <TabsMigrant tabs={tabs} />
    </div>
  );
}

export default Dashboard;

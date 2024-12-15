import MigrationCard from "../../../components/migration/migration";
import TabsMigrant from "../../../components/tabs/tab"
import { Tab } from "../../../helpers/constants/types";

function Dashboard() {

    const tabs: Tab[] = [
        { id: 1, title: "Horijdagi Migrantlar", content: "Horijdagi Migrantlar ma'lumotlari" },
        { id: 2, title: "Qashqadaryo bo‘yicha", content: "Qashqadaryo bo‘yicha ma'lumotlar" },
        { id: 3, title: "Oxirgi 3 oyda qaytganlar", content: "Oxirgi 3 oyda qaytganlar ma'lumotlari" },
        { id: 4, title: "Hozirda O‘zbekistondagilar", content: "Hozirda O‘zbekistondagilar ma'lumotlari" },
        { id: 5, title: "Brigadeler", content: "Brigadeler ma'lumotlari" },
        { id: 6, title: "O/I", content: "O/I bo‘yicha ma'lumotlar" },
        { id: 7, title: "Qidiruv", content: 
            <div>
                <MigrationCard count="233" title="UZB" flag="https://vectorflags.s3.amazonaws.com/flags/uk-circle-01.png"/>
            </div>
         },
      ];
    return (
    <div>
      <TabsMigrant tabs={tabs} />
    </div>
  )
}

export default Dashboard

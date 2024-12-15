import { useState } from "react";
import MigrationCard from "../../../components/migration/migration";
import TabsMigrant from "../../../components/tabs/tab";
import { Tab } from "../../../helpers/constants/types";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

function Dashboard() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const cards: CardData[] = [
    {
      id: 1,
      flag: "https://vectorflags.s3.amazonaws.com/flags/uk-circle-01.png",
      title: "Horijdagi Migrantlar",
      count: "1200",
    },
    {
      id: 2,
      flag: "https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png",
      title: "O‘zbekistondagilar",
      count: "500",
    },
    {
      id: 3,
      flag: "https://vectorflags.s3.amazonaws.com/flags/ru-circle-01.png",
      title: "Rossiyadan qaytganlar",
      count: "800",
    },
  ];

  const tabs: Tab[] = [
    {
      id: 1,
      title: "Horijdagi Migrantlar",
      content: "Horijdagi Migrantlar ma'lumotlari",
    },
    {
      id: 2,
      title: "Qashqadaryo bo‘yicha",
      content: "Qashqadaryo bo‘yicha ma'lumotlar",
    },
    {
      id: 3,
      title: "Oxirgi 3 oyda qaytganlar",
      content: "Oxirgi 3 oyda qaytganlar ma'lumotlari",
    },
    {
      id: 4,
      title: "Hozirda O‘zbekistondagilar",
      content: "Hozirda O‘zbekistondagilar ma'lumotlari",
    },
    { id: 5, title: "Brigadeler", content: "Brigadeler ma'lumotlari" },
    { id: 6, title: "O/I", content: "O/I bo‘yicha ma'lumotlar" },
    {
      id: 7,
      title: "Qidiruv",
      content: (
        <div className="flex flex-col gap-5 p-5">
          {cards.map((card) => (
            <MigrationCard
              key={card.id}
              flag={card.flag}
              title={card.title}
              count={card.count}
              isActive={activeCardId === card.id}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      ),
    },
  ];

  const handleCardClick = (id: number) => {
    setActiveCardId(id);
  };
  return (
    <div>
      <TabsMigrant tabs={tabs} />
    </div>
  );
}

export default Dashboard;

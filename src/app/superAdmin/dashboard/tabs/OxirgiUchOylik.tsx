import React, { useState } from 'react'
import MigrationCard from '../../../../components/migration/migration';


interface CardData {
    id: number;
    flag?: string;
    title: string;
    count: string;
  }

const OxirgiUchOylik: React.FC = () => {
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
    const handleCardClick = (id: number) => {
        setActiveCardId(id);
      };
  return (
    <div>
      <div className="flex flex-col gap-5 p-5">
        <MigrationCard
        id={"0"}
          flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
          title="Jami migrantlarimiz soni"
          count="1290"
          isActive={false}
          onClick={() => {}}
        />
        <div className="grid grid-cols-2 gap-5">
          {cards.map((card) => (
            <MigrationCard
              key={card.id}
              id={card.id}
              title={card.title}
              count={card.count}
              isActive={activeCardId === card.id}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OxirgiUchOylik

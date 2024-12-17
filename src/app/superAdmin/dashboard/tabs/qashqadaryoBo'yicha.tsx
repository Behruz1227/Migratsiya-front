import React, { useEffect, useState } from "react";
import MigrationCard from "../../../../components/migration/migration";
import UserFilterInput from "../../../../components/inputs/userFilterInput";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import {
  all_migrants,
  get_country,
  get_region,
  get_user_by_country,
  statistic_by_kashkadarya,
} from "../../../../helpers/api/api";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

const QashqadaryoBuyicha: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<any>(null);
  const getAllMigrant = useGlobalRequest(all_migrants, "GET");
  const getByKashkadarya = useGlobalRequest(
    `${statistic_by_kashkadarya}`,
    "GET"
  );
  const getUserByCountry = useGlobalRequest(get_user_by_country, "GET");
  const [tabPage, setTabPage] = useState<1 | 2 | 3>(1);

  console.log("huvbijbjnbhjbhjhbhjhbhjhbhj", activeCardId);

  const cards: CardData[] =
    getByKashkadarya?.response?.map((item: any, i: number) => ({
      id: item.geonameId,
      title: item?.countryName || "--",
      count: item?.migrantCount || 0,
    })) || [];

  useEffect(() => {
    getAllMigrant.globalDataFunc();
    getByKashkadarya.globalDataFunc();
  }, []);

  const handleCardClick = (item: any) => {
    setActiveCardId(item);
    setTabPage(2);
  };

  return (
    <div>
      {tabPage === 1 && (
        <div className="flex flex-col gap-5 p-5">
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count={getAllMigrant.response || 0}
            isActive={false}
            onClick={() => {}}
          />
          <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
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
      )}
      {tabPage === 2 && (
        <div className="flex flex-col gap-5 p-5">
          <h2>Region</h2>
          <MigrationCard
            id={activeCardId.id}
            flag={activeCardId?.flag}
            title={
              activeCardId?.title
                ? `${activeCardId?.title}dagi jami migrantlarimiz soni`
                : "--"
            }
            count={activeCardId?.count || 0}
            isActive={false}
            onClick={() => {}}
          />
          <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          />
          <div className="grid grid-cols-2 gap-5">
            {cards.map((card) => (
              <MigrationCard
                id={card.id}
                key={card.id}
                title={card.title}
                count={card.count}
                isActive={activeCardId === card.id}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>
      )}
      {tabPage === 3 && (
        <div className="flex flex-col gap-5 p-5">
          <h2>Users: {getByKashkadarya?.response?.name || "--"}</h2>
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count="1290"
            isActive={false}
            onClick={() => {}}
          />
          <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          />
          <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          />
          {cards.map((card) => (
            <MigrationCard
              id={card.id}
              key={card.id}
              flag={card.flag}
              title={card.title}
              count={card.count}
              isActive={activeCardId?.id === card.id}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      )}
      {/* <div className="flex flex-col gap-5 p-5">
        <MigrationCard
          flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
          title="Jami migrantlarimiz soni"
          count="1290"
          isActive={false}
          onClick={() => {}}
        />
        <UserFilterInput name="" onChange={() => {}} placeholder="" value="" />
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
      </div> */}
    </div>
  );
};

export default QashqadaryoBuyicha;

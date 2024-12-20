import React, { useEffect, useState } from "react";
import MigrationCard from "../../../../components/migration/migration";
// import UserFilterInput from "../../../../components/inputs/userFilterInput";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import {
  all_migrants,
  get_country,
  get_region,
  get_user_by_country,
} from "../../../../helpers/api/api";
import Accordion, {
  UserCardData,
} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import { Pagination } from "antd";
// import { debounce } from "lodash";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

const Horijdagi: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<any>(null);
  // const [countrySearch, setCountrySearch] = useState("")
  // const [regionSearch, setR9egionSearch] = useState("")
  // const [userSearch, setUserSearch] = useState("")
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [regionItem, setRegionItem] = useState<any>(null);
  const getCountry = useGlobalRequest(get_country, "GET");
  const getAllMigrant = useGlobalRequest(all_migrants, "GET");
  const getRegion = useGlobalRequest(
    `${get_region}?geoNameId=${activeCardId?.id ? activeCardId?.id : 0}`,
    "GET"
  );

  const getUserByCountry = useGlobalRequest(
    `${get_user_by_country}?regionName=${
      regionItem?.title ? regionItem?.title : ""
    }&page=${currentPage}&size=10`,
    "GET"
  );



  const [tabPage, setTabPage] = useState<1 | 2 | 3>(1);

  const userData: UserCardData[] =
    getUserByCountry?.response?.object?.map((item: any) => ({
      additionalAddress: item?.additionalAddress || null,
      birthDate: item?.birthDate || null,
      birthDistrict: item?.birthDistrict || null,
      departureArea: item?.departureArea || null,
      departureDate: item?.departureDate || null,
      disconnectedTime: item?.disconnectedTime || null,
      migrateFirstName: item?.migrateFirstName || null,
      migrateId: item?.migrateId || null,
      migrateLastName: item?.migrateLastName || null,
      migrateMiddleName: item?.migrateMiddleName || null,
      phoneNumber: item?.phoneNumber || null,
      suspiciousCases: item?.suspiciousCases || null,
      typeOfActivity: item?.typeOfActivity || null,
    })) || [];

  const cards: CardData[] =
    getCountry?.response?.map((item: any) => ({
      id: item.geonameId,
      flag: item?.countryCode
        ? `https://vectorflags.s3.amazonaws.com/flags/${item.countryCode.toLowerCase()}-circle-01.png`
        : null,
      title: item?.countryName || "--",
      count: item?.migrantCount || 0,
    })) || [];

  const regionCards: CardData[] =
    getRegion?.response?.map((item: any) => ({
      id: item.countryId,
      title: item?.name || "--",
      count: item?.migrantsCount || 0,
    })) || [];

  useEffect(() => {
    getCountry.globalDataFunc();
    getAllMigrant.globalDataFunc();
  }, []);



  const handleCardClick = async (item: any) => {
    await setActiveCardId(item);

    await setTabPage(2);
    await getRegion.globalDataFunc();
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
          {/* <UserFilterInput
            name="Search country"
            onChange={debounce((e) => {
              setCountrySearch(e.target.value)
            }, 2000)}
            placeholder="Davlatlarni nomi bo'yicha qidirish"
            value={countrySearch || ""}
          /> */}
          {getCountry.loading ? (
            <LoadingDiv />
          ) : cards && cards.length > 0 ? (
            cards?.map((card) => (
              <MigrationCard
                id={card?.id}
                key={card?.id}
                flag={card?.flag || ""}
                title={card?.title || ""}
                count={card?.count || "0"}
                isActive={false}
                onClick={() => handleCardClick(card)}
              />
            ))
          ) : (
            <NotFoundDiv />
          )}
          <LoadingDiv />
        </div>
      )}
      {tabPage === 2 && (
        <div className="flex flex-col gap-5 p-5">
          <MigrationCard
            id={activeCardId.id}
            flag={activeCardId?.flag || ""}
            title={
              activeCardId?.title
                ? `${activeCardId?.title}dagi jami migrantlarimiz soni`
                : "--"
            }
            count={activeCardId?.count || 0}
            isActive={false}
            onClick={() => setTabPage(1)}
          />
          {/* <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          /> */}
          {getRegion.loading ? (
            <LoadingDiv />
          ) : regionCards && regionCards?.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {regionCards &&
                regionCards?.length > 0 &&
                regionCards?.map((card) => (
                  <MigrationCard
                    id={card.id}
                    key={card.id}
                    title={card?.title || ""}
                    count={card?.count || "0"}
                    isActive={false}
                    onClick={async () => {
                      await setRegionItem(card);
                      await getUserByCountry.globalDataFunc();
                      await setTabPage(3);
                    }}
                  />
                ))}
            </div>
          ) : (
            <NotFoundDiv />
          )}
        </div>
      )}
      {tabPage === 3 && (
        <div className="flex flex-col gap-5 p-5">
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count={getAllMigrant?.response || 0}
            isActive={false}
            onClick={() => setTabPage(2)}
          />
          {/* <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          /> */}

          {getUserByCountry.loading ? (
            <LoadingDiv />
          ) : userData && userData.length > 0 ? (
            <div>
              {userData?.map((user, index) => (
                <Accordion key={index} userData={user} />
              ))}
              <div className="flex justify-center mt-5">
                <Pagination
                  defaultCurrent={1}
                  current={currentPage + 1}
                  total={getUserByCountry.response?.totalElements || 0}
                  pageSize={10}
                  onChange={async (pageNumber: number) => {
                    
                    await setCurrentPage(pageNumber - 1);
                    await getUserByCountry.globalDataFunc();
                  }}
                  showSizeChanger={false}
                />
              </div>
            </div>
          ) : (
            <NotFoundDiv />
          )}
        </div>
      )}
    </div>
  );
};

export default Horijdagi;

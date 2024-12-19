import React, { useEffect, useState } from "react";
import MigrationCard from "../../../../components/migration/migration";
// import UserFilterInput from "../../../../components/inputs/userFilterInput";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import {
  all_migrants,
  migrates_now_uzb,
  statistic_now_uzb,
} from "../../../../helpers/api/api";
import Accordion, {
  UserCardData,
} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import { Pagination } from "antd"; // Ant Design pagination import
// import { debounce } from "lodash";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

const Uzbekistondagilar: React.FC = () => {
  // const [activeCardId, setActiveCardId] = useState<any>(null);
  // const [countrySearch, setCountrySearch] = useState("")
  // const [regionSearch, setR9egionSearch] = useState("")
  // const [userSearch, setUserSearch] = useState("")
  const [regionItem, setRegionItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tabPage, setTabPage] = useState<1 | 2>(1);
  const getAllMigrant = useGlobalRequest(all_migrants, "GET");
  const getStatisticNowUzb = useGlobalRequest(statistic_now_uzb, "GET");

  const getUserNowUzb = useGlobalRequest(
    `${migrates_now_uzb}?districtName=${
      regionItem?.title ? regionItem?.title : ""
    }&page=${currentPage}&size=10`,
    "GET"
  );

  useEffect(() => {
    if (getUserNowUzb.response) {
      setTotalPages(Math.ceil(getUserNowUzb.response?.totalElements / 10));
    }
  }, [getUserNowUzb.response]);

  const userData: UserCardData[] =
    getUserNowUzb?.response?.object?.map((item: any) => ({
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

  const regionCards: CardData[] =
    getStatisticNowUzb?.response?.map((item: any) => ({
      id: item?.countryId,
      title: item?.name || "--",
      count: item?.migrantsCount || 0,
    })) || [];

  useEffect(() => {
    getStatisticNowUzb.globalDataFunc();
    getAllMigrant.globalDataFunc();
  }, []);

  

  return (
    <div>
      {tabPage === 1 && (
        <div className="flex flex-col gap-5 p-5">
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count={getAllMigrant?.response || 0}
            isActive={false}
            onClick={() => {}}
          />
          {/* <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          /> */}
          {getStatisticNowUzb.loading ? (
            <LoadingDiv />
          ) : regionCards && regionCards?.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {regionCards &&
                regionCards?.length > 0 &&
                regionCards?.map((card) => (
                  <MigrationCard
                    id={card?.id}
                    key={card?.id}
                    title={card?.title || ""}
                    count={card?.count || "0"}
                    isActive={false}
                    onClick={async () => {
                      await setRegionItem(card);
                      await getUserNowUzb.globalDataFunc();
                      await setTabPage(2);
                    }}
                  />
                ))}
            </div>
          ) : (
            <NotFoundDiv />
          )}
        </div>
      )}
      {tabPage === 2 && (
        <div className="flex flex-col gap-5 p-5">
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count={getAllMigrant?.response || 0}
            isActive={false}
            onClick={() => setTabPage(1)}
          />
          {/* <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          /> */}

          {getUserNowUzb.loading ? (
            <LoadingDiv />
          ) : userData && userData?.length > 0 ? (
            <div>
              {userData?.map((user, index) => (
                <Accordion key={index} userData={user} />
              ))}
              <div className="flex justify-center mt-5">
                <Pagination
                  defaultCurrent={1}
                  current={currentPage + 1}
                  total={getUserNowUzb.response?.totalElements || 0}
                  pageSize={10}
                  onChange={async (pageNumber: number) => {
                    
                    await setCurrentPage(pageNumber - 1);
                    await getUserNowUzb.globalDataFunc();
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

export default Uzbekistondagilar;

import React, { useEffect, useState } from "react";
import MigrationCard from "../../../../components/migration/migration";
// import UserFilterInput from "../../../../components/inputs/userFilterInput";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import {
  all_migrants,
  DashboardSearch,
  get_country,
  get_region,
  get_user_by_country,
  migrates_by_kashkadarya,
  statistic_by_kashkadarya,
} from "../../../../helpers/api/api";
import Accordion, {
  UserCardData,
} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import { Pagination } from "antd"; // Ant Design pagination import
import useFilterStore from "../../../../helpers/state-managment/filterStore/filterStore";
// import { debounce } from "lodash";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

const QashqadaryoBuyicha: React.FC = () => {
  // const [activeCardId, setActiveCardId] = useState<any>(null);
  // const [countrySearch, setCountrySearch] = useState("")
  // const [regionSearch, setR9egionSearch] = useState("")
  // const [userSearch, setUserSearch] = useState("")
  const [regionItem, setRegionItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tabPage, setTabPage] = useState<1 | 2>(1);
  const getAllMigrant = useGlobalRequest(all_migrants, "GET");
  const getStatisticBy = useGlobalRequest(statistic_by_kashkadarya, "GET");

  const getUserByCountry = useGlobalRequest(
    `${migrates_by_kashkadarya}?districtName=${regionItem?.title ? regionItem?.title : ""
    }&page=${currentPage}&size=10`,
    "GET"
  );

  useEffect(() => {
    if (getUserByCountry.response) {
      setTotalPages(Math.ceil(getUserByCountry.response?.totalElements / 10));
    }
  }, [getUserByCountry.response]);

  const [page, setPage] = useState<number>(0);
  const { filterName, departureCountryFilter,
    departureRegionFilter, departureDistrictFilter,
    departureStartFilter, currentStatusFilter, doubleDateList } = useFilterStore();
  useEffect(() => {
    MigrateGet.globalDataFunc();
    if (MigrateGet.response && MigrateGet.response.totalElements < 10) setPage(0)
  }, [page, filterName, departureCountryFilter, departureRegionFilter, departureDistrictFilter,
    departureStartFilter, currentStatusFilter, datePicker(1), datePicker(0)]);
  function datePicker(num: number) {
    let date, month, year;

    if (doubleDateList && doubleDateList[0]) {
      date = doubleDateList[num].date();
      month = doubleDateList[num].month() + 1;
      year = doubleDateList[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${date}/${month}/${year}`;
    }
  }

  const getDynamicUrl = () => {
    const queryParams: string = [
      filterName ? `fio=${filterName}` : '',
      departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
      departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
      departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
      departureStartFilter ? `departureStart=${departureStartFilter}` : '',
      datePicker(0) ? `birthStart=${datePicker(0)}` : '',
      datePicker(1) ? `birthFinish=${datePicker(1)}` : '',
      currentStatusFilter ? `currentStatus=${currentStatusFilter}` : '',
      page ? `page=${page}` : '',
    ]
      .filter(Boolean) // Bo'sh qiymatlarni chiqarib tashlash
      .join('&');

    return `${DashboardSearch}?${queryParams ? `${queryParams}&` : ''}`;
  };
  const dynamicUrl = getDynamicUrl();
  const MigrateGet = useGlobalRequest(dynamicUrl, "GET");
  const userDate: UserCardData[] =
    MigrateGet?.response?.object?.map((item: any) => ({
      additionalAddress: item?.birthVillage || "--", // Added fallback for missing values
      birthDate: item?.birthDate || "--",
      birthDistrict: item?.birthVillage || "--",
      departureArea: `${item?.departureCountry || "--"} ${item?.departureRegion || "--"} ${item?.departureDistrict || "--"}`,
      departureDate: item?.leavingCountryDate || "--",
      disconnectedTime: item?.disconnectedTime || "--",
      migrateFirstName: item?.firstName || "--", // Ensure you're using the correct fields
      migrateId: item?.id || "--",
      migrateLastName: item?.lastName || "--",
      migrateMiddleName: item?.middleName || "--",
      phoneNumber: item?.homeNumber || "--", // Correcting the field name to `homeNumber`
      suspiciousCases: item?.suspiciousCases || "--",
      typeOfActivity: item?.typeOfActivity || "--",
    })) || [];

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

  const regionCards: CardData[] =
    getStatisticBy?.response?.map((item: any) => ({
      id: item?.countryId,
      title: item?.name || "--",
      count: item?.migrantsCount || 0,
    })) || [];

  useEffect(() => {
    getStatisticBy.globalDataFunc();
    getAllMigrant.globalDataFunc();
  }, []);

  return (
    <div>
      {MigrateGet?.response?.object?.length > 0 ? (
        <>
          <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title="Jami migrantlarimiz soni"
            count={getAllMigrant?.response || 0}
            isActive={false}
            onClick={() => { }}
          />
          <div className="mt-4">
            {userDate?.map((user, index) => (
              <Accordion key={index} userData={user} />
            ))}
          </div>
        </>
      ) : (
        <> {tabPage === 1 && (
          <div className="flex flex-col gap-5 p-5">
            <MigrationCard
              id={"0"}
              flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
              title="Jami migrantlarimiz soni"
              count={getAllMigrant?.response || 0}
              isActive={false}
              onClick={() => { }}
            />
            {getStatisticBy.loading ? (
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
                        await getUserByCountry.globalDataFunc();
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

              {getUserByCountry.loading ? (
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
        </>
      )
      }
    </div>
  );
};

export default QashqadaryoBuyicha;

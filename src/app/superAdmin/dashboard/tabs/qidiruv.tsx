import React, { useEffect, useState } from "react";
import MigrationCard from "../../../../components/migration/migration";
// import UserFilterInput from "../../../../components/inputs/userFilterInput";
import { useGlobalRequest } from "../../../../helpers/functions/universal";
import {
  DashboardSearch,
  get_searchM,
  get_searchM_by_country,
  get_searchM_count,
  get_searchM_users,
} from "../../../../helpers/api/api";
import Accordion, {
  UserCardData,
} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import { Pagination } from "antd";
import useFilterStore from "../../../../helpers/state-managment/filterStore/filterStore";
// import { debounce } from "lodash";

interface CardData {
  id: number;
  flag?: string;
  title: string;
  count: string;
}

const Qidiruv: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<any>(null);
  // const [countrySearch, setCountrySearch] = useState("")
  // const [regionSearch, setR9egionSearch] = useState("")
  // const [userSearch, setUserSearch] = useState("")
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [regionItem, setRegionItem] = useState<any>(null);
  const getSearchM = useGlobalRequest(get_searchM, "GET");
  const getSearchCount = useGlobalRequest(get_searchM_count, "GET");
  const getRegion = useGlobalRequest(
    `${get_searchM_by_country}?countryId=${activeCardId?.id ? activeCardId?.id : 0}`,
    "GET"
  );

  const getSearchUsers = useGlobalRequest(
    `${get_searchM_users}?regionName=${regionItem?.title ? regionItem?.title : ""
    }&page=${currentPage}&size=10`,
    "GET"
  );



  const [tabPage, setTabPage] = useState<1 | 2 | 3>(1);

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
      departureArea: `${item?.departureCountry || ""} ${item?.departureRegion || ""} ${item?.departureDistrict || ""}`,
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
    getSearchUsers?.response?.object?.map((item: any) => ({
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
    getSearchM?.response?.map((item: any) => ({
      id: item.id,
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
    getSearchM.globalDataFunc();
    getSearchCount.globalDataFunc();
  }, []);



  const handleCardClick = async (item: any) => {
    await setActiveCardId(item);

    await setTabPage(2);
    await getRegion.globalDataFunc();
  };

  return (
    <div>
      {MigrateGet?.response?.object?.length > 0 ? (
        <>
        <MigrationCard
                id={"0"}
                flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                title="Jami migrantlarimiz soni"
                count={getSearchCount.response || 0}
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
        <>
          {tabPage === 1 && (
            <div className="flex flex-col gap-5 p-5">
              <MigrationCard
                id={"0"}
                flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                title="Jami migrantlarimiz soni"
                count={getSearchCount.response || 0}
                isActive={false}
                onClick={() => { }}
              />
              {/* <UserFilterInput
            name="Search country"
            onChange={debounce((e) => {
              setCountrySearch(e.target.value)
            }, 2000)}
            placeholder="Davlatlarni nomi bo'yicha qidirish"
            value={countrySearch || ""}
          /> */}
              {getSearchM.loading ? (
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
                          await getSearchUsers.globalDataFunc();
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
                count={getSearchCount?.response || 0}
                isActive={false}
                onClick={() => setTabPage(2)}
              />
              {/* <UserFilterInput
            name=""
            onChange={() => {}}
            placeholder=""
            value=""
          /> */}

              {getSearchUsers.loading ? (
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
                      total={getSearchUsers.response?.totalElements || 0}
                      pageSize={10}
                      onChange={async (pageNumber: number) => {

                        await setCurrentPage(pageNumber - 1);
                        await getSearchUsers.globalDataFunc();
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
      )}
    </div>
  );
};

export default Qidiruv;

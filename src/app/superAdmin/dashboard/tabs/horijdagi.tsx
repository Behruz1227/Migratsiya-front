import React, {useEffect, useState} from "react";
import MigrationCard from "../../../../components/migration/migration";
// import UserFilterInput from "../../../../components/inputs/userFilterInput";
import {useGlobalRequest} from "../../../../helpers/functions/universal";
import {
    all_migrants,
    DashboardSearch,
    get_country,
    get_region,
    get_user_by_country,
} from "../../../../helpers/api/api";
import Accordion, {
    UserCardData,
} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import {Pagination} from "antd";
import useFilterStore from "../../../../helpers/state-managment/filterStore/filterStore";
import {useTranslation} from "react-i18next";

// import { debounce } from "lodash";

interface CardData {
    id: number;
    flag?: string;
    title: string;
    count: string;
}

const Horijdagi: React.FC = () => {
    const {t} = useTranslation();
    const {
        filterName, departureCountryFilter,
        departureRegionFilter, departureDistrictFilter,
        departureStartFilter, currentStatusFilter, doubleDateList
    } = useFilterStore();
    const [activeCardId, setActiveCardId] = useState<any>(null);
    // const [countrySearch, setCountrySearch] = useState("")
    // const [regionSearch, setR9egionSearch] = useState("")
    // const [userSearch, setUserSearch] = useState("")
    // const [userSearch, setUserSearch] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [regionItem, setRegionItem] = useState<any>(null);
    const [page, setPage] = useState<number>(0);
    const [tabPage, setTabPage] = useState<1 | 2 | 3>(1);

    const getCountry = useGlobalRequest(get_country, "GET");
    const getAllMigrant = useGlobalRequest(all_migrants, "GET");
    const getRegion = useGlobalRequest(
        `${get_region}?countryId=${activeCardId?.id ? activeCardId?.id : 0}`,
        "GET"
    );

    const getUserByCountry = useGlobalRequest(
        `${get_user_by_country}?regionName=${regionItem?.title ? regionItem?.title : ""
        }&page=${currentPage}&size=10`,
        "GET"
    );

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
        ].filter(Boolean).join('&');

        return `${DashboardSearch}?${queryParams ? `${queryParams}&` : ''}`;
    };

    const dynamicUrl = getDynamicUrl();
    const MigrateGet = useGlobalRequest(dynamicUrl, "GET");

    useEffect(() => {
            MigrateGet.globalDataFunc();
            if (MigrateGet.response && MigrateGet.response.totalElements < 10) setPage(0)
        },
        [filterName, departureCountryFilter, departureRegionFilter, departureDistrictFilter,
            departureStartFilter, currentStatusFilter, datePicker(1), datePicker(0)]
    );

    // useEffect(() => {
    //     if (MigrateGet.response && MigrateGet.response?.object?.length > 0) {
    //         setUserSearch(MigrateGet.response);
    //     } else (
    //         setUserSearch(null)
    //     )
    // }, [MigrateGet?.response, MigrateGet.error])

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

    // console.log("userSearchuserSearchuserSearchuserSearch", userSearch);

    // const userDate: UserCardData[] =
    //   MigrateGet?.response?.object?.map((item: any) => ({
    //     additionalAddress: item?.birthVillage || "--", // Added fallback for missing values
    //     birthDate: item?.birthDate || "--",
    //     birthDistrict: item?.birthVillage || "--",
    //     departureArea:`${item?.departureCountry || ""} ${item?.departureRegion|| ""} ${item?.departureDistrict || ""}`,
    //     departureDate: item?.leavingCountryDate || "--",
    //     disconnectedTime: item?.disconnectedTime || "--",
    //     migrateFirstName: item?.firstName || "--", // Ensure you're using the correct fields
    //     migrateId: item?.id || "--",
    //     migrateLastName: item?.lastName || "--",
    //     migrateMiddleName: item?.middleName || "--",
    //     phoneNumber: item?.homeNumber || "--", // Correcting the field name to `homeNumber`
    //     suspiciousCases: item?.suspiciousCases || "--",
    //     typeOfActivity: item?.typeOfActivity || "--",
    //   })) || [];

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
            title: item?.regionName || "--",
            count: item?.migrantsCount || 0,
        })) || [];

    useEffect(() => {
        getCountry.globalDataFunc();
        getAllMigrant.globalDataFunc();
    }, []);

    const handleCardClick = async (item: any) => {
        setActiveCardId(item);
        setTabPage(2);
        await getRegion.globalDataFunc();
    };

    return (
        <div>
            {/* {userSearch && userSearch?.object?.length > 0 ? ( */}
            {/* <> */}
            {/* <MigrationCard
            id={"0"}
            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
            title={t("Jami migrantlarimiz soni")}
            count={getAllMigrant?.response || 0}
            isActive={false}
            onClick={() => setTabPage(2)}
          />
          <div className="mt-4">
            {userDate?.map((user, index) => (
              <Accordion key={index} userData={user} />
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              defaultCurrent={1}
              current={currentPage + 1}
              total={userSearch?.totalElements || 0}
              pageSize={10}
              onChange={async (pageNumber: number) => {
                await setCurrentPage(pageNumber - 1);
                await MigrateGet.globalDataFunc();
              }}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : ( */}
            <>
                {tabPage === 1 && (
                    <div className="flex flex-col gap-5 p-5">
                        <MigrationCard
                            id={"0"}
                            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                            title={t("Jami migrantlarimiz soni")}
                            count={getAllMigrant.response || 0}
                            isActive={false}
                            onClick={() => {
                            }}
                        />
                        {/* <UserFilterInput
          name="Search country"
          onChange={debounce((e) => {
            setCountrySearch(e.target.value)
          }, 2000)}
          placeholder="Davlatlarni nomi bo'yicha qidirish"
          value={countrySearch || ""}
        /> */}
                        {getCountry?.loading ? (
                            <LoadingDiv/>
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
                            <NotFoundDiv/>
                        )}
                        {/* <LoadingDiv /> */}
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
                            <LoadingDiv/>
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
                            <NotFoundDiv/>
                        )}
                    </div>
                )}
                {tabPage === 3 && (
                    <div className="flex flex-col gap-5 p-5">
                        <MigrationCard
                            id={"0"}
                            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                            title={t("Jami migrantlarimiz soni")}
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
                            <LoadingDiv/>
                        ) : userData && userData.length > 0 ? (
                            <div>
                                {userData?.map((user, index) => (
                                    <Accordion key={index} userData={user}/>
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
                            <NotFoundDiv/>
                        )}
                    </div>
                )}
            </>
            {/* // )} */}
        </div>
    );
};

export default Horijdagi;

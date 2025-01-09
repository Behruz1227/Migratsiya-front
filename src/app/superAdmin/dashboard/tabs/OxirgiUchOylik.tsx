import React, {useEffect, useState} from "react";
import MigrationCard from "../../../../components/migration/migration";
import {useGlobalRequest} from "../../../../helpers/functions/universal";
import {
    all_migrants,
    getMigrate,
    migrates_last_3month,
    statistic_last_3month,
} from "../../../../helpers/api/api";
import Accordion, {UserCardData} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import {Pagination} from "antd";
import useFilterStore from "../../../../helpers/state-managment/filterStore/filterStore";
import {useTranslation} from "react-i18next";
import {datePicker} from "../../../../helpers/constants/const.ts";

interface CardData {
    id: number;
    flag?: string;
    title: string;
    count: string;
}

const OxirgiUchOylik: React.FC = () => {
    const {t} = useTranslation();
    const {
        filterName,
        departureCountryFilter,
        departureRegionFilter,
        departureDistrictFilter,
        departureStartFilter,
        currentStatusFilter,
        doubleDateList
    } = useFilterStore();
    const [regionItem, setRegionItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [tabPage, setTabPage] = useState<1 | 2>(1);
    const [page, setPage] = useState<number>(0);
    // const [activeCardId, setActiveCardId] = useState<any>(null);
    // const [countrySearch, setCountrySearch] = useState("")
    // const [regionSearch, setR9egionSearch] = useState("")
    // const [userSearch, setUserSearch] = useState("")

    const getDynamicUrl = () => {
        const queryParams: string = [
            filterName ? `fio=${filterName}` : '',
            departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
            departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
            departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
            departureStartFilter ? `departureStart=${departureStartFilter}` : '',
            datePicker(0, doubleDateList) ? `birthStart=${datePicker(0, doubleDateList)}` : '',
            datePicker(1, doubleDateList) ? `birthFinish=${datePicker(1, doubleDateList)}` : '',
            currentStatusFilter ? `currentStatus=${currentStatusFilter}` : '',
            page ? `page=${page}` : '',
        ].filter(Boolean).join('&');

        return `${getMigrate}?${queryParams ? `${queryParams}&` : ''}`;
    };
    const MigrateGet = useGlobalRequest(getDynamicUrl(), "GET");
    const getAllMigrant = useGlobalRequest(all_migrants, "GET");
    const getStatisticBy3Month = useGlobalRequest(statistic_last_3month, "GET");
    const getUserBy3Month = useGlobalRequest(
        `${migrates_last_3month}?districtName=${regionItem?.title ? regionItem?.title : ""
        }&page=${currentPage}&size=10`,
        "GET"
    );

    useEffect(() => {
        getStatisticBy3Month.globalDataFunc().then(() => "");
        getAllMigrant.globalDataFunc().then(() => "");
    }, []);

    useEffect(() => {
        MigrateGet.globalDataFunc().then(() => "");
        if (MigrateGet.response && MigrateGet.response.totalElements < 10) setPage(0)
    }, [
        page,
        filterName,
        departureCountryFilter,
        departureRegionFilter,
        departureDistrictFilter,
        departureStartFilter,
        currentStatusFilter,
        datePicker(1, doubleDateList),
        datePicker(0, doubleDateList)
    ]);

    const userData: UserCardData[] =
        getUserBy3Month?.response?.object?.map((item: any) => ({
            additionalAddress: item?.additionalAddress || null,
            birthDate: item?.birthDate || null,
            birthDistrict: item?.birthDistrict || null,
            departureArea: item?.departureArea || null,
            departureDate: item?.departureDate || null,
            disconnectedTime: item?.disconnectedTime || null,
            migrateFirstName: item?.migrateFirstName || null,
            migrateId: item?.migrateId || null,
            migrateLastName: item?.migrateLastName || null,
            departureFinishDate: item?.returningUzbekistanDate || "--",
            migrateMiddleName: item?.migrateMiddleName || null,
            phoneNumber: item?.phoneNumber || null,
            suspiciousCases: item?.suspiciousCases || null,
            typeOfActivity: item?.typeOfActivity || null,
        })) || [];

    const regionCards: CardData[] =
        getStatisticBy3Month?.response?.map((item: any) => ({
            id: item?.countryId,
            title: item?.districtName || "--",
            count: item?.migrantsCount || 0,
        })) || [];

    return (
        <div>
            <>
                {tabPage === 1 && (
                    <div className="flex flex-col gap-5 p-5">
                        <MigrationCard
                            id={"0"}
                            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                            title={t("Jami migrantlarimiz soni")}
                            count={getAllMigrant?.response || 0}
                            isActive={false}
                            onClick={() => {
                            }}
                        />
                        {getStatisticBy3Month.loading ? <LoadingDiv/> : regionCards && regionCards?.length > 0 ? (
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
                                                setRegionItem(card);
                                                setTabPage(2);
                                                await getUserBy3Month.globalDataFunc();
                                            }}
                                        />
                                    ))}
                            </div>
                        ) : <NotFoundDiv/>}
                    </div>
                )}
                {tabPage === 2 && (
                    <div className="flex flex-col gap-5 p-5">
                        <MigrationCard
                            id={"0"}
                            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                            title={t("Jami migrantlarimiz soni")}
                            count={getAllMigrant?.response || 0}
                            isActive={false}
                            onClick={() => setTabPage(1)}
                        />
                        {getUserBy3Month.loading ? <LoadingDiv/> : userData && userData?.length > 0 ? (
                            <div>
                                {userData?.map((user, index) => (
                                    <Accordion key={index} userData={user}/>
                                ))}
                                <div className="flex justify-center mt-5">
                                    <Pagination
                                        defaultCurrent={1}
                                        current={currentPage + 1}
                                        total={getUserBy3Month.response?.totalElements || 0}
                                        pageSize={10}
                                        onChange={async (pageNumber: number) => {
                                            setCurrentPage(pageNumber - 1);
                                            await getUserBy3Month.globalDataFunc();
                                        }}
                                        showSizeChanger={false}
                                    />
                                </div>
                            </div>
                        ) : <NotFoundDiv/>}
                    </div>
                )}
            </>
        </div>
    );
};

export default OxirgiUchOylik;

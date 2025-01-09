import React, {useEffect, useState} from "react";
import MigrationCard from "../../../../components/migration/migration";
import {useGlobalRequest} from "../../../../helpers/functions/universal";
import {
    getMigrate,
    get_brigader,
    get_brigader_by_country,
    get_brigader_count,
    get_brigader_users,
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

const Brigaderlar: React.FC = () => {
    const {t} = useTranslation();
    const {
        filterName, departureCountryFilter,
        departureRegionFilter, departureDistrictFilter,
        departureStartFilter, currentStatusFilter, doubleDateList
    } = useFilterStore();
    const [activeCardId, setActiveCardId] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [regionItem, setRegionItem] = useState<any>(null);
    const [tabPage, setTabPage] = useState<1 | 2 | 3>(1);
    const [page, setPage] = useState<number>(0);

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
    const getBrigader = useGlobalRequest(get_brigader, "GET");
    const getBrigaderCount = useGlobalRequest(get_brigader_count, "GET");
    const getRegion = useGlobalRequest(
        `${get_brigader_by_country}?countryId=${activeCardId?.id ? activeCardId?.id : 0}`,
        "GET"
    );

    const getUserByCountry = useGlobalRequest(
        `${get_brigader_users}?regionName=${regionItem?.title ? regionItem?.title : ""
        }&page=${currentPage}&size=10`,
        "GET"
    );

    useEffect(() => {
        getBrigader.globalDataFunc().then(() => "");
        getBrigaderCount.globalDataFunc().then(() => "");
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
            departureFinishDate: item?.returningUzbekistanDate || "--",
            typeOfActivity: item?.typeOfActivity || null
        })) || [];

    const cards: CardData[] =
        getBrigader?.response?.map((item: any) => ({
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

    const handleCardClick = async (item: any) => {
        setActiveCardId(item);
        setTabPage(2);
        await getRegion.globalDataFunc();
    };

    return (
        <div>
            <>  {tabPage === 1 && (
                <div className="flex flex-col gap-5 p-5">
                    <MigrationCard
                        id={"0"}
                        flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                        title={t("Jami migrantlarimiz soni")}
                        count={getBrigaderCount.response || 0}
                        isActive={false}
                        onClick={() => {
                        }}
                    />
                    {getBrigader.loading ? <LoadingDiv/> : cards && cards.length > 0 ? (
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
                    ) : <NotFoundDiv/>}
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
                        {getRegion.loading ? <LoadingDiv/> : regionCards && regionCards?.length > 0 ? (
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
                                                setRegionItem(card);
                                                setTabPage(3);
                                                await getUserByCountry.globalDataFunc();
                                            }}
                                        />
                                    ))}
                            </div>
                        ) : <NotFoundDiv/>}
                    </div>
                )}
                {tabPage === 3 && (
                    <div className="flex flex-col gap-5 p-5">
                        <MigrationCard
                            id={"0"}
                            flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                            title={t("Jami migrantlarimiz soni")}
                            count={getBrigaderCount?.response || 0}
                            isActive={false}
                            onClick={() => setTabPage(2)}
                        />
                        {getUserByCountry.loading ? <LoadingDiv/> : userData && userData.length > 0 ? (
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
                                            setCurrentPage(pageNumber - 1);
                                            await getUserByCountry.globalDataFunc();
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

export default Brigaderlar;

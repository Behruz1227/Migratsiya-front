import React, {useEffect, useState} from "react";
import MigrationCard from "../../../../components/migration/migration";
import {useGlobalRequest} from "../../../../helpers/functions/universal";
import {
    all_migrants,
    migrates_by_kashkadarya,
    statistic_by_kashkadarya,
} from "../../../../helpers/api/api";
import Accordion, {UserCardData} from "../../../../components/acardion/acardion";
import NotFoundDiv from "../../../../components/not-found/notFoundDiv";
import LoadingDiv from "../../../../components/loading/loadingDiv";
import {Pagination} from "antd";
import {useTranslation} from "react-i18next";
import moment from "moment";

interface CardData {
    id: number;
    flag?: string;
    title: string;
    count: string;
}

const QashqadaryoBuyicha: React.FC = () => {
    const {t} = useTranslation();
    const [regionItem, setRegionItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [tabPage, setTabPage] = useState<1 | 2>(1);

    const getAllMigrant = useGlobalRequest(all_migrants, "GET");
    const getStatisticBy = useGlobalRequest(statistic_by_kashkadarya, "GET");
    const getUserByCountry = useGlobalRequest(
        `${migrates_by_kashkadarya}?districtName=${regionItem?.title ? regionItem?.title : ""
        }&page=${currentPage}&size=10`,
        "GET"
    );

    useEffect(() => {
        getStatisticBy.globalDataFunc().then(() => "");
        getAllMigrant.globalDataFunc().then(() => "");
    }, []);

    useEffect(() => {
        if (regionItem) getUserByCountry.globalDataFunc().then(() => "");
    }, [regionItem, currentPage]);

    const userData: UserCardData[] =
        getUserByCountry?.response?.object?.map((item: any) => ({
            migrateFirstName: item?.migrateFirstName || null,
            migrateLastName: item?.migrateLastName || null,
            migrateMiddleName: item?.migrateMiddleName || null,
            birthDistrict: item?.birthDistrict || null,
            birthDate: item?.birthDate ? moment(item?.birthDate).format("DD.MM.YYYY") : null,
            departureDate: item?.departureDate ? moment(item?.departureDate).format("DD.MM.YYYY") : null,
            departureFinishDate: item?.returnedDate ? moment(item?.returnedDate).format("DD.MM.YYYY") : null,
            phoneNumber: item?.phoneNumber ? item?.phoneNumber : null,
            phoneNumberDeparture: item?.phoneNumberDeparture ? item?.phoneNumberDeparture : null,
            disconnectedTime: item?.disconnectedTime || null,
            birthVillage: item?.birthVillage || null,
            departureCountry: item?.departureCountry || null,
            departureRegion: item?.departureRegion || null,
            departureDistrict: item?.departureDistrict || null,
            additionalAddress: item?.additionalAddress || null,
            additionalInfo: item?.additionalInfo || null,
            workplace: item?.workplace || null,
            typeOfActivity: item?.typeOfActivity || null,
            suspiciousCases: item?.suspiciousCases || null,
        })) || [];

    const regionCards: CardData[] =
        getStatisticBy?.response?.map((item: any) => ({
            id: item?.countryId,
            title: item?.districtName || "--",
            count: item?.migrantsCount || 0,
        })) || [];

    return (
        <div>
            <> {tabPage === 1 && (
                <div className="flex flex-col gap-5 p-5">
                    <MigrationCard
                        id={"0"}
                        flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                        title={t("Jami migrantlarimiz soni")}
                        count={getAllMigrant?.response || 0}
                        isActive={false}
                    />
                    {getStatisticBy.loading ? <LoadingDiv/> : regionCards && regionCards?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {regionCards &&
                                regionCards?.length > 0 &&
                                regionCards?.map((card) => (
                                    <MigrationCard
                                        id={card?.id}
                                        key={card?.id}
                                        title={card?.title || ""}
                                        count={card?.count || "0"}
                                        isActive={false}
                                        onClick={() => {
                                            setRegionItem(card);
                                            setTabPage(2);
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
                            onClick={() => {
                                setTabPage(1);
                                setRegionItem(null);
                                setCurrentPage(0);
                            }}
                        />
                        <div className={'flex justify-end leading-3'}>
                            {(regionItem?.title && regionItem?.count) && (
                                <h1 className={'font-bold'}>{regionItem.title}: {regionItem.count}</h1>
                            )}
                        </div>
                        {getUserByCountry.loading ? <LoadingDiv/> : userData && userData?.length > 0 ? (
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
                                        onChange={(pageNumber: number) => setCurrentPage(pageNumber - 1)}
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

export default QashqadaryoBuyicha;

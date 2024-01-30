import axios from "axios";
import { ICatData, IParsedData, TSection } from "./Interfaces";
import { Get_Home_Data_URL, dummyUrl } from "@/server/REST_API_Const";
import { data } from "@/data";

export async function getServerSidePropsForSection(section: TSection) {
    switch (section) {
        case "home":
            // Fetch data for the home section
            return await fetchDataForHome();
        case "add-bills":
            // Fetch data for the add bills section
            return await fetchDataForAddBills();
        case "goals":
            // Fetch data for the home section
            return await fetchDataForGoals();
        case "monthly-spending":
            // Fetch data for the add bills section
            return await fetchDataForMonthlySpending();

        default:
            return null;
    }
}

const fetchDataForHome = async () => {
    let parsedData: IParsedData[] = [];
    let catData: ICatData[] = [];
    try {
        // const response = await axios.get(Get_Home_Data_URL);
        // const apiClient = axios.create({
        //     baseURL: dummyUrl
        // })
        // const response2 = await apiClient.get(dummyUrl);
        // if (response2.data && response2.data.message) {
        //     console.log(response2.data.message);
        // } else {
        //     console.log('Message property not found in response:', response2.data);
        // }
        // response.data
        
        parsedData = data
            .map((d) => {
                const correctDate = new Date(d.dueDate);
                return { ...d, dueDate: correctDate.toLocaleDateString() };
            })
            .filter((d, index) => index < 10);
        const totalByCategory = parsedData.reduce(
            (acc: { [key: string]: number }, item) => {
                var value = (acc[item.category] || 0) + item.amount;
                acc[item.category] = parseFloat(value.toFixed(2));
                return acc;
            },
            {},
        );
        Object.entries(totalByCategory).forEach(([value, amt]) => {
            catData.push({
                name: value.toUpperCase(),
                amount: amt,
            });
        });
        catData.sort((a, b) => b.amount - a.amount);
    } catch (err) {
        console.error(err);
    }
    const responseData = {
        parsedData,
        catData,
    };
    return {
        data: responseData,
    };
};
const fetchDataForAddBills = async () => {
    let parsedData: IParsedData[] = [];
    let catData: ICatData[] = [];
    return {
        data: null,
    };
};
const fetchDataForGoals = async () => {
    let parsedData: IParsedData[] = [];
    let catData: ICatData[] = [];
    return {
        data: null,
    };
};
const fetchDataForMonthlySpending = async () => {
    let parsedData: IParsedData[] = [];
    let catData: ICatData[] = [];
    return {
        data: null,
    };
};

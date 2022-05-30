import http from "../http-common";
import CoachData from "../types/Coach";


const getCoachByID = async (id: any) => {
    const tmp = await http.get<Array<CoachData>>(`/coach?id=${id}`);
    return tmp.data[0];
};

const getAllCoaches = async () => {
    const tmp = await http.get<Array<CoachData>>(`/coach/all`);
    console.log(tmp.data)
    return tmp.data;
};

const CoachService = {
    getCoachByID,
    getAllCoaches
};

export default CoachService;

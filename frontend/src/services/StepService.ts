import http from "../http-common";
import StepData from "../types/Step";


const create = async (id:any, data: StepData) => {
    const tmp =  await http.post<StepData>(`/step?id=${id}`, data);
    return  tmp.data;
};


const StepService = {
    create
};

export default StepService;

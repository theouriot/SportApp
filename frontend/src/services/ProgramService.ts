import http from "../http-common";
import ProgramData from "../types/Program";

const getProgramByID = async (id: any) => {
    const tmp = await http.get<ProgramData>(`/program?id=${id}`);
    return tmp.data;
};

const getAllPrograms = async () => {
    const tmp = await http.get<Array<ProgramData>>("/program/all");
    return tmp.data;
};

const addView = async (id: any) => {
    const tmp = await http.put<any>(`/program/addView?id=${id}`);
    return tmp.data;
}

const ProgramService = {
    getAllPrograms,
    getProgramByID,
    addView
};

export default ProgramService;

import http from "../http-common";
import ProgramData from "../types/Program";
import ProgramCreationData from "../types/ProgramCreation";

const getProgramByID = async (id: any) => {
    const tmp = await http.get<ProgramData>(`/program?id=${id}`);
    return tmp.data;
};

const getAllPrograms = async () => {
    const tmp = await http.get<Array<ProgramData>>("/program/all");
    return tmp.data;
};

const getAllProgramsByCoach = async (id: any) => {
    const tmp = await http.get<Array<ProgramData>>(`/program/byCoach?id=${id}`);
    return tmp.data;
};

const hasAlreadyLiked = async (id : any,idClient: any) => {
    const tmp = await http.get<any>(`/program/hasAlreadyLiked?id=${id}&idClient=${idClient}`);
    return tmp;
};

const addView = async (id: any) => {
    const tmp = await http.put<any>(`/program/addView?id=${id}`);
    return tmp.data;
}

const addLike = async (id: any, idClient: any) => {
    const tmp = await http.put<any>(`/program/addLike?id=${id}&idClient=${idClient}`);
    return tmp.data;
}

const addDislike = async (id: any, idClient: any) => {
    const tmp = await http.put<any>(`/program/addDislike?id=${id}&idClient=${idClient}`);
    return tmp.data;
}

const create = async (data: ProgramCreationData) => {
    const tmp =  await http.post<ProgramData>("/program", data);
    return  tmp.data;
};

const ProgramService = {
    getAllPrograms,
    getProgramByID,
    getAllProgramsByCoach,
    hasAlreadyLiked,
    addView,
    create,
    addLike,
    addDislike
};

export default ProgramService;

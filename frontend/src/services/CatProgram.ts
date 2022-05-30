import http from "../http-common";
import Data from "../types/Data";

const getAllCatsProgram = async () => {
    const tmp = await http.get<Array<Data>>(`/programCat/all`);
    return tmp.data;
};

const getCatProgramByID = async (id: any) => {
    const tmp = await http.get<Data>(`/programCat?id=${id}`);
    return tmp.data.name;
};

const CatProgramService = {
    getAllCatsProgram,
    getCatProgramByID
};

export default CatProgramService;

import http from "../http-common";
import Data from "../types/Data";


const getAllCatsProgram = async () => {
    const tmp = await http.get<Array<Data>>(`/programCat/all`);
    console.log(tmp.data)
    return tmp.data;
};

const CatProgramService = {
    getAllCatsProgram
};

export default CatProgramService;

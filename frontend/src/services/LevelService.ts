import http from "../http-common";
import Data from "../types/Data";


const getAllLevels = async () => {
    const tmp = await http.get<Array<Data>>(`/level/all`);
    console.log(tmp.data)
    return tmp.data;
};


const LevelService = {
    getAllLevels
};

export default LevelService;

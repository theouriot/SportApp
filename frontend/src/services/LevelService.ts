import http from "../http-common";
import Data from "../types/Data";

const getAllLevels = async () => {
    const tmp = await http.get<Array<Data>>(`/level/all`);
    return tmp.data;
};

const getLevelByID = async (id: any) => {
    const tmp = await http.get<Data>(`/level?id=${id}`);
    return tmp.data.name;
};

const LevelService = {
    getAllLevels,
    getLevelByID
};

export default LevelService;

import http from "../http-common";
import ClientData from "../types/Client";


const getClientByID = async (id: any) => {
    const tmp = await http.get<Array<ClientData>>(`/client?id=${id}`);
    return tmp.data[0];
};

const update = async (id: any,data: any) => {
    const tmp =  await http.put<ClientData>(`/client?id=${id}`,data);
    return  tmp.data
};

const ClientService = {
    getClientByID,
    update
};

export default ClientService;

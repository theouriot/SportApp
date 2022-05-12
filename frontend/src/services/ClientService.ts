import http from "../http-common";
import ClientData from "../types/Client";

const getClientByID = async (id: any) => {
    const tmp = await http.get<Array<ClientData>>(`/client?id=${id}`);
    return tmp.data[0];
};

const ClientService = {
    getClientByID
};

export default ClientService;

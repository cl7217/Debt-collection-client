import { mockClients } from "../mock/mockClients";

export const getClients = async () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockClients), 400);
    });
};

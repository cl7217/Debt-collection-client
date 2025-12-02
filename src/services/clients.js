// src/services/clientsService.js
import axios from "axios";

const baseUrl = "https://localhost:7090/api/Client";

export const getClients = () => {
  const clients = axios.get(baseUrl).then(res => res.data);

  return clients;
};

export const getClientById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then(res => res.data);
};

export const postClient = (clientData) => {
  return axios.post(baseUrl, clientData).then(res => res.data);
};

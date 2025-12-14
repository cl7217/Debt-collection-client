// src/services/clientsService.js
import axios from "axios";

const baseUrl = "https://localhost:7090/api/Site";

export const getSites = () => {
  const clients = axios.get(baseUrl).then(res => res.data);

  return clients;
};

export const getSiteById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then(res => res.data);
};

// GET: api/Site/by-client/{clientId}
export const getSiteByClient = (ClientId) => {
  return axios.get(`${baseUrl}/by-client/${ClientId}`).then(res => res.data);
};

export const postSite = (siteData) => {
  const response = axios.post(baseUrl, siteData).then(res => res.data);
  console.log(response);
  return response;
  
};




import axios from "axios";

const baseUrl = "https://localhost:7090/api/Agent";

export const getAgents = () => {
  const agents = axios.get(baseUrl).then(res => res.data);
  return agents;
};

export const getAgentById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then(res => res.data);
};

export const postAgent = (agentData) => {
  return axios.post(baseUrl, agentData).then(res => res.data);
};

export const updateAgent = (agentData) => {
  return axios.put(baseUrl, agentData).then(res => res.data);
};

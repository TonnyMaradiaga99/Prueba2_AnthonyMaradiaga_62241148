import axios from 'axios';

const API_URL = 'http://localhost:3000/polizas';

export const getPolicies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPolicy = async (policyData) => {
  const response = await axios.post(API_URL, policyData);
  return response.data;
};

export const updatePolicy = async (id, policyData) => {
  const response = await axios.put(`${API_URL}/${id}`, policyData);
  return response.data;
};

export async function deletePolicy(id) {
  const response = await fetch(`http://localhost:3000/polizas/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Error al eliminar la póliza');
  }
  return response.json();
}
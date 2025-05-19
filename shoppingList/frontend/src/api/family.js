import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const getUserFamilies = (userId) =>
  axios.post(`${API_BASE}/Family/UserFamily/${userId}`);

export const createFamily = (userId, nameFamily) =>
  axios.post(`${API_BASE}/Family/creatFamily/${userId}`, { nameFamily });

export const getFamilyMembers = (familyId) =>
  axios.post(`${API_BASE}/Family/familyMembers`, { familyId });

export const addFamilyMember = (email, familyId) =>
  axios.post(`${API_BASE}/Family/addFamilyMembers/`, { email, familyId });

export const deleteFamily = (familyId) =>
  axios.delete(`${API_BASE}/delteFamily/${familyId}`);

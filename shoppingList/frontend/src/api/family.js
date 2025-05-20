import axios from 'axios';

const API_BASE = 'http://localhost:5000';

///////////////////Families///////////////////

export const getUserFamilies = (userId) =>
    axios.post(`${API_BASE}/Family/UserFamily/${userId}`);

export const createFamily = (userId, nameFamily) =>
    axios.post(`${API_BASE}/Family/creatFamily/${userId}`, { nameFamily });

export const deleteFamily = (familyId) =>
    axios.delete(`${API_BASE}/Family/delteFamily/${familyId}`);

///////////FamilyMembers//////////////

export const getFamilyMembers = (familyId) =>
    axios.post(`${API_BASE}/Family/familyMembers`, { familyId });

export const addFamilyMember = (email, familyId) =>
    axios.post(`${API_BASE}/Family/addFamilyMembers/`, { email, familyId });

export const deleteFamilyMember = (familyId, userId) =>
    axios.delete(`${API_BASE}/Family/deleteFamilyMember/${familyId}`, {
        data: { userId }
    });

export const updateFamilyMember = (familyId, userId) =>
    {
        console.log(familyId, userId);
        
        axios.post(`${API_BASE}/Family/updateFamilyMembers/${familyId}`, 
       { userId }
    );}


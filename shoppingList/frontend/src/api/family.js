import axios from 'axios';

// API_BASE the server location
const API_BASE = 'http://localhost:5000';

///////////////////Families///////////////////

//api for get the Families by userId
export const getUserFamilies = (userId) =>
    axios.post(`${API_BASE}/Family/UserFamily/${userId}`);

//api for create the Familie by userId  and name
export const createFamily = (userId, nameFamily) =>
    axios.post(`${API_BASE}/Family/creatFamily/${userId}`, { nameFamily });

//api for delete by family Id
export const deleteFamily = (familyId) =>
    axios.delete(`${API_BASE}/Family/delteFamily/${familyId}`);

///////////FamilyMembers//////////////

//api for get Family Members by family Id
export const getFamilyMembers = (familyId) =>
    axios.post(`${API_BASE}/Family/familyMembers`, { familyId });

//api for add Family Member by email of the user and familyId
export const addFamilyMember = (email, familyId) =>
    axios.post(`${API_BASE}/Family/addFamilyMembers/`, { email, familyId });

//api for  delete Family Member by familyId userId
export const deleteFamilyMember = (familyId, userId) =>
    axios.delete(`${API_BASE}/Family/deleteFamilyMember/${familyId}`, {
        data: { userId }
    });

//api for update Family Member by familyId userId
export const updateFamilyMember = (familyId, userId) => {
    console.log(familyId, userId);

    axios.post(`${API_BASE}/Family/updateFamilyMembers/${familyId}`,
        { userId }
    );
}
///////////ShoppingList//////////////

//api for createS hopping List by FamilyId, and name
export const createShoppingList = (selectedFamilyId, newShoppingFamily) =>
    axios.post(`${API_BASE}/Shopping/createShoppingList/${selectedFamilyId}`, { newShoppingFamily });

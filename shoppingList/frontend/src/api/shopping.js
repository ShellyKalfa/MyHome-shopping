import axios from 'axios';

// API_BASE the server location
const API_BASE = 'http://localhost:5000';

///////////ShoppingList//////////////

//api for create Shopping List by FamilyId, and name
export const createShoppingFamily = (selectedFamilyId, newShoppingFamilyName) =>
    axios.post(`${API_BASE}/Shopping/createShoppingFamily/${selectedFamilyId}`, { ShoppingFamilyName:newShoppingFamilyName });

//api for get Shopping Lists by FamilyId
export const getShoppingFamily = (selectedFamilyId) =>
  axios.post(`${API_BASE}/Shopping/shoppingFamily/${selectedFamilyId}`, {   });

import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const createShoppingFamily = (selectedFamilyId, newShoppingFamilyName) =>
    axios.post(`${API_BASE}/Shopping/createShoppingFamily/${selectedFamilyId}`, { ShoppingFamilyName:newShoppingFamilyName });

export const getShoppingFamily = (selectedFamilyId) =>
  axios.post(`${API_BASE}/Shopping/shoppingFamily/${selectedFamilyId}`, {   });

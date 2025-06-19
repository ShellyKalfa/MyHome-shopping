import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const createShoppingFamily = (selectedFamilyId, newShoppingFamilyName) =>
    axios.post(`${API_BASE}/Shopping/createShoppingFamily/${selectedFamilyId}`, { ShoppingFamilyName:newShoppingFamilyName });

export const getShoppingAdmin = (ShoppingId, userId) =>
    axios.post(`${API_BASE}/Shopping/getShoppingAdmin/${ShoppingId}`, { userId });

export const getShoppingFamily = (selectedFamilyId) =>
  axios.post(`${API_BASE}/Shopping/shoppingFamily/${selectedFamilyId}`, {   });

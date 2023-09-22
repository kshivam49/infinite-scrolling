import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchItems = async (page, limit) => {
  try {
    const response = await api.get(`/coins/markets?vs_currency=usd&page=${page}&per_page=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

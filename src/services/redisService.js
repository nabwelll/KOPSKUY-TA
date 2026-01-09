const API_URL = 'http://localhost:3001/api';

export const redisService = {
  // Set cache
  async setCache(key, value, expiry = null) {
    const response = await fetch(`${API_URL}/cache/set`, {
      method: 'POST',
      headers:  { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value, expiry })
    });
    return response.json();
  },

  // Get cache
  async getCache(key) {
    const response = await fetch(`${API_URL}/cache/get/${key}`);
    return response.json();
  },

  // Delete cache
  async deleteCache(key) {
    const response = await fetch(`${API_URL}/cache/delete/${key}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Get coffee menu (with caching)
  async getCoffeeMenu() {
    const response = await fetch(`${API_URL}/menu/coffee`);
    return response.json();
  },

  // Counter example
  async incrementVisit() {
    const response = await fetch(`${API_URL}/counter/increment`, {
      method: 'POST'
    });
    return response.json();
  },

  async getVisitCount() {
    const response = await fetch(`${API_URL}/counter/get`);
    return response.json();
  }
};
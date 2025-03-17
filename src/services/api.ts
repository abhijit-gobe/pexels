const PEXELS_API_KEY = 'G9stNnIWwZvXTwrCqCzboQqdAlu3DUP4CrdJ82DkrjyjsfqQdpx0qDEI'; // Replace with your actual API key
const BASE_URL = 'https://api.pexels.com/v1';

export const api = {
  async search(query: string, page = 1, filters: any = {}) {
    const params = new URLSearchParams({
      query,
      page: String(page),
      per_page: '30',
      ...filters,
    });

    const response = await fetch(`${BASE_URL}/search?${params}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    return response.json();
  },

  async getCurated(page = 1) {
    const response = await fetch(
      `${BASE_URL}/curated?page=${page}&per_page=30`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch curated images');
    }

    return response.json();
  },
};
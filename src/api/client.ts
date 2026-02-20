const BASE_URL = "https://api.tvmaze.com";

const apiClient = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};
export default apiClient;

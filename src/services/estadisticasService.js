import API_BASE_URL from "./apiConfig";

export const estadisticasService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/estadisticas`);
    return res.json();
  },
};

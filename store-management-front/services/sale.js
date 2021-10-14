import api from './api';

const saleService = {
  fetchSale: (id) => api(`sales/${id}`),
  deleteSale: (id) =>
    api(`sales/${id}`, {
      method: 'DELETE',
    }),
  createSale: (createSaleData) =>
    api('sales/', {
      method: 'POST',
      body: JSON.stringify(createSaleData),
    }),
  updateSale: (saleId, udpateSaleData) =>
    api(`sales/${saleId}`, {
      method: 'PUT',
      body: JSON.stringify(udpateSaleData),
    }),
};

export default saleService;

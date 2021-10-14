import api from './api';

const productService = {
  getManufacturers: () => {},
  getDistributors: () => api('products/distributors'),
  getProducts: () => api('products/?page=1&per_page=100'),
  createInventory: (createInventoryData) =>
    api('products/create-inventory', {
      method: 'POST',
      body: JSON.stringify(createInventoryData),
    }),
};

export default productService;

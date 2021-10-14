import api from './api';

const customerService = {
  getCustomers: () => api('customers/?page=1&per_page=100'),
};

export default customerService;

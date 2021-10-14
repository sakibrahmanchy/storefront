import api from './api';

const rightService = {
  listAll: () => api('rights'),
};

export default rightService;

const permissionPageMaps = [
  {
    route: '/users/',
    right: 'users-view',
  },
  {
    right: 'users-add',
    route: '/users/create',
  },
  {
    route: '/products/',
    right: 'products-view',
  },
  {
    right: 'products-add',
    route: '/products/create-inventory',
  },
  {
    route: '/sales/',
    right: 'sales-view',
  },
  {
    right: 'sales-add',
    route: '/sales/create',
  },
  {
    route: '/products/[id]',
    right: 'products-edit',
  },
  {
    route: '/profile/[id]',
    right: 'profile-view',
  },
  {
    route: '/users/[id]',
    right: 'users-edit',
  },
  {
    route: '/sales/[id]',
    right: 'sales-edit',
  },
];

export default permissionPageMaps;

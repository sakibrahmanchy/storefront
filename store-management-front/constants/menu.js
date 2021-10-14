const menus = [
  {
    name: 'Users',
    route: '/users/',
    right: 'users-view',
    children: [
      {
        name: 'Create User',
        right: 'users-add',
        description: 'Manage your users',
        route: '/users/create',
      },
      {
        name: 'List User',
        description: 'Manage your users',
        right: 'users-view',
        route: '/users',
      },
    ],
  },
  {
    name: 'Products',
    route: '/products/',
    right: 'products-view',
    children: [
      {
        name: 'Create Inventory',
        right: 'products-add',
        description: 'Create new inventory',
        route: '/products/create-inventory',
      },
      {
        name: 'List Inventory',
        right: 'products-view',
        description: 'List inventory',
        route: '/products/',
      },
    ],
  },
  {
    name: 'Sales',
    route: '/sales/',
    right: 'sales-view',
    children: [
      {
        name: 'Create Sale',
        right: 'sales-add',
        description: 'Create New Sale',
        route: '/sales/create',
      },
      {
        name: 'List Sale',
        right: 'sales-view',
        description: 'List Sale',
        route: '/sales',
      },
    ],
  },
  {
    name: 'Customers',
    route: '/customers/',
    children: [
      {
        name: 'Create User',
        right: 'customers-add',
        description: 'Manage your users',
        route: 'users/create',
      },
    ],
  },
];

export default menus;

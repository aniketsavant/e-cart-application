import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Orders',
    url: '/orders',
    icon: 'icon-note',
  },
  {
    name: 'Category',
    url: '/categories',
    icon: 'icon-menu',
  },
  {
    title: true,
    name: 'Product'
  },
  {
    name: 'Add Product',
    url: '/add-product',
    icon: 'icon-plus'
  },
  {
    name: 'Product List',
    url: '/product-list',
    icon: 'icon-list'
  },
  
 
];

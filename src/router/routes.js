export const route = [
  {
    name: 'HomePage',
    text: '首页',
    parent: '',
    path: '/',
    component: () => import('../views/HomePage.vue')
  },
  {
    name: 'RefreshPage',
    path: '/RefreshPage',
    component: () => import('../views/RefreshPage.vue')
  },
  {
    name: 'AddressBook',
    text: '通讯录',
    parent: 'Organization',
    path: '/AddressBook',
    component: () => import('../views/organize/AddressBook.vue')
  },
  {
    name: 'OrganizeManage',
    text: '组织管理',
    parent: 'Organization',
    path: '/organizeManage',
    component: () => import('../views/organize/OrganizeManage.vue')
  },
  {
    name: 'Roster',
    text: '花名册',
    parent: 'Employee',
    path: '/Roster',
    component: () => import('../views/employee/Roster.vue')
  },
  {
    name: 'ContractManage',
    text: '合同管理',
    parent: 'Employee',
    path: '/ContractManage',
    component: () => import('../views/employee/ContractManage.vue')
  },
  {
    name: 'MicroApp',
    text: '车辆管理',
    parent: 'Card',
    path: '/microApp/:all(.*)*',
    component: () => import('../views/MicroApp.vue')
  }
]

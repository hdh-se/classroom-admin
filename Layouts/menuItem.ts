import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Lớp học',
    group: true,
  },
  {
    title: 'Danh sách lớp học',
    icon: { name: 'pantone-outline' },
    link: { href: '/classes' },
  },
  {
    title: 'Tài khoản',
    group: true,
  },
  {
    title: 'Admin',
    icon: { name: 'person-done-outline' },
    children: [
      {
        title: 'Danh sách Admin',
        link: { href: '/admin-accounts' },
      },
    ],
  },
  {
    title: 'Người dùng',
    icon: { name: 'people-outline' },
    children: [
      {
        title: 'Danh sách người dùng',
        link: { href: '/user-accounts' },
      },
    ],
  },
];

export default items;

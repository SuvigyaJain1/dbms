import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Candidate',
    icon: { name: 'person'},
    link: { href: '/candidate'}
  },
  {
    title: 'Voter',
    icon: { name: 'person'},
    link: { href: '/voter'}
  },
  {
    title: 'Election',
    icon: { name: 'bar-chart'},
    link: { href: '/election'}
  },
  {
    title: 'Constituency',
    icon: { name: 'pin'},
    link: { href: '/constituency'}
  },
  {
    title: 'Party',
    icon: { name: 'people'},
    link: { href: '/party'}
  },
  ];

export default items;

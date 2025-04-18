import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Personal',
    path: paths.user.profile,
    icon: <Iconify icon="solar:user-rounded-outline" />,
  },
  {
    title: 'Wishlist',
    path: '',
    icon: <Iconify icon="solar:heart-outline" />,
  },
  {
    title: 'Vouchers',
    path: '',
    icon: <Iconify icon="carbon:cut-out" />,
  },
  {
    title: 'Orders',
    path: '',
    icon: <Iconify icon="solar:cart-3-outline" />,
  },
  {
    title: 'Payment',
    path: '',
    icon: <Iconify icon="solar:card-outline" />,
  },
];

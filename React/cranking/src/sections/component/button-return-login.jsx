import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';



// 로그인 페이지로 돌아가는 버튼
// ----------------------------------------------------------------------

export function ButtonReturnLogin() {
  return (
    <Link
      component={RouterLink}
      href={paths.signIn}
      color="inherit"
      variant="subtitle2"
      sx={[
        { mt: 3, gap: 0.5, mx: 'auto', alignItems: 'center', display: 'inline-flex' },
      ]}
    >
      <Iconify width={16} icon="eva:arrow-ios-back-fill" />
      로그인 페이지로
    </Link>
  );
}

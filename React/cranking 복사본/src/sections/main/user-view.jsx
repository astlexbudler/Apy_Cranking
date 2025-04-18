import Container from '@mui/material/Container';

import { _socials, _reviews, _courses } from 'src/_mock';

import { NoticeSummary } from './details/notice-summary';
import { UserMainCardButtons } from './details/user-main-card-buttons';
import { CurrentRepairRequest } from './details/current-repair-request';
import { ServiceEventCarousel } from './details/service-event-carousel';

// ----------------------------------------------------------------------

export function UserView() {
  return (
    <>
      <Container sx={{ mt: 3 }}>
        <NoticeSummary />
        <ServiceEventCarousel />
        <CurrentRepairRequest />
        <UserMainCardButtons />
      </Container>
    </>
  );
}

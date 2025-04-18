import { InfoWindow, AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function MarkerWithInfo() {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const renderMarker = () => (
    <AdvancedMarker ref={markerRef} position={{
      lat: 37.5665,
      lng: 126.978,
    }}>
      <SvgIcon sx={{ color: 'error.main' }}>
        <path
          d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z"
        />
      </SvgIcon>
    </AdvancedMarker>
  );

  return (
    <>
      {renderMarker()}
    </>
  );
}

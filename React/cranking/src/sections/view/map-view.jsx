import { useMemo, useState, useCallback } from 'react';
import { APIProvider, Map as ReactGoogleMap } from '@vis.gl/react-google-maps';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';

import { CONFIG } from 'src/global-config';

import { MarkerWithInfo } from 'src/sections/component/marker-with-info';


// 지도 메인 섹션
// ----------------------------------------------------------------------
export function MapView() {
  const [activeMarkerId, setActiveMarkerId] = useState(1);
  const position = {
    lat: 37.5665,
    lng: 126.978,
  }

  const defaultCenter = useMemo(() => position, [position]);

  const handleOpenInfo = useCallback(
    (markerId) => {
      if (markerId && activeMarkerId === markerId) {
        setActiveMarkerId(null);
      } else {
        setActiveMarkerId(markerId);
      }
    },
    [activeMarkerId]
  );

  const handleCloseInfo = useCallback(() => setActiveMarkerId(null), []);

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          height: 'calc(100vh - 70px)',
          overflow: 'hidden',
          //  Remove outline when focused
          '& .gm-style iframe + div': {
            border: 'none !important',
          },
          // Info: wrapper
          '& .gm-style .gm-style-iw-c': {
            borderRadius: 1.5,
            padding: '0px !important',
            boxShadow: theme.vars.customShadows.z8,
          },
          // Info: content
          '& .gm-style .gm-style-iw-d': {
            overflow: 'unset !important',
            maxHeight: 'unset !important',
          },
          // Info: close button
          '& .gm-style-iw-chr': {
            top: 4,
            right: 4,
            position: 'absolute',
            '& button': {
              width: '20px !important',
              height: '20px !important',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex !important',
              padding: '4px !important',
              bgcolor: 'black !important',
            },
            '& .gm-ui-hover-effect>span': {
              bgcolor: 'white',
              margin: '0 !important',
              width: '100% !important',
              height: '100% !important',
            },
          },
        }),
      ]}
    >
      <APIProvider apiKey={CONFIG.googleMapApiKey}>
        <ReactGoogleMap
          mapId="49ae42fed52588c3"
          minZoom={1.5}
          defaultZoom={3}
          defaultCenter={defaultCenter}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <MarkerWithInfo
            key={1}
            open={location.id === activeMarkerId}
          />
        </ReactGoogleMap>
      </APIProvider>

      {/* UI */}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          left: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          zIndex: 10,
        }}
      >
        {/* 검색 입력창 */}
        <TextField
          placeholder="정비소 이름 또는 지역 검색"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, bgcolor: 'white' }}
        />

        {/* 거리 필터 */}
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'white' }}>
          <InputLabel id="distance-label">거리</InputLabel>
          <Select labelId="distance-label" label="거리" defaultValue={10}>
            <MenuItem value={10}>10km 이내</MenuItem>
            <MenuItem value={20}>20km 이내</MenuItem>
            <MenuItem value={30}>30km 이내</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 검색 결과 패널 */}
      <Box
        sx={{
          position: 'absolute',
          top: 140,
          left: 16,
          bottom: 30,
          width: 320,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          overflowY: 'auto',
          zIndex: 10,
          p: 2,
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          검색 결과
        </Typography>
        <List dense>
          {['우리 정비소', '센텀카닥터', '정자오토케어'].map((name, i) => (
            <ListItem key={i} button>
              <ListItemText
                primary={name}
                secondary="서울 강남구 · 2.3km"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

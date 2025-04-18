import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  appName: '크랭킹',
  appVersion: packageJson.version,
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? '',
  googleMapApiKey: import.meta.env.VITE_MAP_API ?? '',
};

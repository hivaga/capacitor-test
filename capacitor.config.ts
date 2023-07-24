import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.test.capacitor',
  appName: 'capacitor-test',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'http://localhost:3001/'
  }
};

export default config;

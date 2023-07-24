import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.test.capacitor',
  appName: 'capacitor-test',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

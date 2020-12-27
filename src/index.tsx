import { NativeModules } from 'react-native';

type EscposAndroidType = {
  requestPermission(): Promise<boolean>
  write(params: { text?: string, cut?: boolean, raw?: number[] }): Promise<void>
};

const { EscposAndroid } = NativeModules;

export default EscposAndroid as EscposAndroidType;

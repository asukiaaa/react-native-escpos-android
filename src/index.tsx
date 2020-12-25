import { NativeModules } from 'react-native';

type EscposAndroidType = {
  multiply(a: number, b: number): Promise<number>;
};

const { EscposAndroid } = NativeModules;

export default EscposAndroid as EscposAndroidType;

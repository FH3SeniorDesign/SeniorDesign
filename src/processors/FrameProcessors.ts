/* globals __scanImage */
import 'react-native-reanimated';
import type {Frame} from 'react-native-vision-camera';

export const scanImage = (frame: Frame): any => {
  'worklet';
  // @ts-expect-error Frame Processors are not typed.
  return __scanImage(frame);
};

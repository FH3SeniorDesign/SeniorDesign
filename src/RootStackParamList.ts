// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/Routes.ts
import {PhotoFile} from 'react-native-vision-camera';

export type RootStackParamList = {
  PermissionsScreen: undefined;
  CameraScreen: undefined;
  ImagePreviewScreen: {
    photoFile: PhotoFile;
  };
};

// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/Routes.ts
import {Asset} from 'react-native-image-picker';
import {PhotoFile} from 'react-native-vision-camera';

export type RootStackParamList = {
  PermissionsScreen: undefined;
  CameraScreen: undefined;
  ImagePreviewScreen: {
    photoFile: PhotoFile;
    flashEnabled: boolean;
  };
  LibraryImageScreen: {
    asset: Asset;
  };
};

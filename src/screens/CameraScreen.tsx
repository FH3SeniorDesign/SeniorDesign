// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/CameraPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TakePictureButton} from 'components/TakePictureButton';
import * as React from 'react';
import {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  CameraPermissionStatus,
  PhotoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'CameraScreen'>;

export const CameraScreen = ({navigation}: Props): JSX.Element => {
  console.log('## Rendering CameraScreen');

  useEffect(() => {
    const verifyCameraPermission = async () => {
      const cameraPermissionStatus: CameraPermissionStatus =
        await Camera.getCameraPermissionStatus();

      console.log(`Camera permission status: ${cameraPermissionStatus}`);

      if (cameraPermissionStatus !== 'authorized') {
        navigation.replace('PermissionsScreen');
      }
    };

    verifyCameraPermission();
  }, [navigation]);

  const previewPicture = useCallback(
    (photoFile: PhotoFile) => {
      console.log(`photoFile: ${JSON.stringify(photoFile)}`);
      navigation.navigate('ImagePreviewScreen', {photoFile});
    },
    [navigation],
  );
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No camera found! Please use a device with camera support!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} accessibilityLabel="Camera Screen">
      <View style={StyleSheet.absoluteFill}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      </View>
      <TakePictureButton
        cameraRef={cameraRef}
        flash="auto"
        onPictureTaken={previewPicture}
        accessibilityLabel="Take Picture Button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // marginVertical: 16,
    // marginHorizontal: 16,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    // bottom: SAFE_AREA_PADDING.paddingBottom,
  },
});

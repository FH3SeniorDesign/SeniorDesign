// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/CameraPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  CameraPermissionStatus,
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
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      accessibilityLabel="Camera Screen"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

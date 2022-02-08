// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/PermissionsPage.tsx
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CONTENT_SPACING} from 'Constants';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  CameraPermissionRequestResult,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'PermissionsScreen'>;

export const PermissionsScreen = ({navigation}: Props): JSX.Element => {
  console.log('## Rendering PermissionsScreen');

  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');

    const status: CameraPermissionRequestResult =
      await Camera.requestCameraPermission();

    setCameraPermissionStatus(status);
    console.log(`Camera permission status: ${status}`);

    if (status === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') {
      navigation.replace('CameraScreen');
    }
  }, [cameraPermissionStatus, navigation]);

  return (
    <SafeAreaView
      style={styles.container}
      accessibilityLabel="Permissions Screen">
      <Text style={styles.title}>Welcome to Senior Design!</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <View>
            <Text style={styles.permissionText}>
              This app requires{' '}
              <Text style={styles.bold}>Camera permission</Text>.
            </Text>
            <Button
              title="Grant Camera Permission"
              onPress={requestCameraPermission}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  container: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});

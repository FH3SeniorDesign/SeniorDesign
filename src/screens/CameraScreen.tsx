// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/CameraPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TakePictureButton} from 'components/TakePictureButton';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {scanImage} from 'processors/FrameProcessors';
import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeModules,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import 'react-native-reanimated';
import {runOnJS} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  Camera,
  CameraPermissionStatus,
  PhotoFile,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';

const ImageProcessorPlugin = NativeModules.ImageProcessorPlugin;

type Props = NativeStackScreenProps<RootStackParamList, 'CameraScreen'>;

export const CameraScreen = ({navigation}: Props): JSX.Element => {
  console.log('## Rendering CameraScreen');

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [feedbackEnabled, setFeedbackEnabled] = useState<boolean>(false); // enable/disable realtime feedback
  const [flash, setFlash] = useState<'off' | 'on'>('off');

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

  const flipCamera = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
    console.log('Flipping camera...');
  }, []);

  const toggleFlash = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  // const hasAndroidReadPermissions = async (): Promise<boolean> => {
  //   const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  //   const hasPermission = await PermissionsAndroid.check(permission);
  //   if (hasPermission) {
  //     return true;
  //   }
  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // };

  const getImageFromStorage = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(res => {
        if (!res.didCancel) {
          let uri = res.assets![0].uri;
          console.log(uri);
          ImageProcessorPlugin.makePrediction(uri, (distortionResult: any) => {
            console.log(distortionResult);
          });
        }
      })
      .catch(err => console.log('Error - ', err));
  };

  const toggleRealtimeFeedback = useCallback(() => {
    setFeedbackEnabled(f => !f);
  }, []);

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  // Check features supported by device
  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;

  const provideFeedback = (imageDistortionResultJson: string): void => {
    console.log('# provideFeedback');
    console.log(`imageDistortionResultJson: ${imageDistortionResultJson}`);

    const imageDistortionResult: ImageDistortionResult =
      ImageDistortionResult.from(imageDistortionResultJson);
    const descendingDistortions: [string, number][] =
      imageDistortionResult.descendingDistortions;

    console.log('imageDistortionResult:', imageDistortionResult.toString());
    console.log('descendingDistortions:', descendingDistortions);

    // TODO provide feedback
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log('# useFrameProcessor');

    const imageDistortionResultJson: string = scanImage(frame);

    runOnJS(provideFeedback)(imageDistortionResultJson);
  }, []);

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
          enableZoomGesture={true}
          frameProcessor={feedbackEnabled ? frameProcessor : undefined}
        />
      </View>
      <View style={styles.captureButton}>
        <TakePictureButton
          cameraRef={cameraRef}
          flash={supportsFlash ? flash : 'off'}
          onPictureTaken={previewPicture}
          accessibilityLabel="Take Picture Button"
        />
      </View>
      <View style={styles.rightButtonRow}>
        {supportsCameraFlipping && (
          <TouchableOpacity style={styles.button} onPress={flipCamera}>
            <IonIcon name="camera-reverse" color="white" size={24} />
          </TouchableOpacity>
        )}
        {supportsFlash && (
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <IonIcon
              name={flash === 'on' ? 'flash' : 'flash-off'}
              color="white"
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.leftButtonRow}>
        <TouchableOpacity style={styles.button} onPress={getImageFromStorage}>
          <IonIcon name="albums" color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.realtimeFeedbackSwitch}>
        <Switch
          onValueChange={toggleRealtimeFeedback}
          value={feedbackEnabled}
        />
      </View>
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
    bottom: 20,
    // bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: 15,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    // right: SAFE_AREA_PADDING.paddingRight,
    // top: SAFE_AREA_PADDING.paddingTop,
    right: 40,
    bottom: 40,
  },
  leftButtonRow: {
    position: 'absolute',
    // right: SAFE_AREA_PADDING.paddingRight,
    // top: SAFE_AREA_PADDING.paddingTop,
    left: 40,
    bottom: 40,
  },
  realtimeFeedbackSwitch: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#00000000',
  },
});

import {CAPTURE_BUTTON_SIZE} from 'Constants';
import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, PhotoFile, TakePhotoOptions} from 'react-native-vision-camera';

type Props = {
  cameraRef: React.RefObject<Camera>;
  flash: 'on' | 'off' | 'auto';
  onPictureTaken: (photoFile: PhotoFile) => void;
  accessibilityLabel: string;
};

export const TakePictureButton = ({
  cameraRef,
  flash,
  onPictureTaken,
  accessibilityLabel,
}: Props): JSX.Element => {
  const takePhotoOptions = useMemo<TakePhotoOptions>(() => ({flash}), [flash]);
  const takePicture = useCallback(async () => {
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera ref is null!');
      }

      console.log('Taking photo...');

      const photoFile = await cameraRef.current.takePhoto(takePhotoOptions);

      onPictureTaken(photoFile);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [cameraRef, onPictureTaken, takePhotoOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={takePicture}
        style={styles.button}
        accessibilityLabel={accessibilityLabel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: CAPTURE_BUTTON_SIZE * 0.1,
    borderColor: 'white',
  },
});

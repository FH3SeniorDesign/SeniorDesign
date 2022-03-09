// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/MediaPage.tsx
import CameraRoll from '@react-native-community/cameraroll';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {ImageDistortionVector} from 'models/ImageDistortionVector';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {ImageProcessor} from 'processors/ImageProcessor';
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {
  Image,
  ImageURISource,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreviewScreen'>;

export const ImagePreviewScreen = ({navigation, route}: Props): JSX.Element => {
  console.log('## Rendering ImagePreviewScreen');

  const {photoFile} = route.params;
  const uri: string = `file://${photoFile.path}`;

  const evaluateImage = async () => {
    console.log('# evaluteImage');

    // Global image evaluation
    const imageDistortionResult: ImageDistortionResult =
      await ImageProcessor.evaluateGlobal(uri);
    const descendingDistortions: [string, number][] =
      imageDistortionResult.getDescendingDistortions();

    console.log(
      'imageDistortionResult:',
      JSON.stringify(imageDistortionResult),
    );
    console.log(
      'descendingDistortions:',
      JSON.stringify(descendingDistortions),
    );

    // Regional image evaluation
    const regionalImageDistortionResult: RegionalImageDistortionResult =
      await ImageProcessor.evaluateRegions(
        uri,
        photoFile.width,
        photoFile.height,
      );
    const descendingDistortionVectors: [string, ImageDistortionVector][] =
      regionalImageDistortionResult.getDescendingDistortionVectors();

    console.log(
      'regionalImageDistortionResult:',
      JSON.stringify(regionalImageDistortionResult),
    );
    console.log(
      'descendingDistortionVectors:',
      JSON.stringify(descendingDistortionVectors),
    );

    // TODO provide feedback
  };

  useEffect(() => {
    evaluateImage();
  });

  const imageSource: ImageURISource = useMemo(() => {
    return {uri};
  }, [uri]);
  const discardImage = () => {
    navigation.replace('CameraScreen');
  };

  const hasAndroidWritePermissions = async (): Promise<boolean> => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const saveImage = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidWritePermissions())) {
      console.log('No permission!');
      return;
    }

    console.log('saving photo');
    CameraRoll.save(uri).catch(console.error);
    navigation.replace('CameraScreen');
  };

  return (
    <SafeAreaView
      style={styles.container}
      accessibilityLabel="Image Preview Screen">
      <View style={StyleSheet.absoluteFill}>
        <Image style={StyleSheet.absoluteFill} source={imageSource} />
      </View>
      <Icon
        reverse
        name="close"
        onPress={discardImage}
        accessibilityLabel="Discard Button"
      />
      <Icon
        reverse
        name="save"
        onPress={saveImage}
        accessibilityLabel="Save Button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

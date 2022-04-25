// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/MediaPage.tsx
import CameraRoll from '@react-native-community/cameraroll';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {ImageProcessor} from 'processors/ImageProcessor';
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {
  Dimensions,
  Image,
  ImageURISource,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'RootStackParamList';
import {Feedback} from 'utilities/Feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreviewScreen'>;

export const ImagePreviewScreen = ({navigation, route}: Props): JSX.Element => {
  console.log('## Rendering ImagePreviewScreen');

  const {photoFile, flashEnabled} = route.params;
  const uri: string = `file://${photoFile.path}`;
  const imageSource: ImageURISource = useMemo(() => {
    return {uri};
  }, [uri]);

  const evaluateImage = async () => {
    console.log('# evaluteImage');

    // Global image evaluation
    const imageDistortionResult: ImageDistortionResult =
      await ImageProcessor.evaluateGlobal(uri);

    // const descendingDistortions: [string, number][] =
    //   imageDistortionResult.getDescendingDistortions();

    // console.log(
    //   'imageDistortionResult:',
    //   JSON.stringify(imageDistortionResult),
    // );
    // console.log(
    //   'descendingDistortions:',
    //   JSON.stringify(descendingDistortions),
    // );
    console.log('GLOBAL DONE\n\n');

    // Regional image evaluation
    const regionalImageDistortionResult: RegionalImageDistortionResult =
      await ImageProcessor.evaluateRegions(
        uri,
        photoFile.width,
        photoFile.height,
      );
    // const descendingDistortionVectors: [
    //   string,
    //   RegionalImageDistortionVector,
    // ][] = regionalImageDistortionResult.getDescendingDistortionVectors();

    //console.log(
    //  'regionalImageDistortionResult:',
    //  JSON.stringify(regionalImageDistortionResult),
    //);
    // console.log(
    //   'descendingDistortionVectors:',
    //   JSON.stringify(descendingDistortionVectors),
    // );
    console.log('REGIONAL DONE\n\n');

    console.log(flashEnabled);

    // TODO provide feedback
    Feedback.voiceFeedback(
      imageDistortionResult,
      regionalImageDistortionResult,
      0,
      flashEnabled,
    );
  };

  useEffect(() => {
    evaluateImage();
  });

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
      <View style={[StyleSheet.absoluteFill, {backgroundColor: 'black'}]}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{height: (Dimensions.get('window').width * 4) / 3}}>
            <Image style={StyleSheet.absoluteFill} source={imageSource} />
          </View>
        </View>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{height: (Dimensions.get('window').width * 4) / 3}}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: 'transparent',
                },
              ]}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View style={{flex: 1, backgroundColor: 'transparent'}} />
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View style={{flex: 1, backgroundColor: 'transparent'}} />
              </View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: 'transparent',
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    borderRightWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                  }}
                />
                <View style={{flex: 1, backgroundColor: 'transparent'}} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={saveImage}
        style={styles.button}
        accessibilityLabel="Save Button">
        <Icon
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
          reverse
          name="save"
          style={{}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={discardImage}
        style={styles.button}
        accessibilityLabel="Discard Button">
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Icon
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
            reverse
            name="close"
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    height: '50%',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
});

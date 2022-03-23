// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/MediaPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useMemo} from 'react';
import {
  Image,
  ImageURISource,
  Platform,
  StyleSheet,
  View,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'RootStackParamList';
import {voiceFeedback} from '../feedback/feedback';

const ImageProcessorPlugin = NativeModules.ImageProcessorPlugin;

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreviewScreen'>;

export const ImagePreviewScreen = ({navigation, route}: Props): JSX.Element => {
  console.log('## Rendering ImagePreviewScreen');

  const {photoFile} = route.params;

  const uriString: string = `file://${photoFile.path}`;
  ImageProcessorPlugin.makePrediction(uriString, (res: any) => {
    console.log(res);
    voiceFeedback(res);
  });

  const imageSource: ImageURISource = useMemo(() => {
    return {uri: `file://${photoFile.path}`};
  }, [photoFile.path]);
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
    CameraRoll.save(`file://${photoFile.path}`).catch((reason: any) =>
      console.log(reason),
    );
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

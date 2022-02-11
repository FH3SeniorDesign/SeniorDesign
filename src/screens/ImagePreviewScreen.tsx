// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/MediaPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {useMemo} from 'react';
import {Image, ImageURISource, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreviewScreen'>;

export const ImagePreviewScreen = ({navigation, route}: Props): JSX.Element => {
  console.log('## Rendering ImagePreviewScreen');

  const {photoFile} = route.params;
  const imageSource: ImageURISource = useMemo(() => {
    return {uri: `file://${photoFile.path}`};
  }, [photoFile.path]);
  const discardImage = () => {
    navigation.replace('CameraScreen');
  };
  const saveImage = () => {
    // TODO save image to photo library

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

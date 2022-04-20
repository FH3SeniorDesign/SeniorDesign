// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/MediaPage.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {ImageProcessor} from 'processors/ImageProcessor';
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from 'RootStackParamList';
import {Feedback} from 'utilities/Feedback';

type Props = NativeStackScreenProps<RootStackParamList, 'LibraryImageScreen'>;

export const LibraryImageScreen = ({navigation, route}: Props): JSX.Element => {
  console.log('## Rendering LibraryImageScreen');

  //const {ur} = route.params;
  const uri: string = route.params.imagePickerResult.uri;
  const height = route.params.imagePickerResult.height;
  const width = route.params.imagePickerResult.width;

  console.log(route.params.imagePickerResult);

  const evaluateImage = async () => {
    console.log('# evaluteImage');

    // Global image evaluation
    const imageDistortionResult: ImageDistortionResult =
      await ImageProcessor.evaluateGlobal(uri);
    //const descendingDistortions: [string, number][] =
    //  imageDistortionResult.getDescendingDistortions();

    /*console.log(
      'imageDistortionResult:',
      JSON.stringify(imageDistortionResult),
    );
    console.log(
      'descendingDistortions:',
      JSON.stringify(descendingDistortions), // null, 2 args added for pretty-print
    );*/
    console.log('GLOBAL DONE');
    // console.log();
    // console.log();
    // console.log();

    // Regional image evaluation
    const regionalImageDistortionResult: RegionalImageDistortionResult =
      await ImageProcessor.evaluateRegions(uri, width, height);
    /*const descendingDistortionVectors: [
      string,
      RegionalImageDistortionVector,
    ][] = regionalImageDistortionResult.getDescendingDistortionVectors();
*/
    // console.log(
    //   'regionalImageDistortionResult:',
    //   JSON.stringify(regionalImageDistortionResult),
    // );
    // console.log(
    //   'descendingDistortionVectors:',
    //   JSON.stringify(descendingDistortionVectors),
    // );
    // console.log('REGIONAL DONE');
    // console.log('');
    // console.log('');

    // TODO provide feedback
    Feedback.voiceFeedback(
      imageDistortionResult,
      regionalImageDistortionResult,
    );
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

  return (
    <SafeAreaView
      style={styles.container}
      accessibilityLabel="Image Preview Screen">
      <View style={StyleSheet.absoluteFill}>
        <Image style={StyleSheet.absoluteFill} source={imageSource} />
      </View>

      <TouchableOpacity
        onPress={discardImage}
        style={styles.button}
        accessibilityLabel="Discard Button">
        <Icon
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
          reverse
          name="close"
          style={styles.icon}
        />
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
    height: '100%',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  icon: {
    height: '100%',
  },
});

// Reference: https://github.com/mrousavy/react-native-vision-camera/blob/main/example/src/App.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraScreen} from '@screens/CameraScreen';
import {PermissionsScreen} from '@screens/PermissionsScreen';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';
import {ImagePreviewScreen} from 'screens/ImagePreviewScreen';
import {LibraryImageScreen} from 'screens/LibraryImageScreen';

export const App = (): JSX.Element => {
  console.log('## Rendering App');

  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [cameraPermissionStatus, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(`Camera permission status: ${cameraPermissionStatus}`);

  if (cameraPermissionStatus === undefined) {
    // Still loading
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationTypeForReplace: 'push'}}
          initialRouteName={
            cameraPermissionStatus !== 'authorized'
              ? 'PermissionsScreen'
              : 'CameraScreen'
          }>
          <Stack.Screen
            name="PermissionsScreen"
            component={PermissionsScreen}
          />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen
            name="ImagePreviewScreen"
            component={ImagePreviewScreen}
          />
          <Stack.Screen
            name="LibraryImageScreen"
            component={LibraryImageScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

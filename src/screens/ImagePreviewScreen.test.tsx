import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fireEvent, render} from '@testing-library/react-native';
import * as React from 'react';
import {PhotoFile} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';
import {ImagePreviewScreen} from './ImagePreviewScreen';

describe('ImagePreviewScreen', () => {
  // Reference: https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in
  type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    'ImagePreviewScreen'
  >;
  type RouteType = RouteProp<RootStackParamList, 'ImagePreviewScreen'>;
  const mockNavigation: Partial<NavigationType> = {
    replace: jest.fn(),
    goBack: jest.fn(),
  };
  const mockPhotoFile: Partial<PhotoFile> = {path: undefined};
  const mockRoute: Partial<RouteType> = {
    params: {photoFile: mockPhotoFile as PhotoFile},
  };
  const component = (
    <ImagePreviewScreen
      navigation={mockNavigation as NavigationType}
      route={mockRoute as RouteType}
    />
  );

  test('renders', () => {
    const {getByA11yLabel} = render(component);
    const imagePreviewScreen = getByA11yLabel('Image Preview Screen');

    expect(imagePreviewScreen).toBeDefined();
  });

  test('discards image and redirects to camera screen', async () => {
    const {getByA11yLabel} = render(component);
    const closeButton = getByA11yLabel('Discard Button');

    fireEvent(closeButton, 'press');
    expect(mockNavigation.replace).toHaveBeenCalledWith('CameraScreen');
  });

  test('saves image and redirects to camera screen', () => {
    const {getByA11yLabel} = render(component);
    const saveButton = getByA11yLabel('Save Button');

    fireEvent(saveButton, 'press');
    expect(mockNavigation.replace).toHaveBeenCalledWith('CameraScreen');
  });
});

import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import {Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';
import {PermissionsScreen} from './PermissionsScreen';

jest.mock('react-native-vision-camera');

describe('PermissionsScreen', () => {
  // Reference: https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in
  type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    'PermissionsScreen'
  >;
  type RouteType = RouteProp<RootStackParamList, 'PermissionsScreen'>;
  const mockNavigation: Partial<NavigationType> = {replace: jest.fn()};
  const mockRoute: Partial<RouteType> = {};
  const mockRequestCameraPermission =
    Camera.requestCameraPermission as jest.MockedFunction<
      typeof Camera.requestCameraPermission
    >;
  const component = (
    <PermissionsScreen
      navigation={mockNavigation as NavigationType}
      route={mockRoute as RouteType}
    />
  );

  test('renders', () => {
    const {getByText} = render(component);
    const title = getByText('Welcome to Senior Design!');

    expect(title).toBeDefined();
  });

  test('approving Grant Camera Permission redirects to CameraScreen', async () => {
    mockRequestCameraPermission.mockResolvedValue('authorized');

    const {getByText} = render(component);
    const grantCameraPermissionButton = getByText('Grant Camera Permission');

    fireEvent(grantCameraPermissionButton, 'press');
    expect(mockRequestCameraPermission).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('CameraScreen');
    });
  });

  test('rejecting Grant Camera Permission redirects to device settings', async () => {
    mockRequestCameraPermission.mockResolvedValue('denied');

    const {getByText} = render(component);
    const grantCameraPermissionButton = getByText('Grant Camera Permission');
    const openSettingsSpy = jest.spyOn(Linking, 'openSettings');

    fireEvent(grantCameraPermissionButton, 'press');
    expect(mockRequestCameraPermission).toHaveBeenCalled();
    await waitFor(() => {
      expect(openSettingsSpy).toHaveBeenCalled();
    });
  });
});

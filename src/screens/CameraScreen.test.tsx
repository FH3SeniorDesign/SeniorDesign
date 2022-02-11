import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {RootStackParamList} from 'RootStackParamList';
import {CameraScreen} from './CameraScreen';

jest.mock('react-native-vision-camera');

describe('CameraScreen', () => {
  // Reference: https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in
  type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    'CameraScreen'
  >;
  type RouteType = RouteProp<RootStackParamList, 'CameraScreen'>;
  const mockNavigation: Partial<NavigationType> = {replace: jest.fn()};
  const mockRoute: Partial<RouteType> = {};
  const component = (
    <CameraScreen
      navigation={mockNavigation as NavigationType}
      route={mockRoute as RouteType}
    />
  );
  const mockGetCameraPermissionStatus =
    Camera.getCameraPermissionStatus as jest.MockedFunction<
      typeof Camera.getCameraPermissionStatus
    >;
  const mockUseCameraDevices = useCameraDevices as jest.MockedFunction<
    typeof useCameraDevices
  >;
  const mockCameraDevice: Partial<CameraDevice> = {position: 'back'};

  test('renders camera', () => {
    mockGetCameraPermissionStatus.mockResolvedValue('authorized');
    mockUseCameraDevices.mockReturnValue({
      front: undefined,
      back: mockCameraDevice as CameraDevice,
      unspecified: undefined,
      external: undefined,
    });

    const {queryByText, getByA11yLabel} = render(component);
    const nullCameraError = queryByText(
      'No camera found! Please use a device with camera support!',
    );
    const takePictureButton = getByA11yLabel('Take Picture Button');

    expect(mockUseCameraDevices).toHaveBeenCalled();
    expect(nullCameraError).toBeNull();
    fireEvent(takePictureButton, 'press');
  });

  test('renders null camera', () => {
    mockGetCameraPermissionStatus.mockResolvedValue('authorized');
    mockUseCameraDevices.mockReturnValue({
      front: undefined,
      back: undefined,
      unspecified: undefined,
      external: undefined,
    });

    const {getByText} = render(component);
    const nullCameraError = getByText(
      'No camera found! Please use a device with camera support!',
    );

    expect(nullCameraError).toBeDefined();
  });

  test('redirects to PermissionsScreen', async () => {
    mockGetCameraPermissionStatus.mockResolvedValue('not-determined');
    mockUseCameraDevices.mockReturnValue({
      front: undefined,
      back: undefined,
      unspecified: undefined,
      external: undefined,
    });
    render(component);
    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('PermissionsScreen');
    });
  });
});

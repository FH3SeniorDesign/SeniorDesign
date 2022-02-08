import {render, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {App} from './App';

jest.mock('react-native-vision-camera');

describe('App', () => {
  // Reference: https://jestjs.io/docs/mock-function-api#jestmockedfunction
  const mockGetCameraPermissionStatus =
    Camera.getCameraPermissionStatus as jest.MockedFunction<
      typeof Camera.getCameraPermissionStatus
    >;
  const mockCameraDevice: Partial<CameraDevice> = {position: 'back'};
  const mockUseCameraDevices = useCameraDevices as jest.MockedFunction<
    typeof useCameraDevices
  >;

  test('renders PermissionsScreen', async () => {
    mockGetCameraPermissionStatus.mockResolvedValue('not-determined');

    const {findByA11yLabel} = render(<App />);
    const permissionsScreen = findByA11yLabel('Permissions Screen');

    expect(mockGetCameraPermissionStatus).toHaveBeenCalled();
    await waitFor(() => {
      expect(permissionsScreen).toBeDefined();
    });
  });

  test('renders CameraScreen', async () => {
    mockGetCameraPermissionStatus.mockResolvedValue('authorized');
    mockUseCameraDevices.mockReturnValue({
      front: undefined,
      back: mockCameraDevice as CameraDevice,
      unspecified: undefined,
      external: undefined,
    });

    const {queryByText} = render(<App />);
    const nullCameraError = queryByText(
      'No camera found! Please use a device with camera support!',
    );

    await waitFor(() => {
      expect(mockGetCameraPermissionStatus).toHaveBeenCalled();
      expect(mockUseCameraDevices).toHaveBeenCalled();
    });
    expect(nullCameraError).toBeNull();
  });
});

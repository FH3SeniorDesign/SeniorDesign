import {fireEvent, render, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import {RefObject} from 'react';
import {Camera} from 'react-native-vision-camera';
import {TakePictureButton} from './TakePictureButton';

jest.mock('react-native-vision-camera');

describe('TakePictureButton', () => {
  const mockCamera: Partial<Camera> = {takePhoto: jest.fn()};
  const mockCameraRef: RefObject<Camera> = {current: mockCamera as Camera};
  const mockOnPictureTaken = jest.fn();

  test('renders', () => {
    render(
      <TakePictureButton
        cameraRef={mockCameraRef}
        flash={'auto'}
        onPictureTaken={mockOnPictureTaken}
        accessibilityLabel="Take Picture Button"
      />,
    );
  });

  test('captures image on press', async () => {
    const {getByA11yLabel} = render(
      <TakePictureButton
        cameraRef={mockCameraRef}
        flash={'auto'}
        onPictureTaken={mockOnPictureTaken}
        accessibilityLabel="Take Picture Button"
      />,
    );
    const takePictureButton = getByA11yLabel('Take Picture Button');

    fireEvent(takePictureButton, 'press');
    await waitFor(() => expect(mockOnPictureTaken).toBeCalled());
  });

  test('does not capture image when camera ref is null', async () => {
    const mockNullCameraRef: RefObject<Camera> = {current: null};

    const {getByA11yLabel} = render(
      <TakePictureButton
        cameraRef={mockNullCameraRef}
        flash={'auto'}
        onPictureTaken={mockOnPictureTaken}
        accessibilityLabel="Take Picture Button"
      />,
    );
    const takePictureButton = getByA11yLabel('Take Picture Button');

    fireEvent(takePictureButton, 'press');
    await waitFor(() => expect(mockOnPictureTaken).not.toBeCalled());
  });
});

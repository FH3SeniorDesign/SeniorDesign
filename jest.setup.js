import {afterEach, beforeEach, jest} from '@jest/globals';
import {cleanup} from '@testing-library/react-native';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

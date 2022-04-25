import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {AccessibilityInfo} from 'react-native';
// import Tts from 'react-native-tts';

// const THRESHOLDS = {
//   blurry: 0.55,
//   bright: 0.4,
//   dark: 0.4,
//   global_quality: 0.4,
//   grainy: 0.4,
//   none: 0.4,
//   other: 0.4,
//   shaky: 0.4,
// };

// const MESSAGES = {
//   blurry: 'Picture is too blurry. Please try focusing the camera.',
//   bright:
//     'Picture is too bright. Please try decreasing exposure or turning off flash.',
//   dark: 'Picture is too dark. Please try turning on flash.',
//   global_quality: '',
//   grainy: 'Picture is too grainy. Please try stepping back.',
//   none: '',
//   other: 'Other problems detected.',
//   shaky: 'Picture is shaky. Please try steadying the camera.',
// };

// const MESSAGES2 = {
//   blurry: 'Blurry Picture',
//   bright: 'Bright Picture',
//   dark: 'Dark Picture',
//   global_quality: '',
//   grainy: 'Grainy Picture',
//   none: '',
//   other: 'Other problems detected.',
//   shaky: 'Shaky Picture',
// };

/*
const ORIENTATION_REMAP: {
  'top-left': RegionalImageDistortionDirection;
  top: RegionalImageDistortionDirection;
  'top-right': RegionalImageDistortionDirection;
  left: RegionalImageDistortionDirection;
  center: RegionalImageDistortionDirection;
  right: RegionalImageDistortionDirection;
  'bottom-left': RegionalImageDistortionDirection;
  bottom: RegionalImageDistortionDirection;
  'bottom-right': RegionalImageDistortionDirection;
} = {
  'top-left': 'top-right',
  top: 'right',
  'top-right': 'bottom-right',
  left: 'top',
  center: 'center',
  right: 'bottom',
  'bottom-left': 'top-left',
  bottom: 'left',
  'bottom-right': 'bottom-left',
};*/

const FEEDBACK = {
  blurry: {
    'top-left': {
      low: 'The image is blurry in the top-left region, try centering object in screen',
      high: 'The image is blurry in the top-left region, try centering object in screen',
    },
    top: {
      low: 'The image is blurry in the top region, try centering object in screen',
      high: 'The image is blurry in the top region, try centering object in screen',
    },
    'top-right': {
      low: 'The image is blurry in the top-right region, try centering object in screen',
      high: 'The image is blurry in the top-right region, try centering object in screen',
    },
    left: {
      low: 'The image is blurry in the left region, try centering object in screen',
      high: 'The image is blurry in the left region, try centering object in screen',
    },
    center: {
      low: 'The center of image is a bit blurry, wait for autofocus.',
      high: 'The center of the image is extremely blurry, please steady the device.',
    },
    right: {
      low: 'The image is blurry in the right region, try centering object in screen',
      high: 'The image is blurry in the right region, try centering object in screen',
    },
    'bottom-left': {
      low: 'The image is blurry in the bottom-left region, try centering object in screen',
      high: 'The image is blurry in the bottom-left region, try centering object in screen',
    },
    bottom: {
      low: 'The image is blurry in the bottom region, try centering object in screen',
      high: 'The image is blurry in the bottom region, try centering object in screen',
    },
    'bottom-right': {
      low: 'The image is blurry in the bottom-right region, try centering object in screen',
      high: 'The image is blurry in the bottom-right region, try centering object in screen',
    },
  },
  bright: {
    'top-left': {
      low: 'There may be a glare at the top-left region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the top-left region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the top-left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top-left region of the screen, try turning off the flash',
    },
    top: {
      low: 'There may be a glare at the top region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the top region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the top region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top region of the screen, try turning off the flash',
    },
    'top-right': {
      low: 'There may be a glare at the top-right region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the top-right region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the top-right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top-right region of the screen, try turning off the flash',
    },
    left: {
      low: 'There may be a glare at the left region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the left region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the left region of the screen, try turning off the flash',
    },
    center: {
      low: 'There may be a glare at the center of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the center of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the center of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the center of the screen, try turning off the flash',
    },
    right: {
      low: 'There may be a glare at the right region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the right region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the right region of the screen, try turning off the flash',
    },
    'bottom-left': {
      low: 'There may be a glare at the bottom-left region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the bottom-left region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the bottom-left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom-left region of the screen, try turning off the flash',
    },
    bottom: {
      low: 'There may be a glare at the bottom region of the screen, try decreasing lighting in the image',
      high: 'There may be a glare at the bottom region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the bottom region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom region of the screen, try turning off the flash',
    },
    'bottom-right': {
      low: 'There may be a glare at the bottom-right region of the screen, try decreasing lighting in the imageg',
      high: 'There may be a glare at the bottom-right region of the screen, try decreasing lighting in the image',
      lflash:
        'There may be a glare at the bottom-right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom-right region of the screen, try turning off the flash',
    },
  },
  dark: {
    'top-left': {
      low: 'The top-left region of the image is a bit dark, try turning on your flash',
      high: 'The top-left region of the image is really dark, try turning on your flash',
      lflash:
        'The top-left region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The top-left region of the image is a really dark, something may be covering the lens',
    },
    top: {
      low: 'The top region of the image is a bit dark, try turning on your flash',
      high: 'The top region of the image is really dark, try turning on your flash',
      lflash:
        'The top region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The top region of the image is a really dark, something may be covering the lens',
    },
    'top-right': {
      low: 'The top-right region of the image is a bit dark, try turning on your flash',
      high: 'The top-right region of the image is really dark, try turning on your flash',
      lflash:
        'The top-right region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The top-right region of the image is a really dark, something may be covering the lens',
    },
    left: {
      low: 'The left region of the image is a bit dark, try turning on your flash',
      high: 'The left region of the image is really dark, try turning on your flash',
      lflash:
        'The left region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The left region of the image is a really dark, something may be covering the lens',
    },
    center: {
      low: 'The center region of the image is a bit dark, try turning on your flash',
      high: 'The center region of the image is really dark, try turning on your flash',
      lflash:
        'The center region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The center region of the image is a really dark, something may be covering the lens',
    },
    right: {
      low: 'The right region of the image is a bit dark, try turning on your flash',
      high: 'The right region of the image is really dark, try turning on your flash',
      lflash:
        'The right region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The right region of the image is a really dark, something may be covering the lens',
    },
    'bottom-left': {
      low: 'The bottom-left region of the image is a bit dark, try turning on your flash',
      high: 'The bottom-left region of the image is really dark, try turning on your flash',
      lflash:
        'The bottom-left region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The bottom-left region of the image is a really dark, something may be covering the lens',
    },
    bottom: {
      low: 'The bottom region of the image is a bit dark, try turning on your flash',
      high: 'The bottom region of the image is really dark, try turning on your flash',
      lflash:
        'The bottom region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The bottom region of the image is a really dark, something may be covering the lens',
    },
    'bottom-right': {
      low: 'The bottom-right region of the image is a bit dark, try turning on your flash',
      high: 'The bottom-right region of the image is really dark, try turning on your flash',
      lflash:
        'The bottom-right region of the image is a bit dark, there may be a problem with exposure',
      hflash:
        'The bottom-right region of the image is a really dark, something may be covering the lens',
    },
  },
};

let DIST_MAP = new Map();
let LOW_DIST_IDX = 0;
let HIGH_DIST_IDX = 1;

let prevTime = new Date();

export class Feedback {
  static voiceFeedback(
    imageDistortionResult: ImageDistortionResult,
    regionalImageDistortionResult: RegionalImageDistortionResult | null,
    timeDelayMS: number = 0,
    flashEnabled: boolean = false,
  ) {
    const deltaT = new Date().getTime() - prevTime.getTime();

    DIST_MAP.set('dark', [0.15, 0.45]);
    DIST_MAP.set('blurry', [0.4, 0.6]);
    // no range denotes only global feedback is given for grainy distortion
    DIST_MAP.set('grainy', [0.1875, 0.1875]);
    DIST_MAP.set('bright', [0.3, 0.45]);
    // no range denotes only global feedback is given for shaky distortion
    DIST_MAP.set('shaky', [0.325, 0.325]);
    console.log(flashEnabled);
    if (deltaT >= timeDelayMS) {
      prevTime = new Date();

      // First None Check
      if (imageDistortionResult.none > 0.25) {
        AccessibilityInfo.announceForAccessibility('Image looks good!');
        return;
      }
      const DIST_ORDERING = ['bright', 'dark', 'blurry', 'shaky', 'grainy'];
      // Distortion For loop,
      console.log('FOR LOOP');
      var dist_detected = false;
      console.log(imageDistortionResult);
      for (const distortion of DIST_ORDERING) {
        let value = imageDistortionResult[distortion];
        console.log('VALUE: ', value, distortion);

        // case - live feedback
        if (
          regionalImageDistortionResult === null &&
          value > DIST_MAP.get(distortion)[LOW_DIST_IDX]
        ) {
          Feedback.giveGlobalFeedback(distortion, flashEnabled);
          return;
        }

        // Check if distortion is greater than low threshold
        if (value > DIST_MAP.get(distortion)[LOW_DIST_IDX]) {
          dist_detected = true;
          // Check if distortion is greater than high threshold
          if (value > DIST_MAP.get(distortion)[HIGH_DIST_IDX]) {
            // DO GLOBAL FEEDBACK
            Feedback.giveGlobalFeedback(distortion, flashEnabled);
          } else {
            // DO REGIONAL FEEDBACK
            console.log('REGIONAL');
            Feedback.giveRegionalFeedback(
              distortion,
              flashEnabled,
              regionalImageDistortionResult,
            );
          }
          break;
        }
      }
      if (!dist_detected) {
        AccessibilityInfo.announceForAccessibility('Image looks good!');
        return;
      }
    }
  }

  static giveGlobalFeedback(distortion: String, flashEnabled: boolean) {
    switch (distortion) {
      case 'dark':
        if (!flashEnabled) {
          AccessibilityInfo.announceForAccessibility(
            'The image is really dark, try turning on flash!',
          );
        } else {
          AccessibilityInfo.announceForAccessibility(
            'The image is really dark, try increasing lighting on object of interest or checking that something isn’t covering the lens!',
          );
        }
        break;
      case 'bright':
        if (flashEnabled) {
          AccessibilityInfo.announceForAccessibility(
            'The image is really bright, try turning off flash!',
          );
        } else {
          AccessibilityInfo.announceForAccessibility(
            'The image is really bright, try decreasing the lighting on object of interest!',
          );
        }
        break;
      case 'blurry':
        AccessibilityInfo.announceForAccessibility(
          'The image is really blurry, try either stabilizing your phone or taking a step away from the object of interest!',
        );
        break;
      case 'grainy':
        if (flashEnabled) {
          AccessibilityInfo.announceForAccessibility(
            'The image is really grainy, try increasing lighting in photo!',
          );
        } else {
          AccessibilityInfo.announceForAccessibility(
            'The image is really grainy, try turning on your flash!',
          );
        }
        break;
      case 'shaky':
        AccessibilityInfo.announceForAccessibility(
          'The image is really shaky, try stabilizing your phone!',
        );
        break;
    }
  }

  static giveRegionalFeedback(
    distortion: String,
    flashEnabled: boolean,
    regionalResult: RegionalImageDistortionResult | null,
  ) {
    console.log('REGIONAL FEEDBACK FUNC');
    if (regionalResult === null) {
      return;
    }

    let maxDistortionVal = 0;
    let maxDistortionIdx = -1;
    let currentIdx = 0;
    for (const elem of regionalResult.imageDistortionResults) {
      for (const patch of elem) {
        console.log(patch);
        console.log(patch[distortion]);
        if (patch[distortion] > maxDistortionVal) {
          maxDistortionVal = patch[distortion];
          maxDistortionIdx = currentIdx;
        }
        currentIdx++;
      }
    }

    let range = '';
    // find range of local distortion and store make note of if flash is on or not (for later use in feedback reporting)
    // treat any value between high and low range to be low category
    if (flashEnabled) {
      if (maxDistortionVal > DIST_MAP.get(distortion)[HIGH_DIST_IDX]) {
        range = 'hflash';
        // blurry doesn't have flash fields so override, regardless of flashEnabled status
        if (distortion === 'blurry') {
          range = 'high';
        }
      } else {
        range = 'lflash';
        // blurry doesn't have flash fields so override, regardless of flashEnabled status
        if (distortion === 'blurry') {
          range = 'low';
        }
      }
    } else {
      if (maxDistortionVal > DIST_MAP.get(distortion)[HIGH_DIST_IDX]) {
        range = 'high';
      } else {
        range = 'low';
      }
    }

    switch (maxDistortionIdx) {
      case 0:
        // top right
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion]['top-right'][range],
        );
        break;
      case 1:
        // right
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion].right[range],
        );
        break;
      case 2:
        // bottom right
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion]['bottom-right'][range],
        );
        break;
      case 3:
        // top
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion].top[range],
        );
        break;
      case 4:
        // center
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion].center[range],
        );
        break;
      case 5:
        // bottom
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion].bottom[range],
        );
        break;
      case 6:
        // top left
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion]['top-left'][range],
        );
        break;
      case 7:
        // left
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion].left[range],
        );
        break;
      case 8:
        // bottom left
        AccessibilityInfo.announceForAccessibility(
          FEEDBACK[distortion]['bottom-left'][range],
        );
        break;
    }
  }
}

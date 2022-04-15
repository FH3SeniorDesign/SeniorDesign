import {RegionalImageDistortionDirection} from 'constants/RegionalImageDistortionConstants';
import {ImageDistortionResult} from 'models/ImageDistortionResult';
import {RegionalImageDistortionResult} from 'models/RegionalImageDistortionResult';
import {RegionalImageDistortionVector} from 'models/RegionalImageDistortionVector';
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
};

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
      low: 'Center of image is a bit blurry, wait for autofocus.',
      high: 'Center of the image is extremely blurry, the object may be moving',
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
  shaky: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'top-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
  },
  bright: {
    'top-left': {
      low: 'There may be a glare at the top-left region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the top-left region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the top-left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top-left region of the screen, try turning off the flash',
    },
    top: {
      low: 'There may be a glare at the top region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the top region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the top region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top region of the screen, try turning off the flash',
    },
    'top-right': {
      low: 'There may be a glare at the top-right region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the top-right region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the top-right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the top-right region of the screen, try turning off the flash',
    },
    left: {
      low: 'There may be a glare at the left region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the left region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the left region of the screen, try turning off the flash',
    },
    center: {
      low: 'There may be a glare at the center of the screen, try adjusting background lighting',
      high: 'There may be a glare at the center of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the center of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the center of the screen, try turning off the flash',
    },
    right: {
      low: 'There may be a glare at the right region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the right region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the right region of the screen, try turning off the flash',
    },
    'bottom-left': {
      low: 'There may be a glare at the bottom-left region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the bottom-left region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the bottom-left region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom-left region of the screen, try turning off the flash',
    },
    bottom: {
      low: 'There may be a glare at the bottom region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the bottom region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the bottom region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom region of the screen, try turning off the flash',
    },
    'bottom-right': {
      low: 'There may be a glare at the bottom-right region of the screen, try adjusting background lighting',
      high: 'There may be a glare at the bottom-right region of the screen, try adjusting background lighting',
      lflash:
        'There may be a glare at the bottom-right region of the screen, try turning off the flash',
      hflash:
        'There may be a glare at the bottom-right region of the screen, try turning off the flash',
    },
  },
  dark: {
    'top-left': {
      low: 'The top-left region of the image is a bit dark, there may be a problem with exposure',
      high: 'The top-left of the image is dark, something may be covering the lens',
      lflash:
        'The top-left region of the image is a bit dark, try turning on your flash',
      hflash:
        'The top-left region of the image is a really dark, try turning on your flash',
    },
    top: {
      low: 'The top region of the image is a bit dark, there may be a problem with exposure',
      high: 'The top of the image is dark, something may be covering the lens',
      lflash:
        'The top region of the image is a bit dark, try turning on your flash',
      hflash:
        'The top region of the image is a really dark, try turning on your flash',
    },
    'top-right': {
      low: 'The top-right region of the image is a bit dark, there may be a problem with exposure',
      high: 'The top-right of the image is dark, something may be covering the lens',
      lflash:
        'The top-right region of the image is a bit dark, try turning on your flash',
      hflash:
        'The top-right region of the image is a really dark, try turning on your flash',
    },
    left: {
      low: 'The left region of the image is a bit dark, there may be a problem with exposure',
      high: 'The left of the image is dark, something may be covering the lens',
      lflash:
        'The left region of the image is a bit dark, try turning on your flash',
      hflash:
        'The left region of the image is a really dark, try turning on your flash',
    },
    center: {
      low: 'The center region of the image is a bit dark, there may be a problem with exposure',
      high: 'The center of the image is dark, something may be covering the lens',
      lflash:
        'The center of the image is a bit dark, try turning on your flash',
      hflash:
        'The center of the image is a really dark, try turning on your flash',
    },
    right: {
      low: 'The right region of the image is a bit dark, there may be a problem with exposure',
      high: 'The right of the image is dark, something may be covering the lens',
      lflash:
        'The right region of the image is a bit dark, try turning on your flash',
      hflash:
        'The right region of the image is a really dark, try turning on your flash',
    },
    'bottom-left': {
      low: 'The bottom-left region of the image is a bit dark, there may be a problem with exposure',
      high: 'The bottom-left of the image is dark, something may be covering the lens',
      lflash:
        'The bottom-left region of the image is a bit dark, try turning on your flash',
      hflash:
        'The bottom-left region of the image is a really dark, try turning on your flash',
    },
    bottom: {
      low: 'The bottom region of the image is a bit dark, there may be a problem with exposure',
      high: 'The bottom of the image is dark, something may be covering the lens',
      lflash:
        'The bottom region of the image is a bit dark, try turning on your flash',
      hflash:
        'The bottom region of the image is a really dark, try turning on your flash',
    },
    'bottom-right': {
      low: 'The bottom-right region of the image is a bit dark, there may be a problem with exposure',
      high: 'The bottom-right of the image is dark, something may be covering the lens',
      lflash:
        'The bottom-right region of the image is a bit dark, try turning on your flash',
      hflash:
        'The bottom-right region of the image is a really dark, try turning on your flash',
    },
  },
  none: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'top-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
  },
  other: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'top-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!',
    },
  },
};

let prevTime = new Date();

export class Feedback {
  static voiceFeedback(
    imageDistortionResult: ImageDistortionResult,
    regionalImageDistortionResult: RegionalImageDistortionResult | null,
    timeDelayMS: number = 0,
    flashEnabled: boolean = false,
  ) {
    const deltaT = new Date().getTime() - prevTime.getTime();
    const descendingDistortions =
      imageDistortionResult.getDescendingDistortions();

    if (deltaT >= timeDelayMS) {
      prevTime = new Date();

      if (regionalImageDistortionResult === null) {
        for (const [distortion, value] of descendingDistortions) {
          switch (distortion) {
            case 'bright':
              if (value >= 0.4) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is really bright, try turning off flash!',
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is a little bright, try decreasing the background lighting!',
                  );
                }
              } else if (value >= 0.18) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is a little bright, try turning off flash!',
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is really bright, try decreasing background lighting!',
                  );
                }
              }

              break;
            case 'dark':
              if (value >= 0.5) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'The image is a really dark, try turning on flash!',
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    'The image is really dark. Try increasing background lighting or checking that something isn’t covering the lens!',
                  );
                }
              } else if (value >= 0.15) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is a little dark, try increasing the background lighting!',
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    'Image is a little dark, try turning on flash!',
                  );
                }
              }

              break;

            case 'blurry':
              if (value >= 0.6) {
                AccessibilityInfo.announceForAccessibility(
                  'The image is blurry, try either stabilizing your phone or stepping away from the object!',
                );
              } else if (value >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  'The image seems to be a bit blurry , try stabilizing your phone!',
                );
              }
              break;

            case 'grainy':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  'The image is grainy, try turning on your flash or increasing background lighting!',
                );
              } else if (value >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  'The image is grainy, try turning on your flash or increasing background lighting!',
                );
              }

              break;
            case 'shaky':
              if (value >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  'The image seems to be a little shaky, try stabilizing your phone!',
                );
              } else if (value >= 0.15) {
                AccessibilityInfo.announceForAccessibility(
                  'The image seems to be really shaky, try stabilizing your phone!',
                );
              }

              break;
            default:
              break;
          }
        }
      } else {
        const descendingDistortionVectors =
          regionalImageDistortionResult.getDescendingDistortionVectors();

        for (const distortionVector of descendingDistortionVectors) {
          const [distortion, vector]: [string, RegionalImageDistortionVector] =
            distortionVector;
          const rotatedDirection: RegionalImageDistortionDirection =
            ORIENTATION_REMAP[vector.direction];

          switch (distortion) {
            case 'blurryVector':
              if (vector.magnitude >= 0.6) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.blurry[rotatedDirection].high,
                );
              } else if (vector.magnitude >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.blurry[rotatedDirection].low,
                );
              }

              break;
            case 'brightVector':
              if (vector.magnitude > 0.4) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.bright[rotatedDirection].hflash,
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.bright[rotatedDirection].high,
                  );
                }
              } else if (vector.magnitude >= 0.18) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.bright[rotatedDirection].lflash,
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.bright[rotatedDirection].low,
                  );
                }
              }

              break;
            case 'darkVector':
              if (vector.magnitude > 0.5) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.dark[rotatedDirection].hflash,
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.dark[rotatedDirection].high,
                  );
                }
              } else if (vector.magnitude >= 0.15) {
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.dark[rotatedDirection].lflash,
                  );
                } else {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.dark[rotatedDirection].low,
                  );
                }
              }

              break;
            case 'grainyVector':
              if (vector.magnitude >= 0.6) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.grainy[rotatedDirection].high,
                );

                if (!flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    FEEDBACK.grainy[rotatedDirection].high,
                  );
                }
              } else if (vector.magnitude >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.grainy[rotatedDirection].low,
                );

                if (!flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning on flash.',
                  );
                }
              }

              break;
            case 'shakyVector':
              if (vector.magnitude >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.shaky[rotatedDirection].high,
                );
              } else if (vector.magnitude >= 0.15) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.shaky[rotatedDirection].low,
                );
              }

              break;
            default:
              break;
          }
        }
      }
    }
  }
}

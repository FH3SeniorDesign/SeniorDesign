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

const ORIENTATION_REMAP = {
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

let prevTime = new Date();

export class Feedback {
  static voiceFeedback(
    imageDistortionResult: ImageDistortionResult,
    regionalImageDistortionResult: RegionalImageDistortionResult | null,
    timeDelayMS: number = 0,
  ) {
    const deltaT = new Date().getTime() - prevTime.getTime();
    const descendingDistortions =
      imageDistortionResult.getDescendingDistortions();

    if (deltaT >= timeDelayMS) {
      prevTime = new Date();

      if (regionalImageDistortionResult === null) {
        for (const [distortion, value] of descendingDistortions) {
          switch (distortion) {
            // case 'blurry':
            //   if (value >= 0.75) {
            //     AccessibilityInfo.announceForAccessibility('High blurriness!');
            //   } else if (value >= 0.55) {
            //     AccessibilityInfo.announceForAccessibility('Medium blurriness!');
            //   } else if (value >= 0.2) {
            //     AccessibilityInfo.announceForAccessibility('Low blurriness!');
            //   }

            //   return;
            case 'bright':
              if (value >= 0.75) {
                AccessibilityInfo.announceForAccessibility('High brightness!');
              } else if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  'Medium brightness!',
                );
              } else if (value >= 0.25) {
                AccessibilityInfo.announceForAccessibility('Low brightness!');
              }

              break;
            // case 'dark':
            //   if (value >= 0.75) {
            //     AccessibilityInfo.announceForAccessibility('High darkness!');
            //   } else if (value >= 0.55) {
            //     AccessibilityInfo.announceForAccessibility('Medium darkness!');
            //   } else if (value >= 0.3) {
            //     AccessibilityInfo.announceForAccessibility('Low darkness!');
            //   }

            //   break;
            // case 'grainy':
            //   if (value >= 0.75) {
            //     AccessibilityInfo.announceForAccessibility('High graininess!');
            //   } else if (value >= 0.55) {
            //     AccessibilityInfo.announceForAccessibility('Medium graininess!');
            //   } else if (value >= 0.2) {
            //     AccessibilityInfo.announceForAccessibility('Low graininess!');
            //   }

            //   break
            // case 'shaky':
            //   if (value >= 0.75) {
            //     AccessibilityInfo.announceForAccessibility('High shakiness!');
            //   } else if (value >= 0.55) {
            //     AccessibilityInfo.announceForAccessibility('Medium shakiness!');
            //   } else if (value >= 0.2) {
            //     AccessibilityInfo.announceForAccessibility('Low shakiness!');
            //   }

            //   break
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
          const rotatedDirection = ORIENTATION_REMAP[vector.direction];

          switch (distortion) {
            case 'blurryVector':
              if (vector.magnitude >= 0.75) {
                AccessibilityInfo.announceForAccessibility(
                  `High blurriness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  `Medium blurriness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  `Low blurriness in ${rotatedDirection} quadrant!`,
                );
              }

              break;
            case 'brightVector':
              if (vector.magnitude >= 0.75) {
                AccessibilityInfo.announceForAccessibility(
                  `High brightness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  `Medium brightness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  `Low brightness in ${rotatedDirection} quadrant!`,
                );
              }

              break;
            case 'darkVector':
              if (vector.magnitude >= 0.75) {
                AccessibilityInfo.announceForAccessibility(
                  `High darkness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  `Medium darkness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  `Low darkness in ${rotatedDirection} quadrant!`,
                );
              }

              break;
            case 'grainyVector':
              if (vector.magnitude >= 0.75) {
                AccessibilityInfo.announceForAccessibility(
                  `High graininess in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  `Medium graininess in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  `Low graininess in ${rotatedDirection} quadrant!`,
                );
              }

              break;
            case 'shakyVector':
              if (vector.magnitude >= 0.75) {
                AccessibilityInfo.announceForAccessibility(
                  `High shakiness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  `Medium shakiness in ${rotatedDirection} quadrant!`,
                );
              } else if (vector.magnitude >= 0.2) {
                AccessibilityInfo.announceForAccessibility(
                  `Low shakiness in ${rotatedDirection} quadrant!`,
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

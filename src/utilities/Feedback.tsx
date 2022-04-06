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
    'top-left':
      'Too blurry in top-left region. Object may be too close to camera.',
    top: 'TODO',
    'top-right':
      'Too blurry in bottom-right region. Object may be too close to camera.',
    left: '',
    center: 'Too blurry in center region. Try waiting for autofocus.',
    right: '',
    'bottom-left':
      'Too blurry in bottom-left region. Object may be too close to camera.',
    bottom: 'TODO',
    'bottom-right':
      'Too blurry in bottom-right region. Object may be too close to camera.',
  },
  shaky: {
    overall: 'Too shaky. Try steadying camera or waiting for autofocus.',
  },
  bright: {
    'top-left':
      'Too bright in top-left region. Object may be too close to camera.',
    top: 'TODO',
    'top-right':
      'Too bright in top-right region. Object may be too close to camera.',
    left: 'TODO',
    center: 'Too bright in center region. Try adjusting background lighting.',
    right: 'TODO',
    'bottom-left':
      'Too bright in bottom-left region. Object may be too close to camera.',
    bottom: 'TODO',
    'bottom-right':
      'Too bright in bottom-right region. Object may be too close to camera.',
  },
  dark: {
    'top-left':
      'Too dark in top-left region. Finger may be obstructing camera view.',
    top: 'TODO',
    'top-right':
      'Too dark in top-right region. Finger may be obstructing camera view.',
    left: 'TODO',
    center: 'TODO',
    right: 'TODO',
    'bottom-left':
      'Too dark in bottom-left region. Finger may be obstructing camera view.',
    bottom: 'TODO',
    'bottom-right':
      'Too dark in bottom-right region. Finger may be obstructing camera view.',
  },
  grainy: {
    overall: 'Too grainy. Try adjusting background lighting.',
  },
  // none: {
  //   'top-left': 'TODO',
  //   top: 'TODO',
  //   'top-right': 'TODO',
  //   left: 'TODO',
  //   center: 'TODO',
  //   right: 'TODO',
  //   'bottom-left': 'TODO',
  //   bottom: 'TODO',
  //   'bottom-right': 'TODO',
  // },
  // other: {
  //   'top-left': 'TODO',
  //   top: 'TODO',
  //   'top-right': 'TODO',
  //   left: 'TODO',
  //   center: 'TODO',
  //   right: 'TODO',
  //   'bottom-left': 'TODO',
  //   bottom: 'TODO',
  //   'bottom-right': 'TODO',
  // },
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
            case 'blurry':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('High blurriness!');
              } else if (value >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  'Medium blurriness!',
                );
              } else if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('Low blurriness!');
              }

              return;
            case 'bright':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('High brightness!');
              } else if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  'Medium brightness!',
                );
              } else if (value >= 0.25) {
                AccessibilityInfo.announceForAccessibility('Low brightness!');
              }

              break;
            case 'dark':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('High darkness!');
              } else if (value >= 0.55) {
                AccessibilityInfo.announceForAccessibility('Medium darkness!');
              } else if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('Low darkness!');
              }

              break;
            case 'grainy':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('High graininess!');
              } else if (value >= 0.55) {
                AccessibilityInfo.announceForAccessibility(
                  'Medium graininess!',
                );
              } else if (value >= 0.2) {
                AccessibilityInfo.announceForAccessibility('Low graininess!');
              }

              break;
            case 'shaky':
              if (value >= 0.3) {
                AccessibilityInfo.announceForAccessibility('High shakiness!');
              } else if (value >= 0.55) {
                AccessibilityInfo.announceForAccessibility('Medium shakiness!');
              } else if (value >= 0.2) {
                AccessibilityInfo.announceForAccessibility('Low shakiness!');
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
              if (vector.magnitude >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.blurry[rotatedDirection],
                );
              }

              break;
            case 'brightVector':
              if (vector.magnitude >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.bright[rotatedDirection],
                );
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning off flash.',
                  );
                }
              }

              break;
            case 'darkVector':
              if (vector.magnitude >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.dark[rotatedDirection],
                );
              }

              break;
            case 'grainyVector':
              if (vector.magnitude >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.grainy.overall,
                );
                if (!flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning on flash.',
                  );
                }
              }

              break;
            case 'shakyVector':
              if (vector.magnitude >= 0.3) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.shaky.overall,
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

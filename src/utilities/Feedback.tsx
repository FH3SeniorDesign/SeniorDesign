import { RegionalImageDistortionDirection } from 'constants/RegionalImageDistortionConstants';
import { ImageDistortionResult } from 'models/ImageDistortionResult';
import { RegionalImageDistortionResult } from 'models/RegionalImageDistortionResult';
import { RegionalImageDistortionVector } from 'models/RegionalImageDistortionVector';
import { AccessibilityInfo } from 'react-native';
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
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    top: {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    'top-right':
    {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    left: {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    center: {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    right: {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    'bottom-left': {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    bottom: {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
    'bottom-right': {
      low: 'Low blurry in top-left region. Object may be too close to camera.',
      high: 'High blurry in top-left region. Object may be too close to camera.'
    },
  },
  shaky: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
  },
  bright: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
  },
  dark: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
  },
  grainy: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
  },
  none: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
  },
  other: {
    'top-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    top: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'top-right':
    {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    left: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    center: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    right: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-left': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    bottom: {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
    },
    'bottom-right': {
      low: 'It is an undeniable FACT that we need better feedback!',
      high: 'It is an undeniable FACT that we need better feedback!'
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
            case 'blurry':
              if (value >= 0.6) {
                AccessibilityInfo.announceForAccessibility('High blurriness!');
              } else if (value >= 0.4) {
                AccessibilityInfo.announceForAccessibility('Low blurriness!');
              }

              return;
            case 'bright':
              if (value >= 0.4) {
                AccessibilityInfo.announceForAccessibility('High brightness!');
              } else if (value >= 0.25) {
                AccessibilityInfo.announceForAccessibility('Low brightness!');
              }

              break;
            case 'dark':
              if (value >= 0.5) {
                AccessibilityInfo.announceForAccessibility('High darkness!');
              } else if (value >= 0.25) {
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
              if (value >= 0.4) {
                AccessibilityInfo.announceForAccessibility('High shakiness!');
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
              if (vector.magnitude >= 0.4) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.bright[rotatedDirection].high,
                );
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning off flash.',
                  );
                }
              } else if (vector.magnitude >= 0.25) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.bright[rotatedDirection].low,
                );
                if (flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning off flash.',
                  );
                }
              }

              break;
            case 'darkVector':
              if (vector.magnitude >= 0.5) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.dark[rotatedDirection].high,
                );
              } else if (vector.magnitude >= 0.25) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.dark[rotatedDirection].low,
                );
              }

              break;
            case 'grainyVector':
              if (vector.magnitude >= 0.6) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.grainy[rotatedDirection].high,
                );

                if (!flashEnabled) {
                  AccessibilityInfo.announceForAccessibility(
                    'Try turning on flash.',
                  );
                }
              }
              else if (vector.magnitude >= 0.4) {
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
              if (vector.magnitude >= 0.6) {
                AccessibilityInfo.announceForAccessibility(
                  FEEDBACK.shaky[rotatedDirection].high,
                );
              } else if (vector.magnitude >= 0.4) {
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

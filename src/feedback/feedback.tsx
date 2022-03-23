import {AccessibilityInfo} from 'react-native';
export {voiceFeedback};

let feedbackStr = new Map([
  ['blurry', ['Picture is too blurry. Please try focusing the camera.', 0.05]],
  [
    'bright',
    [
      'Picture is too bright. Please try decreasing exposure or turning off flash.',
      0.05,
    ],
  ],
  ['dark', ['Picture is too dark. Please try turning on flash.', 0.4]],
  ['global_quality', ['', 0.4]],
  ['grainy', ['Picture is too grainy. Please try stepping back.', 0.4]],
  ['none', ['The picture looks great!', 0.4]],
  ['other', ['Other problems detected.', 0.4]],
  ['shaky', ['Picture is shaky. Please try steadying the camera.', 0.4]],
]);

function voiceFeedback(res: any) {
  var result = '';

  for (const [key, value] of Object.entries(res)) {
    let feedbackResponse = feedbackStr.get(key);
    var val = parseFloat(`${value}`);
    var threshold;
    var speak;
    if (feedbackResponse !== undefined) {
      speak = feedbackResponse[0];
      threshold = feedbackResponse[1];
      if (val > threshold) {
        result += speak + ' ';
      }
    }
  }
  console.log(result);
  AccessibilityInfo.announceForAccessibility(result);
}

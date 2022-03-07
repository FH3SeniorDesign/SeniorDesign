import {Image, ImageURISource, Platform, StyleSheet, View, PermissionsAndroid, NativeModules, AccessibilityInfo} from 'react-native';
export {test}

let feedbackStr = new Map([["blurry", ["Picture is too blurry. Please try focusing the camera.", 0.05]], 
["bright", ["Picture is too bright. Please try decreasing exposure or turning off flash.", 0.05]], 
["dark", ["Picture is too dark. Please try turning on flash.", 0.05]], 
["global_quality", ["", 0.05]], 
["grainy", ["Picture is too grainy. Please try stepping back.", 0.05]],
 ["none", ["Picture looks great! Post that!", 0.05]],
["other", ["TBD.. hmmmmmm", 0.05]],
["shaky", ["Picture is shaky. Please try steadying the camera.", 0.05]]]);


// let feedbackTrs = new Map([["blurry", 0.5],
// ["bright", 0.4],
// ["dark"]
// ]);


function test(res: any) {
    // let key: string
    // let value: number
    var result = ""; 
    
    for(const [key, value] of Object.entries(res)) {
        let feedbackResponse = feedbackStr.get(key);
        var val = parseFloat(`${value}`); 
        var threshold;
        var speak;
        if(feedbackResponse != undefined){
            speak = feedbackResponse[0]
            threshold = feedbackResponse[1];
            if(val > threshold) {
                result += speak + " ";
            }
        }
    }
    console.log(result);
    AccessibilityInfo.announceForAccessibility(result);
  }
//
//  ImageProcessorPlugin.swift
//  SeniorDesign
//
//  Created by Nicholas Chu on 3/5/22.
//

import Foundation

// Reference: http://nightlyclosures.com/2018/02/09/writing-a-react-native-ios-module-in-swift
@objc(ImageProcessorPlugin)
class ImageProcessorPlugin: NSObject {
  
  @objc func makePrediction(_ path: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    NSLog("# ImageProcessorPlugin.makePrediction(path=%s)", path)
    
    do {
      // Reference: https://stackoverflow.com/q/37574689
      let url = URL(fileURLWithPath: path)
      let imageData = try Data(contentsOf: url)
      
      guard
        let uiImage = UIImage(data: imageData)
      else {
        NSLog("Error loading image from path!")
        callback([])
        return
      }
      
      callback([ImageModel.evaluate(uiImage: uiImage)])
    } catch {
      NSLog("Error loading image: \(error)")
      callback([])
    }
  }
}

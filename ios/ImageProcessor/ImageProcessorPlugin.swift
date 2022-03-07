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
    NSLog("# ImageProcessorPlugin.makePrediction(path=%@)", path)
    
    let formatted_path = String(path.suffix(path.count - 7))
    if FileManager.default.fileExists(atPath: formatted_path) {
      guard
        let uiImage = UIImage(contentsOfFile: formatted_path)
      else {
        NSLog("Error loading image from path!")
        callback([])
        return
      }
      
      callback([ImageModel.evaluate(uiImage: uiImage)])
    } else {
      NSLog("Image cannot be found!")
      callback([])
    }
  }
}

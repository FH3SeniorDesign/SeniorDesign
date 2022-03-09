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
  
  private var imageModel: ImageModel = ImageModel()
  
  @objc func makePrediction(_ path: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    NSLog("# ImageProcessorPlugin.makePrediction(path=%@)", path)
    
    let formattedPath = String(path.suffix(path.count - 7))
    
    if FileManager.default.fileExists(atPath: formattedPath) {
      guard
        let uiImage = UIImage(contentsOfFile: formattedPath)
      else {
        reject("makePrediction error", "Error loading image from path!", nil)
        return
      }
      
      resolve(imageModel.evaluate(uiImage: uiImage))
    } else {
      reject("makePrediction error", "Image cannot be found!", nil)
    }
  }
}

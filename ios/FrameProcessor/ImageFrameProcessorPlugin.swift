//
//  ImageFrameProcessorPlugin.swift
//  SeniorDesign
//
//  Created by Nicholas Chu on 2/21/22.
//

import Foundation

@objc(ImageFrameProcessorPlugin)
public class ImageFrameProcessorPlugin: NSObject, FrameProcessorPluginBase {
  
  @objc
  public static func callback(_ frame: Frame!, withArgs args: [Any]!) -> Any! {
    guard let imageBuffer = CMSampleBufferGetImageBuffer(frame.buffer) else {
      return nil
    }
    
    NSLog("# ImageFrameProcessorPlugin: \(CVPixelBufferGetWidth(imageBuffer))x\(CVPixelBufferGetHeight(imageBuffer)) Image. Logging \(args.count) parameters:")
    
    args.forEach { arg in
      var string = "\(arg)"
      
      if let array = arg as? NSArray {
        string = (array as Array).description
      } else if let map = arg as? NSDictionary {
        string = (map as Dictionary).description
      }
      
      NSLog("ImageFrameProcessorPlugin: -> \(string) (\(type(of: arg)))")
    }
    
    return ImageModel.evaluate(imageBuffer: imageBuffer)
  }
}

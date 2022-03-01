//
//  ImageDistortionResult.swift
//  SeniorDesign
//
//  Created by Nicholas Chu on 2/28/22.
//

import Foundation

class ImageDistortionResult: NSObject, Encodable {
  
  private var globalQuality: Float;
  private var blurry: Float;
  private var shaky: Float;
  private var bright: Float;
  private var dark: Float;
  private var grainy: Float;
  private var none: Float;
  private var other: Float;
  
  init(globalQuality: Float, blurry: Float, shaky: Float, bright: Float, dark: Float, grainy: Float, none: Float, other: Float) {
    self.globalQuality = globalQuality;
    self.blurry = blurry;
    self.shaky = shaky;
    self.bright = bright;
    self.dark = dark;
    self.grainy = grainy;
    self.none = none;
    self.other = other;
  }
  
  public override var description: String {
    return "ImageDistortionResult(globalQuality=\(globalQuality), blurry=\(blurry), shaky=\(shaky), bright=\(bright), dark=\(dark), grainy=\(grainy), none=\(none), other=\(other))"
  }
  
  public func toJson() -> String {
    do {
      let encodedData = try JSONEncoder().encode(self)
      
      guard
        let json = String(data: encodedData, encoding: String.Encoding.utf8)
      else {
        return ""
      }
      
      return json
    } catch {
      NSLog("Error converting ImageDistortionResult to JSON")
      return ""
    }
  }
}

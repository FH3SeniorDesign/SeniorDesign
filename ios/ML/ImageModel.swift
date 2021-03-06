//
//  ImageModel.swift
//  SeniorDesign
//
//  Created by Nicholas Chu on 2/21/22.
//

import Foundation
import TensorFlowLite
import CoreMedia
import UIKit

// Reference: https://www.tensorflow.org/lite/guide/inference#load_and_run_a_model_in_swift
public class ImageModel {
  
  private var interpreter: Interpreter?
  
  init() {
    guard
      let modelPath = Bundle.main.path(forResource: "mliqa_tflite_mobilenet", ofType: "tflite")
    else {
      NSLog("Fetching model failed!")
      return
    }
    
    do {
      // Initialize an interpreter with the model
      NSLog("Loading model interpreter...")
      
      interpreter = try Interpreter(modelPath: modelPath)
    } catch {
      NSLog("init error: \(error)")
      interpreter = nil
    }
  }
  
  public func evaluate(uiImage: UIImage) -> Any {
    NSLog("# ImageMododel.evaluate(uiImage=%dx%d)", Int(uiImage.size.width * uiImage.scale), Int(uiImage.size.height * uiImage.scale))
    
    guard
      let interpreter: Interpreter = interpreter
    else {
      NSLog("Interpreter is (nil)!")
      return []
    }
    
    do {
      // Allocate memory for the model's input `Tensor`s
      try interpreter.allocateTensors()
      
      // Preprocess image
      NSLog("Preprocessing image...")
      
      guard
        let inputData: Data = uiImage.scaledData(with: CGSize(width: 448, height: 448), byteCount: 448 * 448 * 3, isQuantized: false)
      else {
        NSLog("Image preprocessing failed!")
        return []
      }
      
      NSLog("inputData size: %d", inputData.count)
      
      // Copy the input data to the input `Tensor`
      try interpreter.copy(inputData, toInputAt: 0)
      
      // Run inference by invoking the `Interpreter`
      NSLog("Evaluating image...")
      try interpreter.invoke()
      
      // Get the output `Tensor`
      let labelsOutputTensor = try interpreter.output(at: 0)
      let globalScoreOutputTensor = try interpreter.output(at: 1)
      
      // Copy output to `Data` to process the inference results.
      let labelsOutputSize = labelsOutputTensor.shape.dimensions.reduce(1, {x, y in x * y})
      let labelsOutputData = UnsafeMutableBufferPointer<Float32>.allocate(capacity: labelsOutputSize)
      let globalScoreOutputSize =  globalScoreOutputTensor.shape.dimensions.reduce(1, {x, y in x * y})
      let globalScoreOutputData = UnsafeMutableBufferPointer<Float32>.allocate(capacity: globalScoreOutputSize)
      _ = labelsOutputTensor.data.copyBytes(to: labelsOutputData)
      _ = globalScoreOutputTensor.data.copyBytes(to: globalScoreOutputData)
      
      NSLog("labelsOutputSize: %d", labelsOutputSize)
      NSLog("globalScoreOutputSize: %d", globalScoreOutputSize)
      
      let imageDistortionResult: ImageDistortionResult = ImageDistortionResult(globalQuality: globalScoreOutputData[0], blurry: labelsOutputData[0], shaky: labelsOutputData[1], bright: labelsOutputData[2], dark: labelsOutputData[3], grainy: labelsOutputData[4], none: labelsOutputData[5], other: labelsOutputData[6])
      
      NSLog("imageDistortionResult: %@", imageDistortionResult)
      return imageDistortionResult.toJson()
    } catch {
      NSLog("Error evaluating image: \(error)")
      return []
    }
  }
}

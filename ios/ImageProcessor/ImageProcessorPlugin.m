//
//  ImageProcessorPlugin.m
//  SeniorDesign
//
//  Created by Nicholas Chu on 3/5/22.
//

// Reference: http://nightlyclosures.com/2018/02/09/writing-a-react-native-ios-module-in-swift
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ImageProcessorPlugin, NSObject)
RCT_EXTERN_METHOD(makePrediction:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

// Reference: https://reactnative.dev/docs/0.62/native-modules-ios#implementing--requiresmainqueuesetup
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}
@end

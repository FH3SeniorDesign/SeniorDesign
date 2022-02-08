import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard, ImagePropTypes, ImageProps } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

const modelJSON = require("../model/model.json");
const modelWeights = require("../model/group1-shard1of1.bin");
export class ModelTest extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
      modelOutput: ""
    };
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready().then(() => {
      console.log('tf ready');
    }).catch(() => {
      console.log('tf failed to initialize')
    });

    // Signal to the app that tensorflow.js can now be used.
    this.setState({isTfReady: true});
    const model = await tf.loadLayersModel("https://raw.githubusercontent.com/FH3SeniorDesign/SeniorDesign/riskreduction-pierce/riskReductionDemo/model/model-resnet-full/model.json").then((promise) => {
      console.log('model ready');
    }).catch((error) => {
      console.log('model failed to initialize: ' + error); 
    });
    this.setState({isModelReady: true});

const image = require('./assets/images/catsmall.jpg');
const imageAssetPath = image.resolveAssetSource(image);
const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
const imageData = await response.arrayBuffer();

const imageTensor = decodeJpeg(imageData);

const prediction = await model.classify(imageTensor);
  }

  async makePrediction() {
    console.log("here");
  }


  render() {
    return (
        <View>
          <Text>{this.state.modelOutput}</Text>
        </View>
    )
    }
}

export default ModelTest
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard, ImagePropTypes, ImageProps, Image } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { print } from '@tensorflow/tfjs';

const modelJSON = require("../model/model-mobilenet/model.json");
const modelWeights = require("../model/model-mobilenet/group1-shard1of1.bin");

var model;

export class ModelTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
      modelOutput: "",
      modelStats: "",
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
    // model = await tf.loadLayersModel("https://raw.githubusercontent.com/FH3SeniorDesign/SeniorDesign/riskreduction-pierce/riskReductionDemo/model/model-resnet-full/model.json");
    model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights)); // only works with sufficiently small model because of TensorFlowJS shit idk
    this.setState({modelStats: model.summary(), isModelReady: true});
  }

  async makePrediction() {
    console.log("fetching image...");

    const image = require('../assets/vizwiz_blurry1.jpg');
    const imageAssetPath = Image.resolveAssetSource(image);
    const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    console.log("converting image to tensor...")
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);

    const imageTensor = decodeJpeg(imageData, 3);
    const imageTensorResized = tf.image.resizeBilinear(imageTensor, [448,448]);
    const imageTensorNormalized = imageTensorResized.div(255.0)

    console.log("making prediction...")
    console.log("Image dimensions: ", imageTensorNormalized.expandDims(0)["shape"])
    const prediction = await model.predict(imageTensorNormalized.expandDims(0));
    prediction[1].array().then(array => console.log("predicted global quality: ", array[0][0], "\n"));
    prediction[0].array().then(array => {
    console.log("blurry: ", array[0][0]);
    console.log("shaky: ", array[0][1]);
    console.log("bright: ", array[0][2]);
    console.log("dark: ", array[0][3]);
    console.log("grainy: ", array[0][4]);
    console.log("none: ", array[0][5]);
    console.log("other: ", array[0][6]);
    });

  }


  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.makePrediction}>
            <Text>Touch to make prediction</Text>
          </TouchableOpacity>
          <Text>{this.state.modelOutput}</Text>
        </View>
    )
    }
}

export default ModelTest
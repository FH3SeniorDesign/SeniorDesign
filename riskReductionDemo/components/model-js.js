import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard, ImagePropTypes, ImageProps, Image } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { Audio } from 'expo-av'
// import Sound from 'react-native-sound';
import { bundleResourceIO, fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { print } from '@tensorflow/tfjs';

const modelJSON = require("../model/model-mobilenet/model.json");
const modelWeights = require("../model/model-mobilenet/group1-shard1of1.bin");

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var model;
var prediction;
var index, value;


async function playSound() {
  //Not the most optimal implementation but just unfamilar with React Native  
  switch(index) {
    case 0:
      const sound = await Audio.Sound.createAsync(require('../assets/audio/ding-dong.wav'));
      await sound.sound.playAsync();
      break;

    case 1:
      const sound1 = await Audio.Sound.createAsync(require('../assets/audio/applause_y.wav'));
      await sound1.sound.playAsync();
      break;

    case 2:
      const sound2 = await Audio.Sound.createAsync(require('../assets/audio/blip.wav'));
      await sound2.sound.playAsync();
      break;
    
    case 3:
      const sound3 = await Audio.Sound.createAsync(require('../assets/audio/bloop_x.wav'));
      await sound3.sound.playAsync();
      break;

    case 4:
      const sound4 = await Audio.Sound.createAsync(require('../assets/audio/blurp_x.wav'));
      await sound4.sound.playAsync();
      break;

    case 5:
      const sound5 = await Audio.Sound.createAsync(require('../assets/audio/boing_x.wav'));
      await sound5.sound.playAsync();
      break;
      
    case 6:
      const sound6 = await Audio.Sound.createAsync(require('../assets/audio/boo.wav'));
      await sound6.sound.playAsync();
      break;
  }
}
export class ModelTest extends React.Component {
  async testSound() {

    var sounds = ["../assets/audio/ding-dong.wav", "../assets/audio/applause_y.wav"]
    prediction[0].array().then(array => {
      index = 0; 
      value = array[0][0]
      for(var i = 1; i < 7; i++) {
        if(array[0][i] > value) {
          index = i;
          value = array[0][i];
        }
      }

      console.log(index)
      playSound()
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
      modelOutput: "",
      modelStats: "",
    };
    this.testSound = this.testSound.bind(this);
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

    const image = require('../assets/vizwiz_dark1.jpg');
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
    prediction = await model.predict(imageTensorNormalized.expandDims(0));
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
          <TouchableOpacity onPress={this.testSound}>
            <Text>Touch to give feedback</Text>
          </TouchableOpacity>
          <Text>{this.state.modelOutput}</Text>
        </View>
    )
    }
}

export default ModelTest
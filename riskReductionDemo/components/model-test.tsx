import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard, ImagePropTypes, ImageProps } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const modelJSON = require("../model/model.json");
const modelWeights = require("../model/group1-shard1of1.bin");

interface IState {
  isTfReady?: boolean;
  isModelReady?: boolean;
}

export class ModelTest extends React.Component<IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isTfReady: false,
      isModelReady: false,
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
    const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights)).then((promise) => {
      console.log('model ready');
    }).catch((error) => {
      console.log('model failed to initialize: ' + error); 
    });
    this.setState({isModelReady: true});
  }


  render() {
    const bools = this.state;
    return (
        <Text>Ready?</Text>
    )
    }
}

export default ModelTest
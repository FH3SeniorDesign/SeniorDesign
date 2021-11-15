import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feedback from './components/feedback';
import ModelTest from './components/model-test';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Home from './components/home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Model" component={ModelTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const Home = ({navigation} : {navigation: any}) => {
    return (
      <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style = {styles.modelButton}
            onPress = {() => navigation.navigate('Model') 
            }>
            <Text style={{color: 'black'}}>Test Model</Text>
          </TouchableOpacity>    
          <TouchableOpacity
            style = {styles.feedbackButton}
            onPress = {() => navigation.navigate('Feedback') 
            }>
            <Text style={{color: 'white'}}>Submit Feedback</Text>
          </TouchableOpacity>    
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
    },
    feedbackButton: {
        //position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        //bottom: 0,
        backgroundColor: '#7a42f4',
        padding: 10,
    },
    modelButton: {
        //position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        //bottom: 0,
        backgroundColor: '#FFE433',
        padding: 10,
    }
})
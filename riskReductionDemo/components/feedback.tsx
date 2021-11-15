import React from 'react'
import { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard } from 'react-native'
import qs from 'qs'

const recipient = 'piercephillips22@yahoo.com';

class Feedback extends Component {
   state = {
       feedback: ''
   }

   handleFeedback = (text: any) => {
       this.setState({feedback: text})
   }

   handleKeyPress = (e: any) => {
      if (e.nativeEvent.key == "Enter") {
        Keyboard.dismiss(); 
        this.submit('piercephillips22@yahoo.com', this.state.feedback);
      }
   }

   submit = (to: any, feedback: any) => {
        sendEmail(to, 'feedback', feedback);
   }

   render() {
      return (
         <View style = {styles.container}>
            <TextInput style={styles.feedbackInput}
               underlineColorAndroid="transparent"
               multiline={true}
               placeholder="Type your feedback here!"
               placeholderTextColor="#9a73ef"
               autoCapitalize="none"
               onChangeText={this.handleFeedback}
               autoFocus={true}
               onKeyPress={this.handleKeyPress}
               />

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.submit('piercephillips22@yahoo.com', this.state.feedback)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Feedback

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   feedbackInput: {
      margin: 15,
      height: '75%',
      width: '90%',
      borderColor: '#7a42f4',
      borderWidth: 2
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 80,
      width: '90%',
   },
   submitButtonText:{
      color: 'white'
   }
})

async function sendEmail(to: any, subject: any, body: any) {
    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
    });

    url += `?${query}`;

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}
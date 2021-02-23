import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, 
  TextInput, TouchableOpacity, Touchable, Alert } from 'react-native';
import Logo from '../Logo';
import firebase from 'firebase'

export default class ChangeUsername extends Component {
  constructor(props){
    super(props)
    this.state = {
      newUsername: '',
      oldUsername: ''
    }
    //this.GetUsername()
  }
/*
   GetUsername () {
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function(profile){
        console.log(profile.displayName)
        this.setState({oldUsername: profile.displayName})
      });
    }
  }
  */

  UpdateUsername(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.state.newUsername
    })
    .then(() => {
      Alert.alert("Username changed from: " + this.state.oldUsername + 
        " to: " + this.state.newUsername)
      this.props.navigation.navigate('AccountSettings')
    })
    .catch(function(error) {
      console.log(error)
    });
  }

    render(){
        return (
            <KeyboardAvoidingView 
              style={styles.container} 
              >
                <Logo />
                <TextInput
                    placeholder={this.state.oldUsername}
                    placeholderTextColor="rgba(255, 255, 255, 0.75)"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="username"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style={styles.input}
                    onChangeText={text => this.setState({newUsername: text})}
                    value={this.state.newUsername}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.UpdateUsername()}>
                    <Text style={styles.sendButtonText}>Update</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: '#2ecc71',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 20,
        paddingEnd: 10,
        borderRadius: 50
    },
    buttonContainer:{
      backgroundColor: '#27ae60',
      paddingVertical: 20,
      padding: 20,
      borderRadius: 50,
      width:"100%",
      marginBottom: 20
    },
    sendButtonText: {
      textAlign: 'center',
      color: '#FFF',
      fontWeight: '900'
    }
})
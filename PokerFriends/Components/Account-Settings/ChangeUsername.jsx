import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, 
  TextInput, TouchableOpacity, Touchable, Alert } from 'react-native';
import Logo from '../Logo';
import firebase from 'firebase'

export default class ChangeUsername extends Component {
  constructor(props){
    super(props)
    var user = firebase.auth().currentUser;
    console.log(user.displayName)
    this.state = {
      newUsername: '',
      oldUsername: user.displayName
    }
  }

  UpdateUsername(){
    var user = firebase.auth().currentUser;
    var updates = {};
    const usernameID = this.state.newUsername+"#"+user.uid

    user.updateProfile({
      displayName: this.state.newUsername
    })
    .then(() => {
      Alert.alert("Username changed", "From: " + this.state.oldUsername + 
        " to: " + this.state.newUsername)
      updates['/users/'+ user.uid +'/data/username'] = usernameID;
      firebase.database().ref().update(updates);
      this.props.navigation.navigate('LandingPage')
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
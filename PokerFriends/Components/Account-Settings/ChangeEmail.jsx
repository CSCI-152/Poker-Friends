import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, 
  TouchableOpacity, Touchable, Alert } from 'react-native';
import Logo from '../Logo';
import firebase from 'firebase'

export default class ChangeEmail extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: ''
    }
  }

  Update(){
    var user = firebase.auth().currentUser;

    user.updateEmail(this.state.email)
    .then(() =>{
      Alert.alert("Email changed to: " + this.state.email)
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
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.75)"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style={styles.input}
                    ref={(input) => this.emailInput = input}
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.Update()}>
                    <Text style={styles.sendButtonText}>Change Email</Text>
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